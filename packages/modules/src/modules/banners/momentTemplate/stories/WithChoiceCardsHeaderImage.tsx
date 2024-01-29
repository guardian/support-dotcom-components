import React from 'react';
import { brand, neutral, brandAlt } from '@guardian/source-foundations';
import { BannerProps } from '@sdc/shared/src/types';
import { Story } from '@storybook/react';
import { bannerWrapper } from '../../common/BannerWrapper';
import { getMomentTemplateBanner } from '../MomentTemplateBanner';
import { TopImage } from '../../worldPressFreedomDay/components/TopImage';

export const BannerWithChoiceCardsHeaderImage = bannerWrapper(
    getMomentTemplateBanner({
        containerSettings: {
            backgroundColour: '#F1F8FC',
        },
        headerSettings: {
            showHeader: { text: false, image: true },
            image: <TopImage />,
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
        choiceCardSettings: {
            buttonColour: neutral[100],
        },
        bannerId: 'global-new-year-moment-banner',
    }),
    'global-new-year-moment-banner',
);

export const BannerWithChoiceCardsHeaderImageTemplate: Story<BannerProps> = (
    props: BannerProps,
) => (
    <BannerWithChoiceCardsHeaderImage
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
