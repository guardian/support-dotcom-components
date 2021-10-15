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
        backgroundImageUrl:
            'https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixlib=rb-1.2.1&auto=format&fit=crop&w=1701&q=80',
    },
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
};

export const WithPrefilledReminder = Template.bind({});
WithPrefilledReminder.args = {
    email: 'example@guardian.co.uk',
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
        for52Weeks: 99,
        forTargetedWeeks: 99,
    },
    hasConsentForArticleCount: true,
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
            GBPCountries: {
                control: {
                    ONE_OFF: {
                        amounts: [30, 60, 120, 240],
                        defaultAmount: 60,
                    },
                    MONTHLY: {
                        amounts: [3, 6, 9, 15],
                        defaultAmount: 9,
                    },
                    ANNUAL: {
                        amounts: [60, 120, 240, 480],
                        defaultAmount: 120,
                    },
                },
                test: {
                    name: '2021-09-02_AMOUNTS_R5__UK',
                    isLive: false,
                    variants: [
                        {
                            name: 'V2_LOWER',
                            amounts: {
                                ONE_OFF: {
                                    amounts: [30, 60, 120, 240],
                                    defaultAmount: 60,
                                },
                                MONTHLY: {
                                    amounts: [3, 5, 10, 15],
                                    defaultAmount: 5,
                                },
                                ANNUAL: {
                                    amounts: [60, 120, 240, 480],
                                    defaultAmount: 120,
                                },
                            },
                        },
                    ],
                    seed: 917618,
                },
            },
            UnitedStates: {
                control: {
                    ONE_OFF: {
                        amounts: [25, 50, 100, 250],
                        defaultAmount: 50,
                    },
                    MONTHLY: {
                        amounts: [7, 15, 30],
                        defaultAmount: 15,
                    },
                    ANNUAL: {
                        amounts: [50, 100, 250, 500],
                        defaultAmount: 50,
                    },
                },
                test: {
                    name: '2021-03-11_AMOUNTS_R2__US',
                    isLive: false,
                    variants: [
                        {
                            name: 'V1_HIGHER_STRETCH',
                            amounts: {
                                ONE_OFF: {
                                    amounts: [25, 50, 100, 250],
                                    defaultAmount: 50,
                                },
                                MONTHLY: {
                                    amounts: [7, 15, 30, 50],
                                    defaultAmount: 15,
                                },
                                ANNUAL: {
                                    amounts: [50, 100, 250, 500],
                                    defaultAmount: 100,
                                },
                            },
                        },
                    ],
                    seed: 930202,
                },
            },
            EURCountries: {
                control: {
                    ONE_OFF: {
                        amounts: [25, 50, 100, 250],
                        defaultAmount: 50,
                    },
                    MONTHLY: {
                        amounts: [6, 10, 20],
                        defaultAmount: 10,
                    },
                    ANNUAL: {
                        amounts: [50, 100, 250, 500],
                        defaultAmount: 50,
                    },
                },
                test: {
                    name: '2021-03-11_AMOUNTS_R2__EU',
                    isLive: false,
                    variants: [
                        {
                            name: 'V1_HIGHER_STRETCH',
                            amounts: {
                                ONE_OFF: {
                                    amounts: [25, 50, 100, 250],
                                    defaultAmount: 50,
                                },
                                MONTHLY: {
                                    amounts: [6, 10, 25, 50],
                                    defaultAmount: 10,
                                },
                                ANNUAL: {
                                    amounts: [50, 100, 250, 500],
                                    defaultAmount: 50,
                                },
                            },
                        },
                        {
                            name: 'V2_HIGHER_DEFAULT',
                            amounts: {
                                ONE_OFF: {
                                    amounts: [25, 50, 100, 250],
                                    defaultAmount: 50,
                                },
                                MONTHLY: {
                                    amounts: [6, 8, 12, 24],
                                    defaultAmount: 12,
                                },
                                ANNUAL: {
                                    amounts: [50, 100, 150, 200],
                                    defaultAmount: 100,
                                },
                            },
                        },
                    ],
                    seed: 628626,
                },
            },
            AUDCountries: {
                control: {
                    ONE_OFF: {
                        amounts: [60, 100, 250, 500],
                        defaultAmount: 100,
                    },
                    MONTHLY: {
                        amounts: [10, 20, 40],
                        defaultAmount: 20,
                    },
                    ANNUAL: {
                        amounts: [80, 250, 500, 750],
                        defaultAmount: 80,
                    },
                },
                test: {
                    name: '2021-03-11_AMOUNTS_R2__AU',
                    isLive: false,
                    variants: [
                        {
                            name: 'V1_HIGHER_STRETCH',
                            amounts: {
                                ONE_OFF: {
                                    amounts: [60, 100, 250, 500],
                                    defaultAmount: 100,
                                },
                                MONTHLY: {
                                    amounts: [10, 20, 40, 60],
                                    defaultAmount: 20,
                                },
                                ANNUAL: {
                                    amounts: [80, 250, 500, 750],
                                    defaultAmount: 80,
                                },
                            },
                        },
                        {
                            name: 'V2_HIGHER_DEFAULT',
                            amounts: {
                                ONE_OFF: {
                                    amounts: [60, 100, 250, 500],
                                    defaultAmount: 100,
                                },
                                MONTHLY: {
                                    amounts: [10, 20, 30, 40],
                                    defaultAmount: 30,
                                },
                                ANNUAL: {
                                    amounts: [80, 150, 300, 500],
                                    defaultAmount: 150,
                                },
                            },
                        },
                        {
                            name: 'V3_LOWER_OPENING',
                            amounts: {
                                ONE_OFF: {
                                    amounts: [60, 100, 250, 500],
                                    defaultAmount: 100,
                                },
                                MONTHLY: {
                                    amounts: [8, 20, 40],
                                    defaultAmount: 20,
                                },
                                ANNUAL: {
                                    amounts: [60, 250, 500, 750],
                                    defaultAmount: 60,
                                },
                            },
                        },
                    ],
                    seed: 605059,
                },
            },
            International: {
                control: {
                    ONE_OFF: {
                        amounts: [25, 50, 100, 250],
                        defaultAmount: 50,
                    },
                    MONTHLY: {
                        amounts: [5, 10, 20],
                        defaultAmount: 10,
                    },
                    ANNUAL: {
                        amounts: [60, 100, 250, 500],
                        defaultAmount: 60,
                    },
                },
                test: {
                    name: '2021-03-11_AMOUNTS_R2__INT',
                    isLive: false,
                    variants: [
                        {
                            name: 'V1_HIGHER_STRETCH',
                            amounts: {
                                ONE_OFF: {
                                    amounts: [25, 50, 100, 250],
                                    defaultAmount: 50,
                                },
                                MONTHLY: {
                                    amounts: [6, 10, 25, 40],
                                    defaultAmount: 10,
                                },
                                ANNUAL: {
                                    amounts: [50, 100, 250, 500],
                                    defaultAmount: 50,
                                },
                            },
                        },
                        {
                            name: 'V2_HIGHER_DEFAULT',
                            amounts: {
                                ONE_OFF: {
                                    amounts: [25, 50, 100, 250],
                                    defaultAmount: 50,
                                },
                                MONTHLY: {
                                    amounts: [6, 8, 12, 30],
                                    defaultAmount: 12,
                                },
                                ANNUAL: {
                                    amounts: [50, 100, 150, 200],
                                    defaultAmount: 100,
                                },
                            },
                        },
                        {
                            name: 'V3_LOWER_OPENING',
                            amounts: {
                                ONE_OFF: {
                                    amounts: [25, 50, 100, 250],
                                    defaultAmount: 50,
                                },
                                MONTHLY: {
                                    amounts: [4, 10, 20],
                                    defaultAmount: 10,
                                },
                                ANNUAL: {
                                    amounts: [40, 100, 250, 500],
                                    defaultAmount: 40,
                                },
                            },
                        },
                    ],
                    seed: 943978,
                },
            },
            NZDCountries: {
                control: {
                    ONE_OFF: {
                        amounts: [50, 100, 250, 500],
                        defaultAmount: 100,
                    },
                    MONTHLY: {
                        amounts: [10, 20, 50],
                        defaultAmount: 20,
                    },
                    ANNUAL: {
                        amounts: [50, 100, 250, 500],
                        defaultAmount: 50,
                    },
                },
                test: {
                    name: '2021-03-11_AMOUNTS_R2__NZ',
                    isLive: false,
                    variants: [
                        {
                            name: 'V1_HIGHER_STRETCH',
                            amounts: {
                                ONE_OFF: {
                                    amounts: [50, 100, 250, 500],
                                    defaultAmount: 100,
                                },
                                MONTHLY: {
                                    amounts: [10, 20, 50, 100],
                                    defaultAmount: 20,
                                },
                                ANNUAL: {
                                    amounts: [50, 100, 500, 750],
                                    defaultAmount: 50,
                                },
                            },
                        },
                        {
                            name: 'V2_HIGHER_DEFAULT',
                            amounts: {
                                ONE_OFF: {
                                    amounts: [50, 100, 250, 500],
                                    defaultAmount: 100,
                                },
                                MONTHLY: {
                                    amounts: [10, 15, 25, 50],
                                    defaultAmount: 25,
                                },
                                ANNUAL: {
                                    amounts: [50, 100, 500, 750],
                                    defaultAmount: 100,
                                },
                            },
                        },
                        {
                            name: 'V3_LOWER_OPENING',
                            amounts: {
                                ONE_OFF: {
                                    amounts: [50, 100, 250, 500],
                                    defaultAmount: 100,
                                },
                                MONTHLY: {
                                    amounts: [8, 20, 50],
                                    defaultAmount: 20,
                                },
                                ANNUAL: {
                                    amounts: [40, 100, 500, 750],
                                    defaultAmount: 40,
                                },
                            },
                        },
                    ],
                    seed: 628456,
                },
            },
            Canada: {
                control: {
                    ONE_OFF: {
                        amounts: [25, 50, 100, 250],
                        defaultAmount: 50,
                    },
                    MONTHLY: {
                        amounts: [5, 10, 20],
                        defaultAmount: 10,
                    },
                    ANNUAL: {
                        amounts: [60, 100, 250, 500],
                        defaultAmount: 60,
                    },
                },
                test: {
                    name: '2021-03-11_AMOUNTS_R2__CA',
                    isLive: false,
                    variants: [
                        {
                            name: 'V1_HIGHER_STRETCH',
                            amounts: {
                                ONE_OFF: {
                                    amounts: [25, 50, 100, 250],
                                    defaultAmount: 50,
                                },
                                MONTHLY: {
                                    amounts: [5, 10, 25, 40],
                                    defaultAmount: 10,
                                },
                                ANNUAL: {
                                    amounts: [60, 100, 250, 500],
                                    defaultAmount: 60,
                                },
                            },
                        },
                        {
                            name: 'V2_HIGHER_DEFAULT',
                            amounts: {
                                ONE_OFF: {
                                    amounts: [25, 50, 100, 250],
                                    defaultAmount: 50,
                                },
                                MONTHLY: {
                                    amounts: [6, 8, 12, 24],
                                    defaultAmount: 12,
                                },
                                ANNUAL: {
                                    amounts: [60, 100, 150, 200],
                                    defaultAmount: 100,
                                },
                            },
                        },
                        {
                            name: 'V3_LOWER_OPENING',
                            amounts: {
                                ONE_OFF: {
                                    amounts: [25, 50, 100, 250],
                                    defaultAmount: 50,
                                },
                                MONTHLY: {
                                    amounts: [4, 10, 20],
                                    defaultAmount: 10,
                                },
                                ANNUAL: {
                                    amounts: [40, 100, 250, 500],
                                    defaultAmount: 40,
                                },
                            },
                        },
                    ],
                    seed: 775798,
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
