import { getLocalCurrencySymbol } from '../lib/geolocation';

interface AMPCta {
    text: string;
    url: string;
    componentId: string;
    campaignCode: string;
}

interface AMPEpic {
    heading?: string;
    paragraphs: string[];
    highlightedText?: string;
    cta: AMPCta;
}

// See https://amp.dev/documentation/components/amp-list/
interface AMPEpicResponse {
    items: AMPEpic[];
}

function ampDefaultEpic(geolocation?: string): AMPEpicResponse {
    const campaignCode = 'AMP_EPIC_AUGUST2020';
    const currencySymbol = getLocalCurrencySymbol(geolocation);
    return {
        items: [
            {
                heading: 'Four more years of Donald Trump...',
                paragraphs: [
                    '...would have serious consequences for the world. America faces an epic choice and the result will have global repercussions for democracy, progress and solidarity for generations.',
                    'In monumental moments like this, an independent, truth-seeking news organisation like the Guardian is essential. Free from commercial or political bias, we can report fearlessly on critical events, hold power to account, and bring you a clear, international perspective.',
                    'And because we believe everyone deserves access to trustworthy news and analysis, we keep Guardian journalism open and free for all readers, regardless of where they live or what they can afford to pay. ',
                    'Our work is only possible thanks to the support we receive from our readers.',
                ],
                highlightedText: `If you can, support the Guardian’s journalism today, from as little as ${currencySymbol}1. Thank you.`,
                cta: {
                    text: 'Support the Guardian',
                    url: 'https://support.theguardian.com/contribute',
                    campaignCode: campaignCode,
                    componentId: campaignCode,
                },
            },
        ],
    };
}

function ampUsEpic(): AMPEpicResponse {
    const campaignCode = 'AMP_USREGION_EPIC';
    return {
        items: [
            {
                heading: 'America faces an epic choice ...',
                paragraphs: [
                    '... in the coming days, and the results will define the country for a generation. Over the last four years, much of what the Guardian holds dear has been threatened – democracy, civility, truth.',
                    'At a time like this, an independent news organisation that fights for truth and holds power to account is not just optional. It is essential. Because we believe every one of us deserves equal access to fact-based news and analysis, we’ve decided to keep Guardian journalism free for all readers, regardless of where they live or what they can afford to pay. This is made possible thanks to the support we receive from readers.',
                ],
                highlightedText:
                    'If you can, support the Guardian’s journalism with as little as $1 – it only takes a minute. Thank you.',
                cta: {
                    text: 'Support the Guardian',
                    url: 'https://support.theguardian.com/contribute',
                    campaignCode: campaignCode,
                    componentId: campaignCode,
                },
            },
        ],
    };
}

export function ampEpic(geolocation?: string): AMPEpicResponse {
    const epic = geolocation === 'US' ? ampUsEpic() : ampDefaultEpic(geolocation);
    return epic;
}
