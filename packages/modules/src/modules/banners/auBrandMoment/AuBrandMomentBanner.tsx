import { neutral } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
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
    desktopVisualContainerOverride: {
        display: 'none',

        [from.tablet]: {
            display: 'block',
            margin: '0 0 0 16px;',
        },
        [from.desktop]: {
            width: '70%',
        },
        [from.wide]: {
            width: '45%',
        },
    },
    mobileVisualContainerOverride: {
        display: 'none',
    },
    removeContainerPaddingRight: true,
    imageSettings: {
        tabletUrl:
            'https://i.guim.co.uk/img/media/6a120c5261a7321214d8ba620fe576f008c5bf93/0_0_762_826/762.png?quality=85&s=09ed12d3db489de0729d08ba2c4049a8',
        desktopUrl:
            'https://i.guim.co.uk/img/media/5a229b407d430109aff73681d570047f0e3339ad/0_0_1014_824/1014.png?quality=85&s=fdd5d9b6de7b813319ccea7ebb159653',
        leftColUrl:
            'https://i.guim.co.uk/img/media/8a95151cc54b7a3cf29cdf6369a70632e0246913/0_0_1418_980/1418.png?quality=85&s=03119be6e816c831436c200bbc15a984',
        wideUrl:
            'https://i.guim.co.uk/img/media/8a95151cc54b7a3cf29cdf6369a70632e0246913/0_0_1418_980/1418.png?quality=85&s=03119be6e816c831436c200bbc15a984',
        altText: 'Head shot of Anthony Albanese, leader of the Australian Labor Party.',
    },
});

const unvalidated = bannerWrapper(AuBrandMomentBanner, 'au-brand-moment-banner');
const validated = validatedBannerWrapper(AuBrandMomentBanner, 'au-brand-moment-banner');

export { validated as AuBrandMomentBanner, unvalidated as AuBrandMomentBannerUnvalidated };
