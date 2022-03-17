export const CTA = {
    text: 'Support the Guardian',
    baseUrl: 'https://support.theguardian.com/contribute',
};

export interface Copy {
    control: VariantCopy;
    variants: VariantCopy;
}

interface VariantCopy {
    paragraphs: string[];
    highlightedText: string;
}

export const UK_AUS_COPY: Copy = {
    control: {
        paragraphs: [
            '… congratulations on being one of our top readers globally. Did you know you’ve read %%ARTICLE_COUNT%% articles in the last year? Thank you for choosing the Guardian on so many occasions.',
            'Since we started publishing 200 years ago, tens of millions have placed their trust in the Guardian’s fearless journalism, turning to us in moments of crisis, uncertainty, solidarity and hope. More than 1.5 million supporters, from 180 countries, now power us financially – keeping us open to all, and fiercely independent.',
            'Unlike many others, the Guardian has no shareholders and no billionaire owner. Just the determination and passion to deliver high-impact global reporting, always free from commercial or political influence. Reporting like this is vital for democracy, for fairness and to demand better from the powerful.',
            'And we provide all this for free, for everyone to read. We do this because we believe in information equality. Greater numbers of people can keep track of the global events shaping our world, understand their impact on people and communities, and become inspired to take meaningful action. Millions can benefit from open access to quality, truthful news, regardless of their ability to pay for it.',
            'If there were ever a time to join us, it is now. Every contribution, however big or small, powers our journalism and sustains our future.',
        ],
        highlightedText:
            'Support the Guardian from as little as %%CURRENCY_SYMBOL%%1 – it only takes a minute. If you can, please consider supporting us with a regular amount each month. Thank you.',
    },
    variants: {
        paragraphs: [
            '… we have a small favour to ask. Since we started publishing 200 years ago, tens of millions have placed their trust in the Guardian’s fearless journalism, turning to us in moments of crisis, uncertainty, solidarity and hope. More than 1.5 million supporters, from 180 countries, now power us financially – keeping us open to all, and fiercely independent.',
            'Unlike many others, the Guardian has no shareholders and no billionaire owner. Just the determination and passion to deliver high-impact global reporting, always free from commercial or political influence. Reporting like this is vital for democracy, for fairness and to demand better from the powerful.',
            'And we provide all this for free, for everyone to read. We do this because we believe in information equality. Greater numbers of people can keep track of the global events shaping our world, understand their impact on people and communities, and become inspired to take meaningful action. Millions can benefit from open access to quality, truthful news, regardless of their ability to pay for it.',
            'If there were ever a time to join us, it is now. Every contribution, however big or small, powers our journalism and sustains our future.',
        ],
        highlightedText:
            'Support the Guardian from as little as %%CURRENCY_SYMBOL%%1 – it only takes a minute. If you can, please consider supporting us with a regular amount each month. Thank you.',
    },
};

