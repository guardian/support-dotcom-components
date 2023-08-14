import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ContributionsEpicUnvalidated as ContributionsEpic } from './ContributionsEpic';
import { props } from './utils/storybook';
import { from } from '@guardian/src-foundations/mq';
import { css } from '@emotion/react';
import { palette } from '@guardian/src-foundations';
import { EpicProps, SecondaryCtaType, TickerCountType, TickerEndType } from '@sdc/shared/types';

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
    title: 'Epics/Contributions',
    args: props,
    decorators: [EpicDecorator],
    excludeStories: /.*Decorator$/,
} as Meta;

const Template: Story<EpicProps> = (props: EpicProps) => <ContributionsEpic {...props} />;

export const Default = Template.bind({});

export const WithBackgroundImage = Template.bind({});
WithBackgroundImage.args = {
    variant: {
        ...props.variant,
        image: {
            mainUrl:
                'https://media.guim.co.uk/a2d31356be7dad09518b09aa5f39a4c7994e08c1/0_511_4262_2539/1000.jpg',
            altText: 'An image of a cat',
        },
    },
};

export const WithBylineAndHeadshot = Template.bind({});
WithBylineAndHeadshot.args = {
    variant: {
        ...props.variant,
        separateArticleCount: {
            type: 'above',
        },
        bylineWithImage: {
            name: 'Lenore Taylor',
            description: 'Editor, Guardian Australia',
            headshot: {
                mainUrl:
                    'https://i.guim.co.uk/img/media/8eda1b06a686fe5ab4f7246bd6b5f8e63851088e/0_0_300_250/300.png?quality=85&s=f42e9642f335d705cab8b712bbbcb64e',
                altText: 'Lenore Taylor staff byline photograph',
            },
        },
        heading: '',
        paragraphs: [
            '… when I joined Guardian Australia as founding political editor, I wanted to be part of a project that brought a new, independent, fierce and progressive voice to one of the most heavily concentrated media markets in the world.',
            'From the start, we identified issues we felt were underreported and where we thought we could make a difference: the climate emergency, Indigenous affairs, gender equality, welfare policy, the treatment of asylum seekers. Nearly a decade later, and six years after I stepped up to be editor, I believe our reporting is making a difference.',
            'On climate, we have consistently called out inaction and written about how things might be. We have held policy-makers to account and documented how global heating is changing the lives of Australians. We have helped to shift the debate on Indigenous deaths in custody via our years-long Deaths Inside investigation, and produced award-winning coverage of the fight for gender equality.',
            "But the fight for progress continues, and we can't do any of this without the support of our readers. It is your passion, engagement and financial contributions which underpin our journalism. We have no billionaire owner or shareholders. We are independent, and every dollar we receive is invested back into creating quality journalism that remains free and open for all to read.",
            'If you are able to help with a monthly or single contribution, it will boost our resources and enhance our ability to continue this vital work.',
            'Thank you',
        ],
        highlightedText: '',
    },
    articleCounts: {
        for52Weeks: 25,
        forTargetedWeeks: 25,
    },
    hasConsentForArticleCount: true,
};

