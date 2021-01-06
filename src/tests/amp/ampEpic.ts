import { getLocalCurrencySymbol } from '../../lib/geolocation';
import { AMPEpic } from './ampEpicModels';
import { selectAmpEpic } from './ampEpicTests';
import { AmpVariantAssignments } from '../../lib/ampVariantAssignments';

async function ampFallbackEpic(geolocation?: string): Promise<AMPEpic> {
    const campaignCode = 'AMP_FALLBACK_EPIC';
    const currencySymbol = getLocalCurrencySymbol(geolocation);
    return {
        testName: 'FALLBACK',
        variantName: 'CONTROL',
        heading: "Since you're here ...",
        paragraphs: [
            '... we have a small favour to ask. Millions turn to the Guardian every day for vital, independent, quality journalism. Readers in 180 countries around the world now support us financially.',
            'Now is the time to support a free press and truth-seeking journalism. With no shareholders or billionaire owner, we are free from political or commercial influence. We can investigate, challenge and expose those in power, and report without fear or favour.',
            'And because we believe everyone deserves access to trustworthy, fact-led news and analysis, we keep Guardian reporting open for all readers, regardless of where they live or what they can afford to pay.',
            'We rely on readers’ generosity to power our work and protect our independence. Every contribution, however big or small, makes a difference for our future.',
        ],
        highlightedText: `You can show your support today from as little as ${currencySymbol}1. Thank you.`,
        cta: {
            text: 'Support the Guardian',
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

    // If no epic from the tool, fall back on a hardcoded epic
    return ampEpic ? ampEpic : ampFallbackEpic(countryCode);
}
