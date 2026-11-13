import type { ScanCommandInput } from '@aws-sdk/lib-dynamodb';
import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import { getErrorMessage } from '@guardian/libs';
import { countryGroups } from '../../../shared/lib/geolocation';
import { putMetric } from '../../utils/cloudwatch';
import { dynamoDbClient } from '../../utils/dynamodb';
import { logError, logInfo } from '../../utils/logging';
import type { ValueReloader } from '../../utils/valueReloader';
import { buildReloader } from '../../utils/valueReloader';
import { isProd } from '../env';

const stage = isProd ? 'PROD' : 'CODE';

type PromoCode = string;
export interface Promotion {
    promoCode: PromoCode;
    productRatePlanIds: string[]; // the product rate plans that this promo applies to
    countries: string[] | null; // null preserves the legacy empty list's unrestricted targeting
    discountPercent: number;
    startTimestamp?: string;
    endTimestamp?: string;
    isIntroductoryPricing?: boolean;
}
export type PromotionsCache = Record<PromoCode, Promotion | undefined>;

const promoCountryGroups = {
    ukm: ['GB'],
    ukos: countryGroups.GBPCountries.countries.filter((country) => country !== 'GB'),
    us: countryGroups.UnitedStates.countries,
    ca: countryGroups.Canada.countries,
    au: countryGroups.AUDCountries.countries,
    nz: countryGroups.NZDCountries.countries,
    eu: countryGroups.EURCountries.countries,
    int: countryGroups.International.countries,
};
const isPromoCountryGroup = (id: unknown): id is keyof typeof promoCountryGroups =>
    typeof id === 'string' && Object.prototype.hasOwnProperty.call(promoCountryGroups, id);

interface PromotionTableItem {
    appliesTo: {
        productRatePlanIds: string[];
        countries?: string[] | null;
        countryGroups?: string[] | null;
    } | null;
    promoCode: string;
    discount?: {
        amount: number;
    };
    startTimestamp?: string;
    endTimestamp?: string;
    isIntroductoryPricing?: boolean;
}

export const mapTableItemToPromotion = (item: PromotionTableItem): Promotion | undefined => {
    const { countryGroups: groupIds, countries, productRatePlanIds } = item.appliesTo ?? {};
    if (
        (groupIds != null && (!Array.isArray(groupIds) || !groupIds.every(isPromoCountryGroup))) ||
        (countries != null &&
            (!Array.isArray(countries) ||
                !countries.every((country) => typeof country === 'string'))) ||
        (groupIds == null && countries == null) ||
        !Array.isArray(productRatePlanIds)
    ) {
        logError(`Invalid eligibility for promotion ${item.promoCode}`);
        return undefined;
    }

    const targetCountries =
        groupIds == null && countries?.length === 0
            ? null
            : [...(countries ?? []), ...(groupIds?.flatMap((id) => promoCountryGroups[id]) ?? [])];

    return {
        promoCode: item.promoCode,
        discountPercent: item.discount?.amount ?? 0,
        productRatePlanIds,
        countries: targetCountries,
        startTimestamp: item.startTimestamp,
        endTimestamp: item.endTimestamp,
        isIntroductoryPricing: item.isIntroductoryPricing,
    };
};

export const isPromotionLive = (promotion: Promotion): boolean => {
    const now = new Date();

    if (promotion.startTimestamp) {
        const startDate = new Date(promotion.startTimestamp);
        if (now < startDate) {
            return false;
        }
    }

    if (promotion.endTimestamp) {
        const endDate = new Date(promotion.endTimestamp);
        if (now > endDate) {
            return false;
        }
    }

    return true;
};

export const getPromotionsForCountry = (
    promoCodes: string[],
    promotionsCache: PromotionsCache,
    countryCode: string,
): Promotion[] =>
    promoCodes.flatMap((code) => {
        const promo = Object.prototype.hasOwnProperty.call(promotionsCache, code)
            ? promotionsCache[code]
            : undefined;
        return promo &&
            isPromotionLive(promo) &&
            (promo.countries === null || promo.countries.includes(countryCode))
            ? [promo]
            : [];
    });

// Does a full scan of the Promotions table - there isn't a smarter way to do this with the existing schema.
const fetchPromotions = async (): Promise<PromotionsCache> => {
    const tableName = `support-admin-console-promos-${stage}`;
    const promotionsCache = Object.create(null) as PromotionsCache;
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
                const promotion = mapTableItemToPromotion(item);
                if (promotion) {
                    promotionsCache[promotion.promoCode] = promotion;
                }
            });

            lastEvaluatedKey = result.LastEvaluatedKey;
        } while (lastEvaluatedKey);

        logInfo(`Got ${Object.keys(promotionsCache).length} promotion codes from DynamoDb`);
        return promotionsCache;
    } catch (error) {
        logError(`Error fetching promotions from DynamoDB: ${getErrorMessage(error)}`);
        putMetric('promotions-fetch-error');
        throw error;
    }
};

export const buildPromotionsReloader = (): Promise<ValueReloader<PromotionsCache>> =>
    buildReloader(fetchPromotions, 60 * 5);
