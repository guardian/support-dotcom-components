import { getErrorMessage } from '@guardian/libs';
import type { CountryGroupId } from '../shared/lib';
import type { ChoiceCardsSettings } from '../shared/types/props/choiceCards';
import { isProd } from './lib/env';
import { logWarn } from './utils/logging';
import { fetchS3Data } from './utils/S3';
import type { ValueReloader } from './utils/valueReloader';
import { buildReloader } from './utils/valueReloader';

type ChoiceCardSettingsByCountryGroup = Partial<
    Record<CountryGroupId | 'Default', ChoiceCardsSettings>
>;

export interface DefaultChoiceCardSettings {
    epic?: ChoiceCardSettingsByCountryGroup;
    banner?: ChoiceCardSettingsByCountryGroup;
}

const emptyDefaultChoiceCardSettings: DefaultChoiceCardSettings = {};

const getDefaultChoiceCardSettings = async (): Promise<DefaultChoiceCardSettings> => {
    try {
        const data = await fetchS3Data(
            'support-admin-console',
            `${isProd ? 'PROD' : 'CODE'}/default-choice-cards-config.json`,
        );
        return JSON.parse(data) as DefaultChoiceCardSettings;
    } catch (error) {
        logWarn(
            `Failed to load default choice card settings from S3: ${getErrorMessage(error)}. Proceeding with no overrides.`,
        );
        return emptyDefaultChoiceCardSettings;
    }
};

const buildDefaultChoiceCardSettingsReloader = (): Promise<
    ValueReloader<DefaultChoiceCardSettings>
> => buildReloader(getDefaultChoiceCardSettings, 60);

export { buildDefaultChoiceCardSettingsReloader };
