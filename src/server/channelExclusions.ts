import { isProd } from './lib/env';
import { fetchS3Data } from './utils/S3';
import type { ValueReloader } from './utils/valueReloader';
import { buildReloader } from './utils/valueReloader';

export interface DateRange {
    start: string; // ISO date "YYYY-MM-DD", inclusive
    end: string; // ISO date "YYYY-MM-DD", inclusive
}

export interface ExclusionRule {
    name: string;
    sectionIds?: string[];
    tagIds?: string[];
    dateRange?: DateRange;
    contentTypes?: Array<'Fronts' | 'Articles'>;
}

export interface ChannelExclusions {
    rules: ExclusionRule[];
}

export interface ExclusionSettings {
    epic?: ChannelExclusions;
    banner?: ChannelExclusions;
    gutterAsk?: ChannelExclusions;
    header?: ChannelExclusions;
}

const getExclusions = (): Promise<ExclusionSettings> =>
    fetchS3Data('support-admin-console', `${isProd ? 'PROD' : 'CODE'}/exclusions.json`).then(
        JSON.parse,
    );

const buildChannelExclusionsReloader = (): Promise<ValueReloader<ExclusionSettings>> =>
    buildReloader(getExclusions, 60);

export { buildChannelExclusionsReloader };
