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
                ONE_OFF: [
                    { value: 30 },
                    { value: 60, isDefault: true },
                    { value: 120 },
                    { value: 240 },
                ],
                MONTHLY: [{ value: 3 }, { value: 6 }, { value: 9, isDefault: true }, { value: 15 }],
                ANNUAL: [
                    { value: 60 },
                    { value: 120, isDefault: true },
                    { value: 240 },
                    { value: 480 },
                ],
            },
            UnitedStates: {
                ONE_OFF: [
                    { value: 25 },
                    { value: 50, isDefault: true },
                    { value: 100 },
                    { value: 250 },
                ],
                MONTHLY: [{ value: 7 }, { value: 15, isDefault: true }, { value: 30 }],
                ANNUAL: [
                    { value: 50, isDefault: true },
                    { value: 100 },
                    { value: 250 },
                    { value: 500 },
                ],
            },
            AUDCountries: {
                ONE_OFF: [
                    { value: 60 },
                    { value: 100, isDefault: true },
                    { value: 250 },
                    { value: 500 },
                ],
                MONTHLY: [{ value: 10 }, { value: 20, isDefault: true }, { value: 40 }],
                ANNUAL: [
                    { value: 80, isDefault: true },
                    { value: 250 },
                    { value: 500 },
                    { value: 750 },
                ],
            },
            EURCountries: {
                ONE_OFF: [
                    { value: 25 },
                    { value: 50, isDefault: true },
                    { value: 100 },
                    { value: 250 },
                ],
                MONTHLY: [{ value: 6 }, { value: 10, isDefault: true }, { value: 20 }],
                ANNUAL: [
                    { value: 50, isDefault: true },
                    { value: 100 },
                    { value: 250 },
                    { value: 500 },
                ],
            },
            International: {
                ONE_OFF: [
                    { value: 25 },
                    { value: 50, isDefault: true },
                    { value: 100 },
                    { value: 250 },
                ],
                MONTHLY: [{ value: 5 }, { value: 10, isDefault: true }, { value: 20 }],
                ANNUAL: [
                    { value: 60, isDefault: true },
                    { value: 100 },
                    { value: 250 },
                    { value: 500 },
                ],
            },
            NZDCountries: {
                ONE_OFF: [
                    { value: 50 },
                    { value: 100, isDefault: true },
                    { value: 250 },
                    { value: 500 },
                ],
                MONTHLY: [{ value: 10 }, { value: 20, isDefault: true }, { value: 50 }],
                ANNUAL: [
                    { value: 50, isDefault: true },
                    { value: 100 },
                    { value: 250 },
                    { value: 500 },
                ],
            },
            Canada: {
                ONE_OFF: [
                    { value: 25 },
                    { value: 50, isDefault: true },
                    { value: 100 },
                    { value: 250 },
                ],
                MONTHLY: [{ value: 5 }, { value: 10, isDefault: true }, { value: 20 }],
                ANNUAL: [
                    { value: 60, isDefault: true },
                    { value: 100 },
                    { value: 250 },
                    { value: 500 },
                ],
            },
        },
    },
};
