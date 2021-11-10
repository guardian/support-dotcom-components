// ---- Types ---- //

export interface Copy {
    controlParagraphs: string[];
    v1Paragraphs: string[];
    v2Paragraphs: string[];
    highlightedText: string;
}

// ---- Global copy ---- //

const firstParagraph =
    'Tens of millions have placed their trust in the Guardian’s high-impact journalism since we started publishing 200 years ago, turning to us in moments of crisis, uncertainty, solidarity and hope. More than 1.5 million readers, from 180 countries, have recently taken the step to support us financially – keeping us open to all, and fiercely independent.';
const otherParagraphs = [
    'With no shareholders or billionaire owner, we can set our own agenda and provide trustworthy journalism that’s free from commercial and political influence, offering a counterweight to the spread of misinformation. When it’s never mattered more, we can investigate and challenge without fear or favour.',
    'Unlike many others, Guardian journalism is available for everyone to read, regardless of what they can afford to pay. We do this because we believe in information equality. Greater numbers of people can keep track of global events, understand their impact on people and communities, and become inspired to take meaningful action.',
    "We aim to offer readers a comprehensive, international perspective on critical events shaping our world – from the Black Lives Matter movement, to the new American administration, Brexit, and the world's slow emergence from a global pandemic. We are committed to upholding our reputation for urgent, powerful reporting on the climate emergency, and made the decision to reject advertising from fossil fuel companies, divest from the oil and gas industries, and set a course to achieve net zero emissions by 2030.",
    'If there were ever a time to join us, it is now. Every contribution, however big or small, powers our journalism and sustains our future.',
];

const GLOBAL_CONTROL_PARAGRAPHS = [
    `... we have a small favour to ask. ${firstParagraph}`,
    ...otherParagraphs,
];

const GLOBAL_VARIANT1_PARAGRAPHS = [
    `… and in the last six weeks alone, %%ARTICLE_COUNT%% of these were about the climate crisis. Thank you for turning to the Guardian. ${firstParagraph}`,
    ...otherParagraphs,
];

const GLOBAL_VARIANT2_PARAGRAPHS = [
    `… thank you for turning to the Guardian. ${firstParagraph}`,
    ...otherParagraphs,
];

const GLOBAL_HIGHLIGHTED_TEXT =
    'Support the Guardian from as little as %%CURRENCY_SYMBOL%%1 – it only takes a minute. If you can, please consider supporting us with a regular amount each month. Thank you.';

export const GLOBAL_COPY: Copy = {
    controlParagraphs: GLOBAL_CONTROL_PARAGRAPHS,
    v1Paragraphs: GLOBAL_VARIANT1_PARAGRAPHS,
    v2Paragraphs: GLOBAL_VARIANT2_PARAGRAPHS,
    highlightedText: GLOBAL_HIGHLIGHTED_TEXT,
};

// ---- US copy ---- //

const usFirstParagraph =
    'With much of the US now trapped in a vicious cycle of heat, wildfires and drought, our climate journalism has never been more essential, and we need your support to keep producing it.';

const usOtherParagraphs = [
    'Perhaps you’re familiar with the Guardian’s reputation for hard-hitting, urgent reporting on the environment. We view the climate crisis as the defining issue of our time. It is already here, making growing parts of our planet uninhabitable. As parts of the world emerge from the pandemic, carbon emissions are again on the rise, risking a rare opportunity to transition to a more sustainable future.',
    'The Guardian has renounced fossil fuel advertising, becoming the first major global news organisation to do so. We have committed to achieving net zero emissions by 2030. And we are consistently increasing our investment in environmental reporting, recognising that an informed public is crucial to keeping the worst of the crisis at bay.',
    'More than 1.5 million readers, in 180 countries, have recently taken the step to support us financially – keeping us open to all and fiercely independent. With no shareholders or billionaire owner, we can set our own agenda and provide trustworthy journalism that’s free from commercial and political influence, offering a counterweight to the spread of misinformation. When it’s never mattered more, we can investigate and challenge without fear or favour.',
    'Unlike many others, Guardian journalism is available for everyone to read, regardless of what they can afford to pay. We do this because we believe in information equality. Greater numbers of people can keep track of global events, understand their impact on people and communities, and become inspired to take meaningful action.',
    'If there were ever a time to join us, it is now. Every contribution, however big or small, powers our journalism and sustains our future.',
];

const US_CONTROL_PARAGRAPHS = [
    `... we have a small favour to ask. ${usFirstParagraph}`,
    ...usOtherParagraphs,
];

const US_VARIANT1_PARAGRAPHS = [
    `… and in the last six weeks alone, %%ARTICLE_COUNT%% of these were about the climate crisis. Thank you for turning to the Guardian. ${usFirstParagraph}`,
    ...usOtherParagraphs,
];

const US_VARIANT2_PARAGRAPHS = [
    `… thank you for turning to the Guardian. ${usFirstParagraph}`,
    ...usOtherParagraphs,
];

const US_HIGHLIGHTED_TEXT =
    'Support the Guardian from as little as %%CURRENCY_SYMBOL%%1 – it only takes a minute. Thank you.';

export const US_COPY: Copy = {
    controlParagraphs: US_CONTROL_PARAGRAPHS,
    v1Paragraphs: US_VARIANT1_PARAGRAPHS,
    v2Paragraphs: US_VARIANT2_PARAGRAPHS,
    highlightedText: US_HIGHLIGHTED_TEXT,
};

// ---- Shared ---- //

export const CTA = {
    text: 'Support the Guardian',
    baseUrl: 'https://support.theguardian.com/contribute',
};
