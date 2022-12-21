import { brand, brandAlt, neutral } from '@guardian/src-foundations';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import { getMomentTemplateBanner } from '../momentTemplate/MomentTemplateBanner';

const GlobalNewYearBanner = getMomentTemplateBanner({
    backgroundColour: '#F1F8FC',
    headerSettings: {
        textColour: '#0077B6',
    },
    primaryCtaSettings: {
        default: {
            backgroundColour: '#0077B6',
            textColour: 'white',
        },
        hover: {
            backgroundColour: '#004E7C',
            textColour: 'white',
            border: `1px solid ${'#004E7C'}`,
        },
    },
    secondaryCtaSettings: {
        default: {
            backgroundColour: '#F1F8FC',
            textColour: '#004E7C',
            border: `1px solid ${'#004E7C'}`,
        },
        hover: {
            backgroundColour: '#E5E5E5',
            textColour: '#004E7C',
            border: `1px solid ${'#004E7C'}`,
        },
    },
    closeButtonSettings: {
        default: {
            backgroundColour: '#F1F8FC',
            textColour: brand[400],
            border: `1px solid ${brand[400]}`,
            zIndex: `100`,
        },
        hover: {
            backgroundColour: '#E5E5E5',
            textColour: brand[400],
        },
    },
    highlightedTextSettings: {
        textColour: neutral[0],
        highlightColour: brandAlt[400],
    },
    imageSettings: {
        mainUrl:
            'https://i.guim.co.uk/img/media/f993cdadc7f9ec03f9b99bc0b5a0c58b134bb944/0_0_1428_1344/500.png?quality=85&s=707b13d33c9338b50f99036e6854a3c2',
        mobileUrl:
            'https://i.guim.co.uk/img/media/bd2f8e3aa73cb098d8b353326d757b6d69fa15e3/0_0_1172_560/500.png?quality=85&s=32368799f93ede3eed8d196b4c5de4fd',
        tabletUrl:
            'https://i.guim.co.uk/img/media/ae8eb7a698d15cf45fc523640b7f171fcf8e2585/0_0_1080_1500/720.png?quality=85&s=58da1f597098fef5cf212ea8f1a34481',
        desktopUrl:
            'https://i.guim.co.uk/img/media/1fdc936af90c43d274a960262f874f77f4084e76/0_0_1428_1680/850.png?quality=85&s=3d749d44475cf6d1699e8f5e235394a7',
        leftColUrl:
            'https://i.guim.co.uk/img/media/f993cdadc7f9ec03f9b99bc0b5a0c58b134bb944/0_0_1428_1344/500.png?quality=85&s=707b13d33c9338b50f99036e6854a3c2',
        altText: 'Guardian logo being held up by supporters of the Guardian',
    },
    bannerId: 'global-new-year-banner',
});

const unvalidated = bannerWrapper(GlobalNewYearBanner, 'global-new-year-banner');
const validated = validatedBannerWrapper(GlobalNewYearBanner, 'global-new-year-banner');

export { validated as GlobalNewYearBanner, unvalidated as GlobalNewYearBannerUnvalidated };
