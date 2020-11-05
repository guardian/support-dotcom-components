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
                heading: 'Joe Biden has won …',
                paragraphs: [
                    '… renewing hope for the US and the world. After four years of turmoil, misinformation, manipulation and division, the result of this historic presidential election offers fresh promise for democracy and progress.',
                    'It’s been an agonising wait this week, with false claims and as yet unfounded allegations of electoral irregularities. It’s never been more important for the Guardian to report the facts with responsibility, integrity and independence. We’ve done just that, and will continue to bring you quality news and clear, intelligent analysis.',
                    'Now is the time to support a free press, and the Guardian’s independent, truthful journalism. With no shareholders or billionaire owner, our reporting is free from political or commercial influence. We can investigate, challenge and expose those in power. We report without fear or favour.',
                    'And because we believe everyone deserves access to trustworthy news, we keep Guardian reporting open for everyone to read, regardless of where they live or what they can afford to pay.',
                    'Our work is only possible thanks to the support we receive from our readers.',
                ],
                highlightedText: `If you can, support the Guardian today, from as little as ${currencySymbol}1. Thank you.`,
                cta: {
                    text: 'Show your support',
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
