import { calculateOverallMeanForVariant, getBanditSamplesForTest } from '../server/selection/banditData';
import type { BanditData } from '../server/selection/banditData';
import { selectVariantUsingRoulette } from '../server/selection/rouletteSelection';
import type { Channel } from '../shared/types';
import type { Test, Variant } from '../shared/types';

interface AnalysisConfig {
    testName: string;
    channel: Channel;
    timestep: number;
    impressions: number;
}

async function analyzeRouletteWithRealData(config: AnalysisConfig) {
    // Fetch real bandit samples up to the specified timestep
    const allSamples = await getBanditSamplesForTest(config.testName, config.channel);
    // allSamples is in reverse chronological order
    const samples = allSamples
        .sort((a, b) => a.timestamp.localeCompare(b.timestamp))
        .slice(0, config.timestep);

    if (samples.length === 0) {
        console.log(`No samples found for test ${config.testName}`);
        return;
    }

    console.log(`Found ${samples.length} samples for test ${config.testName}`);
    console.log(`Final sample is ${JSON.stringify(samples[samples.length - 1])}`);

    // Extract variant names from the samples
    const allVariantSamples = samples.flatMap(s => s.variants);
    const variantNames = [...new Set(allVariantSamples.map(v => v.variantName))];

    // Calculate mean for each variant
    const banditData: BanditData = {
        testName: config.testName,
        sortedVariants: variantNames.map(variantName => {
            const variantSamples = allVariantSamples.filter(s => s.variantName === variantName);
            return {
                variantName,
                mean: calculateOverallMeanForVariant(variantSamples),
            };
        }).sort((a, b) => b.mean - a.mean),
    };

    console.log(`\nVariant means after ${samples.length} timesteps:`);
    banditData.sortedVariants.forEach(v => {
        console.log(`  ${v.variantName}: ${v.mean.toFixed(3)}`);
    });

    // Create test object
    const test: Test<Variant> = {
        channel: config.channel,
        name: config.testName,
        status: 'Live',
        priority: 1,
        variants: variantNames.map(name => ({ name })),
    };

    // Run roulette selection for the specified number of impressions
    const impressionCounts: Record<string, number> = {};
    variantNames.forEach(name => impressionCounts[name] = 0);

    for (let i = 0; i < config.impressions; i++) {
        const variant = selectVariantUsingRoulette(test, banditData);
        if (variant) {
            impressionCounts[variant.name]++;
        }
    }

    console.log(`\nImpression distribution at timestep ${config.timestep} for ${config.impressions} impressions:`);
    Object.entries(impressionCounts)
        .sort((a, b) => b[1] - a[1])
        .forEach(([name, count]) => {
            const percentage = ((count / config.impressions) * 100).toFixed(2);
            console.log(`  ${name}: ${count} impressions (${percentage}%)`);
        });
}

analyzeRouletteWithRealData({
    testName: '2026-01-21_JANUARY_DISCOUNT_EPIC__US',
    channel: 'Epic',
    timestep: 144,
    impressions: 4600,
}).catch(console.error);
