import type { ScanCommandInput } from '@aws-sdk/lib-dynamodb';
import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import { putMetric } from '../../utils/cloudwatch';
import { dynamoDbClient } from '../../utils/dynamodb';
import { logError, logInfo } from '../../utils/logging';
import type { ValueReloader } from '../../utils/valueReloader';
import { buildReloader } from '../../utils/valueReloader';
import { stage } from '../env';

type PromoCode = string;
export interface Promotion {
    promoCode: PromoCode;
    productRatePlanIds: string[]; // the product rate plans that this promo applies to
    discountPercent: number;
}
export type PromotionsCache = Record<PromoCode, Promotion>;

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
const fetchPromotions = async (): Promise<PromotionsCache> => {
    const tableName = `MembershipSub-Promotions-${stage}`;
    const promotionsCache: PromotionsCache = {};
    let lastEvaluatedKey: ScanCommandInput['ExclusiveStartKey']; // for paginating through the dynamodb results

    try {
        logInfo(`Scanning ${tableName} for promotions`);

        do {
            const params: ScanCommandInput = {
                TableName: tableName,
            };

            if (lastEvaluatedKey) {
                params.ExclusiveStartKey = lastEvaluatedKey;
            }

            const result = await dynamoDbClient.send(new ScanCommand(params));
            const items = result.Items as PromotionTableItem[];

            items.forEach((item) => {
                if (item.promotionType.name === 'percent_discount' && item.promotionType.amount) {
                    const promotions = mapTableItemToPromotion(item);
                    promotions.forEach((promotion) => {
                        promotionsCache[promotion.promoCode] = promotion;
                    });
                }
            });

            lastEvaluatedKey = result.LastEvaluatedKey;
        } while (lastEvaluatedKey);

        logInfo(`Got ${Object.keys(promotionsCache).length} promotion codes from DynamoDb`);
        return promotionsCache;
    } catch (error) {
        logError(`Error fetching promotions from DynamoDB: ${String(error)}`);
        putMetric('promotions-fetch-error');
        throw error;
    }
};

export const buildPromotionsReloader = (): Promise<ValueReloader<PromotionsCache>> =>
    buildReloader(fetchPromotions, 60 * 5);
