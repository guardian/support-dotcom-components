import { getLocalCurrencySymbol } from '../../../shared/lib';
import { AmpVariantAssignments } from '../../lib/ampVariantAssignments';
import { AMPEpic, AmpEpicTest } from './ampEpicModels';
import { selectAmpEpic } from './ampEpicSelection';
import { TickerDataProvider } from '../../lib/fetchTickerData';
import { buildAmpEpicCampaignCode } from '../../lib/tracking';

async function ampFallbackEpic(geolocation?: string): Promise<AMPEpic> {
    const testName = 'FALLBACK';
    const variantName = 'CONTROL';
    const campaignCode = buildAmpEpicCampaignCode(testName, variantName);
    const currencySymbol = getLocalCurrencySymbol(geolocation);
    return {
        testName: testName,
        variantName: variantName,
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
        showChoiceCards: true,
    };
}

export async function ampEpic(
    tests: AmpEpicTest[],
    ampVariantAssignments: AmpVariantAssignments,
    tickerData: TickerDataProvider,
    countryCode?: string,
): Promise<AMPEpic> {
    const ampEpic = await selectAmpEpic(tests, ampVariantAssignments, tickerData, countryCode);

    // If no epic from the tool, fall back on a hardcoded epic
    return ampEpic ? ampEpic : ampFallbackEpic(countryCode);
}
