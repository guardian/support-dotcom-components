import React from 'react';
import { neutral } from '@guardian/source-foundations';
import { BannerProps } from '@sdc/shared/src/types';
import { Story } from '@storybook/react';
import { bannerWrapper } from '../../common/BannerWrapper';
import { getMomentTemplateBanner } from '../MomentTemplateBanner';

export const BannerWithReminder = bannerWrapper(
    getMomentTemplateBanner({
        containerSettings: {
            backgroundColour: '#e4e4e3',
        },
        headerSettings: {
            showHeader: { text: true },
        },
        primaryCtaSettings: {
            default: {
                backgroundColour: '#121212',
                textColour: 'white',
            },
            hover: {
                backgroundColour: '#454545',
                textColour: 'white',
            },
        },
        secondaryCtaSettings: {
            default: {
                backgroundColour: '#e4e4e3',
                textColour: neutral[7],
            },
            hover: {
                backgroundColour: '#e4e4e3',
                textColour: neutral[7],
            },
        },
        closeButtonSettings: {
            default: {
                backgroundColour: '#e4e4e3',
                textColour: neutral[0],
                border: `1px solid ${neutral[0]}`,
            },
            hover: {
                backgroundColour: 'white',
                textColour: neutral[0],
            },
        },
        highlightedTextSettings: {
            textColour: neutral[0],
        },
        setReminderCtaSettings: {
            default: {
                backgroundColour: '#e4e4e3',
                textColour: neutral[0],
                border: `1px solid ${neutral[0]}`,
            },
            hover: {
                backgroundColour: 'white',
                textColour: neutral[0],
            },
        },
        imageSettings: {
            mainUrl:
                'https://i.guim.co.uk/img/media/ad0166d7724eb2dfc6aa16fea50fe41c02324eb8/0_0_281_131/281.png?quality=85&s=7639d39b1492f5e2f4883496fcc5740c',
            mobileUrl:
                'https://i.guim.co.uk/img/media/ad0166d7724eb2dfc6aa16fea50fe41c02324eb8/0_0_281_131/281.png?quality=85&s=7639d39b1492f5e2f4883496fcc5740c',
            tabletUrl:
                'https://i.guim.co.uk/img/media/8da1d854dee753e006afc5677a09a13bc84b4eb9/0_0_1524_1652/923.png?quality=85&s=7df1807f0583e942744bdda49b0503b7',
            desktopUrl:
                'https://i.guim.co.uk/img/media/6daf1817afa379d842b10eb91d7bcda3c4c5fdad/0_0_2028_1648/1000.png?quality=85&s=86cc64b3196566587cf0b9bffc30828e',
            leftColUrl:
                'https://i.guim.co.uk/img/media/4fa98ca4b70ee9b21b74d16f2586b5d6c513297f/0_195_2836_1961/2000.png?quality=85&s=0ce3473523516664ed9a7f9cde095073',
            wideUrl:
                'https://i.guim.co.uk/img/media/4fa98ca4b70ee9b21b74d16f2586b5d6c513297f/0_319_2836_1837/2000.png?quality=85&s=3ef36bd5ab569f310b0f975372f54d29',
            altText:
                'Head shots of Anthony Albanese, leader of the Australian Labor Party, and Scott Morrison, current Prime Minister and leader of the Liberal Party of Australia, who are running for the office of Prime Minister in the Australian federal election, to be held on 21 May 2022.',
        },
    }),
    'aus-eoy-banner',
);

export const BannerWithReminderTemplate: Story<BannerProps> = (props: BannerProps) => (
    <BannerWithReminder {...props} />
);
