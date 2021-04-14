import { epic } from '../modules';
import { Cta, MaxViews, Test, Variant } from '../lib/variants';
import { ArticlesViewedSettings } from '../types/shared';

// ---- MaxViews ---- //

const CONTROL_MAX_VIEWS: MaxViews = {
    maxViewsCount: 4,
    maxViewsDays: 30,
    minDaysBetweenViews: 0,
};

const ASK6_MAX_VIEWS: MaxViews = {
    maxViewsCount: 6,
    maxViewsDays: 30,
    minDaysBetweenViews: 0,
};

const ASK2_MAX_VIEWS: MaxViews = {
    maxViewsCount: 2,
    maxViewsDays: 30,
    minDaysBetweenViews: 0,
};

// ---- Paragraphs ---- //

const SHARED_PARAGRAPHS = [
    'With your help, we will continue to provide high-impact reporting that can counter misinformation and offer an authoritative, trustworthy source of news for everyone. With no shareholders or billionaire owner, we set our own agenda and provide truth-seeking journalism that’s free from commercial and political influence. When it’s never mattered more, we can investigate and challenge without fear or favour.',
    'Unlike many others, we have maintained our choice: to keep Guardian journalism open for all readers, regardless of where they live or what they can afford to pay. We do this because we believe in information equality, where everyone deserves to read accurate news and thoughtful analysis. Greater numbers of people are staying well-informed on world events, and being inspired to take meaningful action.',
    "We aim to offer readers a comprehensive, international perspective on critical events shaping our world – from the Black Lives Matter movement, to the new American administration, Brexit, and the world's slow emergence from a global pandemic. We are committed to upholding our reputation for urgent, powerful reporting on the climate emergency, and made the decision to reject advertising from fossil fuel companies, divest from the oil and gas industries, and set a course to achieve net zero emissions by 2030.",
    'If there were ever a time to join us, it is now. Every contribution, however big or small, powers our journalism and sustains our future.',
];

const UK_AUS_HIGHLY_ENGAGED_PARAGRAPHS = [
    '... we have a small favour to ask. You’ve read %%ARTICLE_COUNT%% articles in the last year. And you’re not alone; through these turbulent and challenging times, millions rely on the Guardian for independent journalism that stands for truth and integrity. Readers chose to support us financially more than 1.5 million times in 2020, joining existing supporters in 180 countries.',
    ...SHARED_PARAGRAPHS,
];

const UK_AUS_LESS_ENGAGED_PARAGRAPHS = [
    '... we have a small favour to ask. Through these turbulent and challenging times, millions rely on the Guardian for independent journalism that stands for truth and integrity. Readers chose to support us financially more than 1.5 million times in 2020, joining existing supporters in 180 countries.',
    ...SHARED_PARAGRAPHS,
];

const US_HIGHLY_ENGAGED_PARAGRAPHS = [
    '... we have a small favour to ask.  You’ve read %%ARTICLE_COUNT%% articles in the last year. And you’re not alone; through these turbulent and challenging times, millions rely on the Guardian for independent journalism that stands for truth and integrity. Readers chose to support us financially more than 1.5 million times in 2020, joining existing supporters in 180 countries.',
    ...SHARED_PARAGRAPHS,
];

const US_LESS_ENGAGED_PARAGRAPHS = [
    '... we have a small favour to ask. Across the US and around the world, millions rely on the Guardian for independent journalism that stands for truth and integrity. The Guardian has no shareholders or billionaire owner to please, and we invest every penny we earn back into our journalism. Readers chose to support us financially more than 1.5 million times in 2020, joining existing supporters in 180 countries.',
    ...SHARED_PARAGRAPHS,
];

const EU_ROW_HIGHLY_ENGAGED_PARAGRAPHS = [
    '… as you join us today from %%COUNTRY_NAME%%, we have a small favour to ask. You’ve read %%ARTICLE_COUNT%% articles in the last year. And you’re not alone; through these turbulent and challenging times, millions rely on the Guardian for independent journalism that stands for truth and integrity. Readers chose to support us financially more than 1.5 million times in 2020, joining existing supporters in 180 countries.',
    ...SHARED_PARAGRAPHS,
];

