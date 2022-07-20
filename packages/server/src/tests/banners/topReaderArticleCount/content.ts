import { BannerContent, SecondaryCtaType } from '@sdc/shared/types';

export const content: BannerContent = {
    heading: 'Lend us a hand in 2022',
    messageText:
        "We are proud to say we're a reader-funded global news organisation, with more than 1.5 million supporters in 180 countries. This vital support keeps us fiercely independent, free from shareholders or a billionaire owner. It means we can keep our quality reporting open for everyone to read. We do this because we believe in information equality, and we know not everyone is in a position to pay for news. <strong>But if you are, we need you.</strong> You can make an investment in Guardian journalism today, so millions more can benefit from reliable information on the events shaping our world.",
    paragraphs: [
        "We are proud to say we're a reader-funded global news organisation, with more than 1.5 million supporters in 180 countries. This vital support keeps us fiercely independent, free from shareholders or a billionaire owner. It means we can keep our quality reporting open for everyone to read. We do this because we believe in information equality, and we know not everyone is in a position to pay for news. <strong>But if you are, we need you.</strong> You can make an investment in Guardian journalism today, so millions more can benefit from reliable information on the events shaping our world.",
    ],
    highlightedText: 'Support the Guardian today from as little as %%CURRENCY_SYMBOL%%1.',
    cta: {
        text: 'Support us monthly',
        baseUrl: 'https://support.theguardian.com/contribute',
    },
    secondaryCta: {
        type: SecondaryCtaType.Custom,
        cta: {
            text: 'Support just once',
            baseUrl:
                'https://support.theguardian.com/contribute?selected-contribution-type=ONE_OFF',
        },
    },
};
