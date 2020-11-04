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
                heading: 'As a historic US election unfolds ...',
                paragraphs: [
                    '... the world waits to see what comes next. At this critical moment, responsible and accurate reporting has never mattered more. Guardian journalism strives to provide clarity and hope, so our readers can better understand the world. We will stand with those continuing the fight against the climate emergency, racial injustice and gender inequality – not to mention those working to overcome Covid-19.',
                    'This is a chaotic, precarious election steeped in misinformation. Now is the time to support independent journalism that stands for truth and integrity. Free from commercial or political bias, we can report fearlessly on critical events, hold power to account, and bring you a clear, international perspective.',
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
                heading: 'At this historic moment …',
                paragraphs: [
                    '… we hope you will consider making a contribution in support of the Guardian’s open, independent journalism. A robust free press is critical to a functioning democracy. In recent years, much of what the Guardian holds dear has been threatened – democracy, civility, science and truth.',
                    'We believe every one of us deserves equal access to truthful information and  fact-based news. So we’ve decided to keep Guardian journalism free for all readers, regardless of where they live or what they can afford to pay. This would not be possible without the generosity of our readers.',
                    'We need support from readers like you to keep delivering and distributing quality journalism. Every contribution, however big or small, is valuable.',
                ],
                highlightedText:
                    'Support the Guardian from as little as $1 – and it only takes a minute. Thank you.',
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
