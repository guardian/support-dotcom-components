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
                        amounts: [5, 10, 15, 45],
                        defaultAmount: 10,
                    },
                    MONTHLY: {
                        amounts: [5, 10, 15, 20],
                        defaultAmount: 20,
                    },
                    ANNUAL: {
                        amounts: [5, 10, 15, 20],
                        defaultAmount: 15,
                    },
                },
                test: {
                    name: 'GBP_COUNTRIES_AMOUNTS_TEST',
                    isLive: true,
                    variants: [
                        {
                            name: 'V1',
                            amounts: {
                                ONE_OFF: {
                                    amounts: [5, 10, 20, 25, 30],
                                    defaultAmount: 20,
                                },
                                MONTHLY: {
                                    amounts: [5, 15, 30, 40, 80],
                                    defaultAmount: 15,
                                },
                                ANNUAL: {
                                    amounts: [100, 150, 250, 500],
                                    defaultAmount: 250,
                                },
                            },
                        },
                        {
                            name: 'V2',
                            amounts: {
                                ONE_OFF: {
                                    amounts: [10, 50, 100, 150],
                                    defaultAmount: 100,
                                },
                                MONTHLY: {
                                    amounts: [10, 20, 40, 50],
                                    defaultAmount: 50,
                                },
                                ANNUAL: {
                                    amounts: [150, 300, 500, 750],
                                    defaultAmount: 500,
                                },
                            },
                        },
                    ],
                    seed: 398375,
                },
            },
            UnitedStates: {
                control: {
                    ONE_OFF: {
                        amounts: [5, 10, 15, 20],
                        defaultAmount: 5,
                    },
                    MONTHLY: {
                        amounts: [5, 10, 15, 20],
                        defaultAmount: 5,
                    },
                    ANNUAL: {
                        amounts: [5, 10, 15, 20],
                        defaultAmount: 5,
                    },
                },
            },
            EURCountries: {
                control: {
                    ONE_OFF: {
                        amounts: [5, 10, 15, 20],
                        defaultAmount: 5,
                    },
                    MONTHLY: {
                        amounts: [5, 10, 15, 20],
                        defaultAmount: 5,
                    },
                    ANNUAL: {
                        amounts: [5, 10, 15, 20],
                        defaultAmount: 5,
                    },
                },
            },
            AUDCountries: {
                control: {
                    ONE_OFF: {
                        amounts: [5, 10, 15, 20],
                        defaultAmount: 5,
                    },
                    MONTHLY: {
                        amounts: [5, 10, 15, 20],
                        defaultAmount: 5,
                    },
                    ANNUAL: {
                        amounts: [5, 10, 15, 20],
                        defaultAmount: 5,
                    },
                },
            },
            International: {
                control: {
                    ONE_OFF: {
                        amounts: [5, 10, 15, 20],
                        defaultAmount: 5,
                    },
                    MONTHLY: {
                        amounts: [5, 10, 15, 20],
                        defaultAmount: 5,
                    },
                    ANNUAL: {
                        amounts: [5, 10, 15, 20],
                        defaultAmount: 5,
                    },
                },
            },
            NZDCountries: {
                control: {
                    ONE_OFF: {
                        amounts: [5, 10, 15, 20],
                        defaultAmount: 5,
                    },
                    MONTHLY: {
                        amounts: [5, 10, 15, 20],
                        defaultAmount: 5,
                    },
                    ANNUAL: {
                        amounts: [5, 10, 15, 20],
                        defaultAmount: 5,
                    },
                },
            },
            Canada: {
                control: {
                    ONE_OFF: {
                        amounts: [5, 10, 15, 20],
                        defaultAmount: 5,
                    },
                    MONTHLY: {
                        amounts: [5, 10, 15, 20],
                        defaultAmount: 5,
                    },
                    ANNUAL: {
                        amounts: [5, 10, 15, 20],
                        defaultAmount: 5,
                    },
                },
            },
        },
    },
};
