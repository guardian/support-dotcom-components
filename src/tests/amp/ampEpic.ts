import { getLocalCurrencySymbol } from '../../lib/geolocation';
import { AMPEpicResponse } from './ampEpicModels';
import { selectAmpEpic } from './ampEpicTests';

async function ampDefaultEpic(geolocation?: string): Promise<AMPEpicResponse> {
    const campaignCode = 'AMP_EPIC_AUGUST2020';
    const currencySymbol = getLocalCurrencySymbol(geolocation);
    return {
        items: [
            {
                heading: 'Joe Biden has won ...',
                paragraphs: [
                    '... renewing hope for the US and the world. After four years of turmoil, misinformation, manipulation and division, the result of this historic presidential election offers fresh promise for democracy and progress.',
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

async function ampUsEpic(): Promise<AMPEpicResponse> {
    const campaignCode = 'AMP_USREGION_EPIC';
    return {
        items: [
            {
                heading: 'A fresh start for America ...',
                paragraphs: [
                    '... as Joe Biden and Kamala Harris win the US election. The American people have spoken loudly to disavow the last four years of chaos and division. The voters have chosen a new path. Now, the real work begins.',
                    'The Guardian welcomes the opportunity to refocus our journalism on the opportunities that lie ahead for America: the opportunity to fix a broken healthcare system, to restore the role of science in government, to repair global alliances, and to address the corrosive racial bias in our schools, criminal justice system and other institutions.',
                    'Because we believe every one of us deserves equal access to fact-based news and analysis, we’ve decided to keep Guardian journalism free for all readers, regardless of where they live or what they can afford to pay. This is made possible thanks to the support we receive from readers.',
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

export async function ampEpic(countryCode?: string): Promise<AMPEpicResponse> {
    const ampEpic = await selectAmpEpic(countryCode);
    if (ampEpic) {
        return {
            items: [ampEpic],
        };
    }

    // No epic from the tool, fall back on a hardcoded epic
    return countryCode === 'US' ? ampUsEpic() : ampDefaultEpic(countryCode);
}
