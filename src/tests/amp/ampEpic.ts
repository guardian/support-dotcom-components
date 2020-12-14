import { getLocalCurrencySymbol } from '../../lib/geolocation';
import { AMPEpic } from './ampEpicModels';
import { selectAmpEpic } from './ampEpicTests';
import { AmpVariantAssignments } from '../../lib/ampVariantAssignments';

async function ampFallbackEpic(geolocation?: string): Promise<AMPEpic> {
    const campaignCode = 'AMP_FALLBACK_EPIC';
    const currencySymbol = getLocalCurrencySymbol(geolocation);
    return {
        testName: 'fallback',
        variantName: 'CONTROL',
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
    };
}

export async function ampEpic(
    ampVariantAssignments: AmpVariantAssignments,
    countryCode?: string,
): Promise<AMPEpic> {
    const ampEpic = await selectAmpEpic(ampVariantAssignments, countryCode);
    if (ampEpic) {
        return ampEpic;
    }

    // No epic from the tool, fall back on a hardcoded epic
    return ampFallbackEpic(countryCode);
}
