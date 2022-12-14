import { brand } from '@guardian/src-foundations';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import { getMomentTemplateBanner } from '../momentTemplate/MomentTemplateBanner';

const GlobalNYBanner = getMomentTemplateBanner({
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
            backgroundColour: 'white',
            textColour: '#0077B6',
            border: `1px solid ${'#0077B6'}`,
        },
    },
    secondaryCtaSettings: {
        default: {
            backgroundColour: '#F1F8FC',
            textColour: '#0077B6',
            border: `1px solid ${'#0077B6'}`,
        },
        hover: {
            backgroundColour: '#0077B6',
            textColour: '#F1F8FC',
        },
    },
    closeButtonSettings: {
        default: {
            backgroundColour: '#F1F8FC',
            textColour: brand[400],
            border: `1px solid ${brand[400]}`,
        },
        hover: {
            backgroundColour: '#0077B6',
            textColour: brand[400],
        },
    },
    highlightedTextSettings: {
        textColour: '#F1F8FC',
        highlightColour: '#0077B6',
    },
    imageSettings: {
        mainUrl:
            'https://media.guim.co.uk/a1087c3f7e6da4f1e97947acccdd7f0d15f327d4/0_0_142_124/140.png',
        altText: 'Guardian logo being held up by supporters of the Guardian',
    },
});

const unvalidated = bannerWrapper(GlobalNYBanner, 'global-new-year-banner');
const validated = validatedBannerWrapper(GlobalNYBanner, 'global-new-year-banner');

export { validated as GlobalNYBanner, unvalidated as GlobalNYBannerUnvalidated };
