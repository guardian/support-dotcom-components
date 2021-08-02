import * as AWS from 'aws-sdk';
import { isProd } from './env';
import { addDays, format } from 'date-fns';
import { EpicTest } from '../types/EpicTypes';
import { CountryGroupId } from './geolocation';

const docClient = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-1' });
const stage = isProd ? 'PROD' : 'CODE';

export interface SuperModeArticle {
    url: string;
    countryGroupId: CountryGroupId;
}

export const fetchSuperModeArticles = async (): Promise<SuperModeArticle[]> => {
    const records = await queryActiveArticles(stage, docClient);

    return records.map(record => ({
        url: record.url,
        countryGroupId: regionToCountryGroupId(record.region),
    }));
};

export const isInSuperMode = (
    url: string,
    countryGroupId: CountryGroupId,
    superModeArticles: SuperModeArticle[],
): boolean => {
    return superModeArticles.some(a => a.url === url && a.countryGroupId === countryGroupId);
};

export const superModeify = (test?: EpicTest): EpicTest | undefined => {
    return test && { ...test, isSuperMode: true };
};

type Region = 'GB' | 'US' | 'AU' | 'NZ' | 'CA' | 'EU' | 'ROW';

interface DynamoRecord {
    id: string;
    startTimestamp: string;
    endDate: string;
    endTimestamp: string;
    url: string;
    region: Region;
    totalAv: number;
    totalViews: number;
    avPerView: number;
}

const REGION_TO_COUNTRY_GROUP: { [region in Region]: CountryGroupId } = {
    GB: 'GBPCountries',
    US: 'UnitedStates',
    AU: 'AUDCountries',
    NZ: 'NZDCountries',
    CA: 'Canada',
    EU: 'EURCountries',
    ROW: 'International',
};

function regionToCountryGroupId(region: Region): CountryGroupId {
    return REGION_TO_COUNTRY_GROUP[region];
}

export async function queryActiveArticles(
    stage: string,
    docClient: AWS.DynamoDB.DocumentClient,
    now: Date = new Date(),
): Promise<DynamoRecord[]> {
    const tomorrow = addDays(now, 1);

    const todayEndDate = toDateString(now);
    const tomorrowEndDate = toDateString(tomorrow);
    const endTimestamp = toDateHourString(now);

    const [todayResult, tomorrowResult] = await Promise.all([
        queryDate(todayEndDate, endTimestamp, stage, docClient),
        queryDate(tomorrowEndDate, endTimestamp, stage, docClient),
    ]);

    return [...(todayResult.Items ?? []), ...(tomorrowResult.Items ?? [])] as DynamoRecord[];
}

function queryDate(
    endDate: string,
    endTimestamp: string,
    stage: string,
    docClient: AWS.DynamoDB.DocumentClient,
) {
    return docClient
        .query({
            TableName: `super-mode-${stage.toUpperCase()}`,
            IndexName: 'end',
            KeyConditionExpression: 'endDate = :ed AND endTimestamp > :et ',
            ExpressionAttributeValues: {
                ':ed': endDate,
                ':et': endTimestamp,
            },
        })
        .promise();
}

function toDateString(date: Date): string {
    return format(date, 'yyyy-MM-dd');
}

function toDateHourString(date: Date): string {
    return format(date, 'yyyy-MM-dd HH:00:00.000');
}