export const EU_ROW_COPY: Copy = {
    control: {
        paragraphs: [
            '… congratulations on being one of our top readers globally. Did you know you’ve read %%ARTICLE_COUNT%% articles in the last year? Thank you for choosing the Guardian on so many occasions, and joining us today from %%COUNTRY_NAME%%.',
            'Since we started publishing 200 years ago, tens of millions have placed their trust in the Guardian’s fearless journalism, turning to us in moments of crisis, uncertainty, solidarity and hope. More than 1.5 million supporters, from 180 countries, now power us financially – keeping us open to all, and fiercely independent.',
            'Unlike many others, the Guardian has no shareholders and no billionaire owner. Just the determination and passion to deliver high-impact global reporting, always free from commercial or political influence. Reporting like this is vital for democracy, for fairness and to demand better from the powerful.',
            'And we provide all this for free, for everyone to read. We do this because we believe in information equality. Greater numbers of people can keep track of the global events shaping our world, understand their impact on people and communities, and become inspired to take meaningful action. Millions can benefit from open access to quality, truthful news, regardless of their ability to pay for it.',
            'If there were ever a time to join us, it is now. Every contribution, however big or small, powers our journalism and sustains our future.',
        ],
        highlightedText:
            'Support the Guardian from as little as %%CURRENCY_SYMBOL%%1 – it only takes a minute. If you can, please consider supporting us with a regular amount each month. Thank you.',
    },
    variants: {
        paragraphs: [
            '… as you’re joining us today from %%COUNTRY_NAME%%, we have a small favour to ask. Since we started publishing 200 years ago, tens of millions have placed their trust in the Guardian’s fearless journalism, turning to us in moments of crisis, uncertainty, solidarity and hope. More than 1.5 million supporters, from 180 countries, now power us financially – keeping us open to all, and fiercely independent.',
            'Unlike many others, the Guardian has no shareholders and no billionaire owner. Just the determination and passion to deliver high-impact global reporting, always free from commercial or political influence. Reporting like this is vital for democracy, for fairness and to demand better from the powerful.',
            'And we provide all this for free, for everyone to read. We do this because we believe in information equality. Greater numbers of people can keep track of the global events shaping our world, understand their impact on people and communities, and become inspired to take meaningful action. Millions can benefit from open access to quality, truthful news, regardless of their ability to pay for it.',
            'If there were ever a time to join us, it is now. Every contribution, however big or small, powers our journalism and sustains our future.',
        ],
        highlightedText:
            'Support the Guardian from as little as %%CURRENCY_SYMBOL%%1 – it only takes a minute. If you can, please consider supporting us with a regular amount each month. Thank you.',
    },
};

export const US_COPY: Copy = {
    control: {
        paragraphs: [
            '… congratulations on being one of our top readers globally. Did you know you’ve read %%ARTICLE_COUNT%% articles in the last year? Thank you for choosing the Guardian on so many occasions.',
            'Since we started publishing 200 years ago, tens of millions have placed their trust in the Guardian’s fearless journalism, turning to us in moments of crisis, uncertainty, solidarity and hope. More than 1.5 million supporters, from 180 countries, now power us financially – keeping us open to all, and fiercely independent.',
            'Unlike many others, the Guardian has no shareholders and no billionaire owner. Just the determination and passion to deliver high-impact global reporting, always free from commercial or political influence. Reporting like this is vital for democracy, for fairness and to demand better from the powerful.',
            'And we provide all this for free, for everyone to read. We do this because we believe in information equality. Greater numbers of people can keep track of the global events shaping our world, understand their impact on people and communities, and become inspired to take meaningful action. Millions can benefit from open access to quality, truthful news, regardless of their ability to pay for it.',
            'If there were ever a time to join us, it is now. Every contribution, however big or small, powers our journalism and sustains our future.',
        ],
        highlightedText:
            'Support the Guardian from as little as %%CURRENCY_SYMBOL%%1 – it only takes a minute. Thank you.',
    },
    variants: {
        paragraphs: [
            '… we have a small favour to ask. Since we started publishing 200 years ago, tens of millions have placed their trust in the Guardian’s fearless journalism, turning to us in moments of crisis, uncertainty, solidarity and hope. More than 1.5 million supporters, from 180 countries, now power us financially – keeping us open to all, and fiercely independent.',
            'Unlike many others, the Guardian has no shareholders and no billionaire owner. Just the determination and passion to deliver high-impact global reporting, always free from commercial or political influence. Reporting like this is vital for democracy, for fairness and to demand better from the powerful.',
            'And we provide all this for free, for everyone to read. We do this because we believe in information equality. Greater numbers of people can keep track of the global events shaping our world, understand their impact on people and communities, and become inspired to take meaningful action. Millions can benefit from open access to quality, truthful news, regardless of their ability to pay for it.',
            'If there were ever a time to join us, it is now. Every contribution, however big or small, powers our journalism and sustains our future.',
        ],
        highlightedText:
            'Support the Guardian from as little as %%CURRENCY_SYMBOL%%1 – it only takes a minute. Thank you.',
    },
};
