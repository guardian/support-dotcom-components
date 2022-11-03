import React from 'react';
import { Story, Meta } from '@storybook/react';
import { getMomentTemplateBanner } from './MomentTemplateBanner';
import { props } from '../utils/storybook';
import { BannerProps, SecondaryCtaType } from '@sdc/shared/types';
import { bannerWrapper } from '../common/BannerWrapper';
import { neutral } from '@guardian/src-foundations';

export default {
    title: 'Banners/MomentTemplate',
    args: props,
} as Meta;

const GlobalNYBanner = bannerWrapper(
    getMomentTemplateBanner({
        backgroundColour: '#f79e1b',
        primaryCtaSettings: {
            default: {
                backgroundColour: '#007abc',
                textColour: 'white',
            },
            hover: {
                backgroundColour: 'white',
                textColour: '#007abc',
            },
        },
        secondaryCtaSettings: {
            default: {
                backgroundColour: '#f79e1b',
                textColour: neutral[0],
            },
            hover: {
                backgroundColour: 'white',
                textColour: neutral[0],
            },
        },
        closeButtonSettings: {
            default: {
                backgroundColour: '#f79e1b',
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
        imageSettings: {
            mainUrl:
                'https://media.guim.co.uk/a1087c3f7e6da4f1e97947acccdd7f0d15f327d4/0_0_142_124/140.png',
            altText: 'Guardian logo being held up by supporters of the Guardian',
            mobilePosition: 'end',
            tabletPosition: 'end',
            desktopPosition: 'end',
        },
    }),
    'global-new-year-banner',
);

const GlobalNYTemplate: Story<BannerProps> = (props: BannerProps) => <GlobalNYBanner {...props} />;

export const GlobalNY = GlobalNYTemplate.bind({});
GlobalNY.args = {
    ...props,
    content: {
        heading: 'As 2022 begins, will you support us?',
        messageText:
            'Fearless, investigative reporting shapes a fairer world. At the Guardian, our independence allows us to chase the truth wherever it takes us. We have no shareholders. No vested interests. Just the determination and passion to bring readers quality reporting, including groundbreaking investigations. We do not shy away. And we provide all this for free, for everyone.',
        paragraphs: [
            'Fearless, investigative reporting shapes a fairer world. At the Guardian, our independence allows us to chase the truth wherever it takes us. We have no shareholders. No vested interests. Just the determination and passion to bring readers quality reporting, including groundbreaking investigations.',
            'We do not shy away. And we provide all this for free, for everyone.',
        ],
        highlightedText:
            'Show your support today from just %%CURRENCY_SYMBOL%%1, or sustain us long term with a little more. Thank you.',
        cta: {
            text: 'Support the Guardian',
            baseUrl: 'https://support.theguardian.com/contribute',
        },
        secondaryCta: {
            type: SecondaryCtaType.Custom,
            cta: {
                text: 'Hear from our editor',
                baseUrl: 'https://theguardian.com',
            },
        },
    },
    mobileContent: {
        heading: 'Please support us in 2022',
        messageText:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus',
        paragraphs: [
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus',
        ],
        highlightedText:
            'Show your support today from just %%CURRENCY_SYMBOL%%1, or sustain us long term with a little more. Thank you.',
        cta: {
            text: 'Support us',
            baseUrl: 'https://support.theguardian.com/contribute',
        },
        secondaryCta: {
            type: SecondaryCtaType.Custom,
            cta: {
                text: 'Learn more',
                baseUrl: 'https://theguardian.com',
            },
        },
    },
    numArticles: 50,
};

const AusElectionBanner = bannerWrapper(
    getMomentTemplateBanner({
        backgroundColour: '#e4e4e3',
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
            mobilePosition: 'end',
            tabletPosition: 'center',
            desktopPosition: 'end',
        },
        signInComponentAfter: 'BODY',
    }),
    'aus-moment-banner',
);

const AusElectionTemplate: Story<BannerProps> = (props: BannerProps) => (
    <AusElectionBanner {...props} />
);

export const AusElection = AusElectionTemplate.bind({});
AusElection.args = {
    ...GlobalNY.args,
    content: {
        ...GlobalNY.args.content,
        secondaryCta: {
            type: SecondaryCtaType.ContributionsReminder,
        },
    },
    mobileContent: {
        ...GlobalNY.args.mobileContent,
        secondaryCta: {
            type: SecondaryCtaType.ContributionsReminder,
        },
    },
};
