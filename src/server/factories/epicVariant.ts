import type { EpicVariant } from '../../shared/types';

export default (overrides?: Partial<EpicVariant>): EpicVariant => ({
    name: 'Example Variant',
    heading: 'Since you’re here...',
    paragraphs: [
        '... we have a small favour to ask. More people, like you, are reading and supporting the Guardian’s independent, investigative journalism than ever before. And unlike many news organisations, we made the choice to keep our reporting open for all, regardless of where they live or what they can afford to pay.',
        'The Guardian will engage with the most critical issues of our time – from the escalating climate catastrophe to widespread inequality to the influence of big tech on our lives. At a time when factual information is a necessity, we believe that each of us, around the world, deserves access to accurate reporting with integrity at its heart.',
        'Our editorial independence means we set our own agenda and voice our own opinions. Guardian journalism is free from commercial and political bias and not influenced by billionaire owners or shareholders. This means we can give a voice to those less heard, explore where others turn away, and rigorously challenge those in power.',
        'We hope you will consider supporting us today. We need your support to keep delivering quality journalism that’s open and independent. Every reader contribution, however big or small, is so valuable. ',
    ],
    highlightedText:
        'Support The Guardian from as little as %%CURRENCY_SYMBOL%%1 - and it only takes a minute. Thank you.',
    image: {
        mainUrl:
            'https://media.guim.co.uk/a2d31356be7dad09518b09aa5f39a4c7994e08c1/0_511_4262_2539/1000.jpg',
        altText: 'An image of a cat',
    },
    cta: {
        text: 'Contribute to The Guardian!',
        baseUrl: 'https://support.theguardian.com/support',
    },
    ...overrides,
});
