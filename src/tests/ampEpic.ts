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
                heading: 'Since you’re here...',
                paragraphs: [
                    '… we’re asking readers like you to support our open, independent journalism. Millions are flocking to the Guardian for high-quality news every day, and readers in 180 countries around the world now support us financially – this makes our work possible.',
                    'We believe every one of us deserves equal access to factual information and analysis that has authority and integrity. So, unlike many others, we keep Guardian journalism open for all, regardless of where they live or what they can afford to pay.',
                    'The Guardian’s independence means we investigate, interrogate and expose the actions of those in power, without fear. Our journalism is free from commercial and political bias – never influenced by billionaire owners or shareholders. This makes us different. We can give a voice to the oppressed and neglected, and stand in solidarity with those who are calling for a fairer future.',
                    'Every contribution, however big or small, is so valuable for our future.',
                ],
                highlightedText: `Support the Guardian from as little as ${currencySymbol}1 – and it only takes a minute. Thank you.`,
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
