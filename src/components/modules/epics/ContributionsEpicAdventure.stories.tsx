import React from 'react';
import { Story, Meta } from '@storybook/react';
import { EpicProps } from './ContributionsEpic';
import { props, variant } from './utils/storybook';
import { from } from '@guardian/src-foundations/mq';
import { css } from '@emotion/core';
import { palette } from '@guardian/src-foundations';
import { ContributionsEpic } from './ContributionsEpicAdventure';
import { replaceArticleCount } from '../../../lib/replaceArticleCount';
import { replaceNonArticleCountPlaceholders } from '../../../lib/placeholders';
import { Adventure, buildAdventure } from '../../../lib/adventure';

const contributionsAdventure: Adventure = buildAdventure([
    {
        name: 'start',
        paragraphs: () => [
            `Would you be surprised to hear that you're one of our top readers globally?`,
        ],
        options: [
            {
                targetName: 'article-count',
                text: 'Yes!',
            },
            {
                targetName: 'article-count',
                text: 'No',
            },
        ],
    },
    {
        name: 'article-count',
        paragraphs: info => [
            replaceArticleCount(
                `Well - you've read %%ARTICLE_COUNT%% articles in the last year! And you’re not alone; through these turbulent and challenging times, millions rely on the Guardian for independent journalism that stands for truth and integrity.`,
                info.numArticles,
                'epic',
            ),
            'Would you like to know how readers are supporting the Guardian?',
        ],
        options: [
            {
                targetName: 'supporters',
                text: 'Yes',
            },
            {
                targetName: 'no',
                text: 'No',
            },
        ],
    },
    {
        name: 'supporters',
        paragraphs: info => [
            `Our readers chose to support us financially more than 1.5 million times in 2020, joining existing supporters in 180 countries${replaceNonArticleCountPlaceholders(
                ' - including %%COUNTRY_NAME%%',
                info.countryCode,
            )}.`,
        ],
        options: [
            {
                targetName: 'why',
                text: 'Why should I support the Guardian?',
            },
        ],
    },
    {
        name: 'why',
        paragraphs: () => [
            'With your help, we will continue to provide high-impact reporting that can counter misinformation and offer an authoritative, trustworthy source of news for everyone. With no shareholders or billionaire owner, we set our own agenda and provide truth-seeking journalism that’s free from commercial and political influence. When it’s never mattered more, we can investigate and challenge without fear or favour.',
        ],
        options: [
            {
                targetName: 'yes',
                text: 'Count me in!',
            },
            {
                targetName: 'no',
                text: `I'll pass`,
            },
        ],
    },
    {
        name: 'no',
        paragraphs: () => [
            `That's ok. Unlike many others, we have maintained our choice: to keep Guardian journalism open for all readers, regardless of where they live or what they can afford to pay. We do this because we believe in information equality, where everyone deserves to read accurate news and thoughtful analysis. Greater numbers of people are staying well-informed on world events, and being inspired to take meaningful action.`,
        ],
        options: [],
    },
    {
        name: 'yes',
        paragraphs: () => [
            'Great! If there were ever a time to join us, it is now. You can power Guardian journalism and help sustain our future.',
        ],
        options: [],
    },
]);

const contributionsProps: EpicProps = {
    ...props,
    numArticles: 50,
    countryCode: 'GB',
    variant: {
        ...variant,
        adventure: contributionsAdventure,
    },
};

const containerStyles = css`
    margin: 3em auto;
    padding: 0 10px;
    max-width: 620px;

    ${from.mobileLandscape} {
        padding: 0 20px;
    }
`;

const backgroundStyles = css`
    background-color: ${palette.neutral[97]};
`;

export const EpicDecorator = (Story: Story): JSX.Element => (
    <div css={containerStyles}>
        <div css={backgroundStyles}>
            <Story />
        </div>
    </div>
);

export default {
    component: ContributionsEpic,
    title: 'Epics/ContributionsEpicAdventure',
    args: contributionsProps,
    decorators: [EpicDecorator],
    excludeStories: /.*Decorator$/,
} as Meta;

const Template: Story<EpicProps> = (props: EpicProps) => <ContributionsEpic {...props} />;

export const Default = Template.bind({});
