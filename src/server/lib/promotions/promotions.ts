import * as AWS from 'aws-sdk';
import { putMetric } from '../../utils/cloudwatch';
import { logError, logInfo } from '../../utils/logging';
import type { ValueReloader } from '../../utils/valueReloader';
import { buildReloader } from '../../utils/valueReloader';
import { isProd } from '../env';

const stage = isProd ? 'PROD' : 'CODE';

type PromoCode = string;
export interface Promotion {
    promoCode: PromoCode;
    productRatePlanIds: string[]; // the product rate plans that this promo applies to
    discountPercent: number;
}
export type PromotionsMap = Record<PromoCode, Promotion>;

// The model we get from DynamoDb. Most fields are ignored. Any targeting must be done in the RRCP
interface PromotionTableItem {
    appliesTo: {
        productRatePlanIds: string[];
    };
    codes: Record<string, string[]>;
    promotionType: {
        amount: number;
        name: string;
    };
}

const mapTableItemToPromotion = (item: PromotionTableItem): Promotion[] => {
    // It's possible to have more than one promo code per promo - flatten them all into an array
    const allCodes: string[] = Object.values(item.codes).flat();

    return allCodes.map((promoCode) => ({
        promoCode,
        discountPercent: item.promotionType.amount,
        productRatePlanIds: item.appliesTo.productRatePlanIds,
    }));
};

// Does a full scan of the Promotions table - there isn't a smarter way to do this with the existing schema.
const fetchPromotions = async (): Promise<PromotionsMap> => {
    const docClient = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-1' });
    const tableName = `MembershipSub-Promotions-${stage}`;
    const promotionsMap: PromotionsMap = {};
    let lastEvaluatedKey: AWS.DynamoDB.DocumentClient.Key | undefined; // for paginating through the dynamodb results

    try {
        logInfo(`Scanning ${tableName} for promotions`);

        do {
            const params: AWS.DynamoDB.DocumentClient.ScanInput = {
                TableName: tableName,
            };

            if (lastEvaluatedKey) {
                params.ExclusiveStartKey = lastEvaluatedKey;
            }

            const result = await docClient.scan(params).promise();
            const items = result.Items as PromotionTableItem[];

            items.forEach((item) => {
                if (item.promotionType.name === 'percent_discount' && item.promotionType.amount) {
                    const promotions = mapTableItemToPromotion(item);
                    promotions.forEach((promotion) => {
                        promotionsMap[promotion.promoCode] = promotion;
                    });
                }
            });

            lastEvaluatedKey = result.LastEvaluatedKey;
        } while (lastEvaluatedKey);

        logInfo(`Got ${Object.keys(promotionsMap).length} promotion codes from DynamoDb`);
        return promotionsMap;
    } catch (error) {
        logError(`Error fetching promotions from DynamoDB: ${String(error)}`);
        putMetric('promotions-fetch-error');
        throw error;
    }
};

export const buildPromotionsReloader = (): Promise<ValueReloader<PromotionsMap>> =>
    buildReloader(fetchPromotions, 60 * 5);
