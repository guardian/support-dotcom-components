import { neutral } from '@guardian/src-foundations';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import { getMomentTemplateBanner } from '../momentTemplate/MomentTemplateBanner';

const AuBrandMomentBanner = getMomentTemplateBanner({
    backgroundColour: '#fffDf5',
    headerBackground: '#ffe500',
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
            backgroundColour: '#fffDf5',
            textColour: neutral[7],
        },
        hover: {
            backgroundColour: '#e4e4e3',
            textColour: neutral[7],
        },
    },
    closeButtonSettings: {
        default: {
            backgroundColour: '#fffDf5',
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
        highlightColour: '',
    },
    setReminderCtaSettings: {
        default: {
            backgroundColour: '#fffDf5',
            textColour: neutral[7],
        },
        hover: {
            backgroundColour: '#e4e4e3',
            textColour: neutral[7],
        },
    },
    imageSettings: {
        mainUrl:
            'https://i.guim.co.uk/img/media/5ffd1915bffebf7edea9055d957dfc56cd9344d7/0_0_1480_1232/500.png?quality=85&s=b1ccbcaeb9ae9ce340d43075e13224d3',
        mobileUrl:
            'https://i.guim.co.uk/img/media/a63c0655afb9403a6e6d74b160ab8947648641bb/0_0_872_296/500.png?quality=85&s=275c125f157ab3686d0e67103c71df38',
        wideUrl:
            'https://i.guim.co.uk/img/media/5ffd1915bffebf7edea9055d957dfc56cd9344d7/0_0_1480_1232/500.png?quality=85&s=b1ccbcaeb9ae9ce340d43075e13224d3',
        altText: 'Head shot of Anthony Albanese, leader of the Australian Labor Party.',
    },
});

const unvalidated = bannerWrapper(AuBrandMomentBanner, 'au-brand-moment-banner');
const validated = validatedBannerWrapper(AuBrandMomentBanner, 'au-brand-moment-banner');

export { validated as AuBrandMomentBanner, unvalidated as AuBrandMomentBannerUnvalidated };
