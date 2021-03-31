import { Cta } from '../lib/variants';

const SHARED_PARAGRAPHS = [
    'With your help, we will continue to provide high-impact reporting that can counter misinformation and offer an authoritative, trustworthy source of news for everyone. With no shareholders or billionaire owner, we set our own agenda and provide truth-seeking journalism that’s free from commercial and political influence. When it’s never mattered more, we can investigate and challenge without fear or favour.',
    'Unlike many others, we have maintained our choice: to keep Guardian journalism open for all readers, regardless of where they live or what they can afford to pay. We do this because we believe in information equality, where everyone deserves to read accurate news and thoughtful analysis. Greater numbers of people are staying well-informed on world events, and being inspired to take meaningful action.',
    "We aim to offer readers a comprehensive, international perspective on critical events shaping our world – from the Black Lives Matter movement, to the new American administration, Brexit, and the world's slow emergence from a global pandemic. We are committed to upholding our reputation for urgent, powerful reporting on the climate emergency, and made the decision to reject advertising from fossil fuel companies, divest from the oil and gas industries, and set a course to achieve net zero emissions by 2030.",
    'If there were ever a time to join us, it is now. Every contribution, however big or small, powers our journalism and sustains our future.',
];

export const UK_AUS_CONTROL_PARAGRAPHS = [
    '… we have a small favour to ask. You’ve read %%ARTICLE_COUNT%% articles in the last year. And you’re not alone; through these turbulent and challenging times, millions rely on the Guardian for independent journalism that stands for truth and integrity. Readers chose to support us financially more than 1.5 million times in 2020, joining existing supporters in 180 countries.',
    ...SHARED_PARAGRAPHS,
];

export const UK_AUS_VARIANTS_PARAGRAPHS = [
    '… we have a small favour to ask. Through these turbulent and challenging times, millions rely on the Guardian for independent journalism that stands for truth and integrity. Readers chose to support us financially more than 1.5 million times in 2020, joining existing supporters in 180 countries.',
    ...SHARED_PARAGRAPHS,
];

export const EU_ROW_CONTROL_PARAGRAPHS = [
    '… as you join us today from %%COUNTRY_NAME%%, we have a small favour to ask. You’ve read %%ARTICLE_COUNT%% articles in the last year. And you’re not alone; through these turbulent and challenging times, millions rely on the Guardian for independent journalism that stands for truth and integrity. Readers chose to support us financially more than 1.5 million times in 2020, joining existing supporters in 180 countries.',
    ...SHARED_PARAGRAPHS,
];

export const EU_ROW_VARIANTS_PARAGRAPHS = [
    '… as you join us today from %%COUNTRY_NAME%%, we have a small favour to ask. Through these turbulent and challenging times, millions rely on the Guardian for independent journalism that stands for truth and integrity. Readers chose to support us financially more than 1.5 million times in 2020, joining existing supporters in 180 countries.',
    ...SHARED_PARAGRAPHS,
];

export const HIGHLIGHTED_TEXT =
    'Support the Guardian from as little as %%CURRENCY_SYMBOL%%1 – it only takes a minute. If you can, please consider supporting us with a regular amount each month. Thank you.';

export const CTA: Cta = {
    text: 'Support The Guardian',
    baseUrl: 'https://support.theguardian.com/contribute',
};
