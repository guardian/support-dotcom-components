import React, { ReactElement } from 'react';
import { ContributionsEpic } from './ContributionsEpic';
import { withKnobs, text, array } from '@storybook/addon-knobs';
import { StorybookWrapper } from '../utils/StorybookWrapper';

export default {
    component: ContributionsEpic,
    title: 'Components/ContributionsEpic',
    decorators: [withKnobs],
};

export const defaultStory = (): ReactElement => {
    // Epic content props
    const epicContent = {
        heading: text('heading', 'Since you’re here...'),
        paragraphs: array('paragraphs', [
            '… we have a small favour to ask. More people, like you, are reading and supporting the Guardian’s independent, investigative journalism than ever before. And unlike many news organisations, we made the choice to keep our reporting open for all, regardless of where they live or what they can afford to pay.',
            'The Guardian will engage with the most critical issues of our time – from the escalating climate catastrophe to widespread inequality to the influence of big tech on our lives. At a time when factual information is a necessity, we believe that each of us, around the world, deserves access to accurate reporting with integrity at its heart.',
            'Our editorial independence means we set our own agenda and voice our own opinions. Guardian journalism is free from commercial and political bias and not influenced by billionaire owners or shareholders. This means we can give a voice to those less heard, explore where others turn away, and rigorously challenge those in power.',
            'We hope you will consider supporting us today. We need your support to keep delivering quality journalism that’s open and independent. Every reader contribution, however big or small, is so valuable. ',
        ]),
        highlighted: array('highlighted', [
            'Support The Guardian from as little as £1 – and it only takes a minute. Thank you.',
        ]),
    };

    // Epic metadata props
    const epicMetadata = {
        ophanPageId: text('ophanPageId', 'k5nxn0mxg7ytwpkxuwms'),
        ophanComponentId: text('ophanComponentId', 'ACQUISITIONS_EPIC'),
        platformId: text('platformId', 'GUARDIAN_WEB'),
        campaignCode: text(
            'campaignCode',
            'gdnwb_copts_memco_2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron_v2_stay_quiet',
        ),
        abTestName: text('abTestName', '2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron'),
        abTestVariant: text('abTestVariant', 'v2_stay_quiet'),
        referrerUrl: text(
            'referrerUrl',
            'http://localhost:3000/politics/2020/jan/17/uk-rules-out-automatic-deportation-of-eu-citizens-verhofstadt-brexit',
        ),
    };

    return (
        <StorybookWrapper>
            <ContributionsEpic content={epicContent} metadata={epicMetadata} />
        </StorybookWrapper>
    );
};

defaultStory.story = { name: 'Default epic' };
