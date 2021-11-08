const firstParagraph =
    'Tens of millions have placed their trust in the Guardian’s high-impact journalism since we started publishing 200 years ago, turning to us in moments of crisis, uncertainty, solidarity and hope. More than 1.5 million readers, from 180 countries, have recently taken the step to support us financially – keeping us open to all, and fiercely independent.';
const otherParagraphs = [
    'With no shareholders or billionaire owner, we can set our own agenda and provide trustworthy journalism that’s free from commercial and political influence, offering a counterweight to the spread of misinformation. When it’s never mattered more, we can investigate and challenge without fear or favour.',
    'Unlike many others, Guardian journalism is available for everyone to read, regardless of what they can afford to pay. We do this because we believe in information equality. Greater numbers of people can keep track of global events, understand their impact on people and communities, and become inspired to take meaningful action.',
    "We aim to offer readers a comprehensive, international perspective on critical events shaping our world – from the Black Lives Matter movement, to the new American administration, Brexit, and the world's slow emergence from a global pandemic. We are committed to upholding our reputation for urgent, powerful reporting on the climate emergency, and made the decision to reject advertising from fossil fuel companies, divest from the oil and gas industries, and set a course to achieve net zero emissions by 2030.",
    'If there were ever a time to join us, it is now. Every contribution, however big or small, powers our journalism and sustains our future.',
];

export const CONTROL_PARAGRAPHS = [
    `... we have a small favour to ask. ${firstParagraph}`,
    ...otherParagraphs,
];

export const VARIANT1_PARAGRAPHS = [
    `… and in the last six weeks alone, %%ARTICLE_COUNT%% of these were about the climate crisis. Thank you for turning to the Guardian. ${firstParagraph}`,
    ...otherParagraphs,
];

export const VARIANT2_PARAGRAPHS = [
    `… thank you for turning to the Guardian. ${firstParagraph}`,
    ...otherParagraphs,
];

export const HIGHLIGHTED_TEXT =
    'Support the Guardian from as little as %%CURRENCY_SYMBOL%%1 – it only takes a minute. If you can, please consider supporting us with a regular amount each month. Thank you.';

export const CTA = {
    text: 'Support the Guardian',
    baseUrl: 'https://support.theguardian.com/contribute',
};
