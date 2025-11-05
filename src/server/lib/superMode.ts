import type { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { QueryCommand } from '@aws-sdk/lib-dynamodb';
import { addDays, format } from 'date-fns';
import type { CountryGroupId } from '../../shared/lib';
import type { EpicTest } from '../../shared/types';
import { putMetric } from '../utils/cloudwatch';
import { dynamoDbClient } from '../utils/dynamodb';
import { logError, logInfo } from '../utils/logging';
import type { ValueReloader } from '../utils/valueReloader';
import { buildReloader } from '../utils/valueReloader';
import { stage } from './env';

export interface SuperModeArticle {
    url: string;
    countryGroupId: CountryGroupId;
}

const fetchSuperModeArticles = async (): Promise<SuperModeArticle[]> => {
    const records = await queryActiveArticles(stage, dynamoDbClient).catch((error) => {
        logError(`Error fetching super mode articles from dynamo: ${error}`);
        putMetric('super-mode-error');
        return [];
    });

    logInfo(`Got super mode articles from dynamo, number of records: ${records.length}`);

    return records.map((record) => ({
        url: record.url,
        countryGroupId: regionToCountryGroupId(record.region),
    }));
};

export const buildSuperModeArticlesReloader = (): Promise<ValueReloader<SuperModeArticle[]>> =>
    buildReloader(fetchSuperModeArticles, 60);

export const isInSuperMode = (
    url: string,
    countryGroupId: CountryGroupId,
    superModeArticles: SuperModeArticle[],
): boolean => {
    return superModeArticles.some((a) => a.url === url && a.countryGroupId === countryGroupId);
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

const REGION_TO_COUNTRY_GROUP: Record<Region, CountryGroupId> = {
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
    docClient: DynamoDBDocumentClient,
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
    docClient: DynamoDBDocumentClient,
) {
    return docClient.send(
        new QueryCommand({
            TableName: `super-mode-calculator-${stage.toUpperCase()}`,
            IndexName: 'end',
            KeyConditionExpression: 'endDate = :ed AND endTimestamp > :et ',
            ExpressionAttributeValues: {
                ':ed': endDate,
                ':et': endTimestamp,
            },
        }),
    );
}

function toDateString(date: Date): string {
    return format(date, 'yyyy-MM-dd');
}

function toDateHourString(date: Date): string {
    return format(date, 'yyyy-MM-dd HH:00:00.000');
}