const EU_ROW_LESS_ENGAGED_PARAGRAPHS = [
    '... as you join us today from %%COUNTRY_NAME%%, we have a small favour to ask. Through these turbulent and challenging times, millions rely on the Guardian for independent journalism that stands for truth and integrity. Readers chose to support us financially more than 1.5 million times in 2020, joining existing supporters in 180 countries.',
    ...SHARED_PARAGRAPHS,
];

// ---- Other variant fields ---- //

const HIGHLIGHTED_TEXT =
    'Support the Guardian from as little as %%CURRENCY_SYMBOL%%1 – it only takes a minute. If you can, please consider supporting us with a regular amount each month. Thank you.';

const US_HIGHLIGHTED_TEXT =
    'Support the Guardian from as little as %%CURRENCY_SYMBOL%%1 – and it only takes a minute. Thank you.';

const CTA: Cta = {
    text: 'Support The Guardian',
    baseUrl: 'https://support.theguardian.com/contribute',
};

// ---- Variants ---- //

const BASE_VARIANT = {
    modulePathBuilder: epic.endpointPathBuilder,
    cta: CTA,
};

function getVariants(
    paragraphs: string[],
    kind: 'HIGHLY_ENGAGED' | 'LESS_ENGAGED',
    highlightedText: string = HIGHLIGHTED_TEXT,
): Variant[] {
    const control = {
        ...BASE_VARIANT,
        name: 'control',
        paragraphs,
        highlightedText,
        maxViews: CONTROL_MAX_VIEWS,
    };

    const variant =
        kind === 'HIGHLY_ENGAGED'
            ? {
                  ...BASE_VARIANT,
                  name: 'ask6',
                  paragraphs,
                  maxViews: ASK6_MAX_VIEWS,
              }
            : {
                  ...BASE_VARIANT,
                  name: 'ask2',
                  paragraphs,
                  maxViews: ASK2_MAX_VIEWS,
              };

    return [control, variant];
}

export const UK_AUS_HIGHLY_ENGAGED_VARIANTS = getVariants(
    UK_AUS_HIGHLY_ENGAGED_PARAGRAPHS,
    'HIGHLY_ENGAGED',
);
export const UK_AUS_LESS_ENGAGED_VARIANTS = getVariants(
    UK_AUS_LESS_ENGAGED_PARAGRAPHS,
    'LESS_ENGAGED',
);

export const US_HIGHLY_ENGAGED_VARIANTS = getVariants(
    US_HIGHLY_ENGAGED_PARAGRAPHS,
    'HIGHLY_ENGAGED',
    US_HIGHLIGHTED_TEXT,
);
export const US_LESS_ENGAGED_VARIANTS = getVariants(
    US_LESS_ENGAGED_PARAGRAPHS,
    'LESS_ENGAGED',
    US_HIGHLIGHTED_TEXT,
);

export const EU_ROW_HIGHLY_ENGAGED_VARIANTS = getVariants(
    EU_ROW_HIGHLY_ENGAGED_PARAGRAPHS,
    'HIGHLY_ENGAGED',
);
export const EU_ROW_LESS_ENGAGED_VARIANTS = getVariants(
    EU_ROW_LESS_ENGAGED_PARAGRAPHS,
    'LESS_ENGAGED',
);

// ---- Articles viewed settings ---- //

export const HIGHLY_ENGAGED_ARTICLES_VIEWED_SETTINGS: ArticlesViewedSettings = {
    minViews: 5,
    periodInWeeks: 52,
};

export const LESS_ENGAGED_ARTICLES_VIEWED_SETTINGS: ArticlesViewedSettings = {
    minViews: 0,
    maxViews: 5,
    periodInWeeks: 52,
};

// ---- Tests ---- //

export const BASE_TEST: Omit<Test, 'name' | 'locations' | 'variants'> = {
    campaignId: '',
    isOn: true,
    audience: 1,
    tagIds: [],
    sections: [],
    excludedTagIds: [],
    excludedSections: [],
    alwaysAsk: true,
    userCohort: 'AllNonSupporters',
    isLiveBlog: false,
    hasCountryName: false,
    highPriority: true,
    useLocalViewLog: true,
};