export const WithBylineOnly = Template.bind({});
WithBylineOnly.args = {
    variant: {
        ...props.variant,
        separateArticleCount: {
            type: 'above',
        },
        bylineWithImage: {
            name: 'Lenore Taylor',
            description: 'Editor, Guardian Australia',
        },
        heading: '',
        paragraphs: [
            '… when I joined Guardian Australia as founding political editor, I wanted to be part of a project that brought a new, independent, fierce and progressive voice to one of the most heavily concentrated media markets in the world.',
            'From the start, we identified issues we felt were underreported and where we thought we could make a difference: the climate emergency, Indigenous affairs, gender equality, welfare policy, the treatment of asylum seekers. Nearly a decade later, and six years after I stepped up to be editor, I believe our reporting is making a difference.',
            'On climate, we have consistently called out inaction and written about how things might be. We have held policy-makers to account and documented how global heating is changing the lives of Australians. We have helped to shift the debate on Indigenous deaths in custody via our years-long Deaths Inside investigation, and produced award-winning coverage of the fight for gender equality.',
            "But the fight for progress continues, and we can't do any of this without the support of our readers. It is your passion, engagement and financial contributions which underpin our journalism. We have no billionaire owner or shareholders. We are independent, and every dollar we receive is invested back into creating quality journalism that remains free and open for all to read.",
            'If you are able to help with a monthly or single contribution, it will boost our resources and enhance our ability to continue this vital work.',
            'Thank you',
        ],
        highlightedText: '',
    },
    articleCounts: {
        for52Weeks: 25,
        forTargetedWeeks: 25,
    },
    hasConsentForArticleCount: true,
};

export const WithReminder = Template.bind({});
WithReminder.args = {
    variant: {
        ...props.variant,
        secondaryCta: {
            type: SecondaryCtaType.ContributionsReminder,
        },
        showReminderFields: {
            reminderCta: 'Remind me in May',
            reminderPeriod: '2020-05-01',
            reminderLabel: 'May',
        },
    },
    stage: 'DEV',
};

export const WithReminderPrefilled = Template.bind({});
WithReminderPrefilled.args = {
    fetchEmail: () => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve('test@guardian.co.uk');
            }, 500);
        });
    },
    variant: {
        ...props.variant,
        secondaryCta: {
            type: SecondaryCtaType.ContributionsReminder,
        },
        showReminderFields: {
            reminderCta: 'Remind me in May',
            reminderPeriod: '2020-05-01',
            reminderLabel: 'May',
        },
    },
};

export const WithReminderAndSignInLink = Template.bind({});
WithReminderAndSignInLink.args = {
    variant: {
        ...props.variant,
        showSignInLink: true,
        secondaryCta: {
            type: SecondaryCtaType.ContributionsReminder,
        },
        showReminderFields: {
            reminderCta: 'Remind me in May',
            reminderPeriod: '2020-05-01',
            reminderLabel: 'May',
        },
    },
};

export const WithTicker = Template.bind({});
WithTicker.args = {
    variant: {
        ...props.variant,
        tickerSettings: {
            countType: TickerCountType.money,
            endType: TickerEndType.unlimited,
            currencySymbol: '£',
            copy: {
                countLabel: 'contributed',
                goalReachedPrimary: "We've met our goal - thank you",
                goalReachedSecondary: 'Contributions are still being accepted',
            },
            tickerData: {
                total: 10000,
                goal: 100000,
            },
            name: 'US_2022',
        },
    },
};

export const WithAboveArticleCount = Template.bind({});
WithAboveArticleCount.args = {
    variant: {
        ...props.variant,
        separateArticleCount: {
            type: 'above',
        },
    },
    articleCounts: {
        for52Weeks: 25,
        forTargetedWeeks: 25,
    },
    hasConsentForArticleCount: true,
};

export const WithAboveTopReaderArticleCount = Template.bind({});
WithAboveTopReaderArticleCount.args = {
    ...WithAboveArticleCount.args,
    articleCounts: {
        for52Weeks: 99,
        forTargetedWeeks: 99,
    },
};

export const WithAboveArticleCountNoConsent = Template.bind({});
WithAboveArticleCountNoConsent.args = {
    variant: {
        ...props.variant,
        separateArticleCount: {
            type: 'above',
        },
    },
    articleCounts: {
        for52Weeks: 99,
        forTargetedWeeks: 99,
    },
    hasConsentForArticleCount: false,
};

