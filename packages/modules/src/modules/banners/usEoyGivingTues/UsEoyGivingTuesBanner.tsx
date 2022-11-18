import { neutral } from '@guardian/src-foundations';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import { getMomentTemplateBanner } from '../momentTemplate/MomentTemplateBanner';

const UsEoyGivingTuesBanner = getMomentTemplateBanner({
    backgroundColour: '#deded9',
    primaryCtaSettings: {
        default: {
            backgroundColour: neutral[7],
            textColour: 'white',
        },
        hover: {
            backgroundColour: neutral[20],
            textColour: 'white',
        },
    },
    secondaryCtaSettings: {
        default: {
            backgroundColour: neutral[86],
            textColour: neutral[7],
        },
        hover: {
            backgroundColour: neutral[100],
            textColour: neutral[7],
        },
    },
    closeButtonSettings: {
        default: {
            backgroundColour: neutral[86],
            textColour: neutral[7],
            border: `1px solid ${neutral[7]}`,
        },
        hover: {
            backgroundColour: 'white',
            textColour: neutral[0],
        },
    },
    highlightedTextSettings: {
        textColour: neutral[0],
        highlightColour: neutral[100],
    },
    imageSettings: {
        mainUrl:
            'https://i.guim.co.uk/img/media/56d31914ea2f5bb335c4a2b69c6711903e999c86/0_0_820_932/820.png?quality=85&s=e47ec639fdaf420ac3c0be91cda686ed',
        mobileUrl:
            'https://i.guim.co.uk/img/media/2494b0dd21a753c373fcb85c26d4c461e13c6b5b/149_0_1195_588/500.png?quality=85&s=3a55e291549838bfacbcbb495ca5be6b',
        altText: 'The United States Capitol Building',
    },
    bannerId: 'us-eoy-banner',
});

const unvalidated = bannerWrapper(UsEoyGivingTuesBanner, 'us-eoy-banner');
const validated = validatedBannerWrapper(UsEoyGivingTuesBanner, 'us-eoy-banner');

export { validated as UsEoyMomentBanner, unvalidated as UsEoyMomentBannerUnvalidated };
