import React from 'react';
import { brand, neutral, brandAlt } from '@guardian/src-foundations';
import { BannerProps } from '@sdc/shared/src/types';
import { Story } from '@storybook/react';
import { bannerWrapper } from '../../common/BannerWrapper';
import { getMomentTemplateBanner } from '../MomentTemplateBanner';

export const BannerWithChoiceCards = bannerWrapper(
    getMomentTemplateBanner({
        containerSettings: {
            backgroundColour: '#F1F8FC',
        },
        headerSettings: {
            textColour: '#0077B6',
        },
        primaryCtaSettings: {
            default: {
                backgroundColour: brandAlt[400],
                textColour: 'black',
            },
            hover: {
                backgroundColour: brandAlt[200],
                textColour: 'black',
            },
        },
        secondaryCtaSettings: {
            default: {
                backgroundColour: '#F1F8FC',
                textColour: '#004E7C',
                border: '1px solid #004E7C',
            },
            hover: {
                backgroundColour: '#E5E5E5',
                textColour: '#004E7C',
                border: '1px solid #004E7C',
            },
        },
        closeButtonSettings: {
            default: {
                backgroundColour: '#F1F8FC',
                textColour: brand[400],
                border: `1px solid ${brand[400]}`,
            },
            hover: {
                backgroundColour: '#E5E5E5',
                textColour: brand[400],
            },
            theme: 'brand',
        },
        highlightedTextSettings: {
            textColour: neutral[0],
            highlightColour: brandAlt[400],
        },
        choiceCards: true,
        bannerId: 'global-new-year-banner',
    }),
    'global-new-year-banner',
);

export const BannerWithChoiceCardsTemplate: Story<BannerProps> = (props: BannerProps) => (
    <BannerWithChoiceCards
        {...props}
        choiceCardAmounts={{
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
                    amounts: [3, 6, 10],
                    defaultAmount: 10,
                    hideChooseYourAmount: true,
                },
                ANNUAL: {
                    amounts: [100],
                    defaultAmount: 100,
                    hideChooseYourAmount: true,
                },
            },
        }}
    />
);