export const WithChoiceCards = Template.bind({});
WithChoiceCards.args = {
    variant: {
        ...props.variant,
        secondaryCta: {
            type: SecondaryCtaType.ContributionsReminder,
        },
        showReminderFields: {
            reminderCta: 'Remind me in October',
            reminderPeriod: '2021-10-01',
            reminderLabel: 'October',
        },
        showChoiceCards: true,
        choiceCardAmounts: {
            testName: 'Storybook_test',
            variantName: 'Control',
            defaultContributionType: 'MONTHLY',
            displayContributionType: ['ONE_OFF', 'MONTHLY', 'ANNUAL'],
            amountsCardData: {
                ONE_OFF: {
                    amounts: [5, 10, 15, 20],
                    defaultAmount: 5,
                    hideChooseYourAmount: false,
                },
                MONTHLY: {
                    amounts: [6, 12],
                    defaultAmount: 12,
                    hideChooseYourAmount: true,
                },
                ANNUAL: {
                    amounts: [50, 100, 150, 200],
                    defaultAmount: 100,
                    hideChooseYourAmount: true,
                },
            },
        },
    },
};

export const WithChoiceCardsAndSignInLink = Template.bind({});
WithChoiceCardsAndSignInLink.args = {
    variant: {
        ...props.variant,
        name: 'V1_SIGN_IN',
        showSignInLink: true,
        showChoiceCards: true,
        choiceCardAmounts: {
            testName: 'Storybook_test',
            variantName: 'Control',
            defaultContributionType: 'MONTHLY',
            displayContributionType: ['ONE_OFF', 'MONTHLY', 'ANNUAL'],
            amountsCardData: {
                ONE_OFF: {
                    amounts: [5, 10, 15, 20],
                    defaultAmount: 5,
                    hideChooseYourAmount: false,
                },
                MONTHLY: {
                    amounts: [6, 12],
                    defaultAmount: 12,
                    hideChooseYourAmount: true,
                },
                ANNUAL: {
                    amounts: [50, 100, 150, 200],
                    defaultAmount: 100,
                    hideChooseYourAmount: true,
                },
            },
        },
    },
};

export const WithSignInLink = Template.bind({});
WithSignInLink.args = {
    variant: {
        ...props.variant,
        showSignInLink: true,
    },
};

export const WithoutSupportUrl = Template.bind({});
WithoutSupportUrl.args = {
    variant: {
        ...props.variant,
        cta: {
            baseUrl: 'https://theguardian.com',
            text: 'The Guardian',
        },
    },
};

export const WithNewsletterSignup = Template.bind({});
WithNewsletterSignup.args = {
    variant: {
        ...props.variant,
        highlightedText: undefined,
        heading: 'Sign up to the Fiver',
        paragraphs: ["Kick off your evenings with the Guardian's take on the world of football"],
        newsletterSignup: {
            url: 'https://www.theguardian.com/email/form/plaintone/rrcp-epic/4163',
        },
    },
};

export const WithParagraphLinks = Template.bind({});
WithParagraphLinks.args = {
    variant: {
        ...props.variant,
        paragraphs: [
            `... we have a small favour to ask. You've read %%ARTICLE_COUNT%% articles. More people, like you, are reading and supporting <a href="https://support.theguardian.com/">the Guardian’s</a> independent, investigative journalism than ever before. And unlike many news organisations, we made the choice to keep our reporting open for all, regardless of where they live or what they can afford to pay.`,
            'The Guardian will engage with the most critical issues of our time – from the escalating climate catastrophe to widespread inequality to the influence of big tech on our lives. At a time when factual information is a necessity, we believe that each of us, <a href="https://example.com">around the world</a>, deserves access to accurate reporting with integrity at its heart.',
            'Our editorial independence means we set our own agenda and voice our own opinions. Guardian journalism is free from commercial and political bias and not influenced by billionaire owners or shareholders. This means we can give a voice to those less heard, explore where others turn away, and rigorously challenge those in power.',
            'We hope you will consider supporting us today. We need your support to keep delivering quality journalism that’s open and independent. Every reader contribution, however big or small, is so valuable. ',
        ],
    },
};
