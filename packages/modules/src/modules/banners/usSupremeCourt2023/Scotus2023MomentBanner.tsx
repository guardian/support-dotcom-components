import { brand, neutral, specialReport } from '@guardian/source-foundations';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import { getMomentTemplateBanner } from '../momentTemplate/MomentTemplateBanner';

const Scotus2023MomentBanner = getMomentTemplateBanner({
    containerSettings: {
        backgroundColour: specialReport[100],
        textColor: neutral[100],
    },
    headerSettings: {
        showHeader: { text: true },
        textColour: neutral[100],
    },
    primaryCtaSettings: {
        default: {
            backgroundColour: brand[500],
            textColour: neutral[100],
        },
        hover: {
            backgroundColour: neutral[100],
            textColour: brand[500],
        },
    },
    secondaryCtaSettings: {
        default: {
            backgroundColour: specialReport[100],
            textColour: neutral[100],
            border: `1px solid ${neutral[100]}`,
        },
        hover: {
            backgroundColour: neutral[100],
            textColour: specialReport[100],
            border: `1px solid ${specialReport[100]}`,
        },
    },
    closeButtonSettings: {
        default: {
            backgroundColour: neutral[100],
            textColour: specialReport[100],
            border: `1px solid ${specialReport[100]}`,
        },
        hover: {
            backgroundColour: specialReport[100],
            textColour: neutral[100],
            border: `1px solid ${neutral[100]}`,
        },
        guardianRoundel: 'inverse',
    },
    highlightedTextSettings: {
        textColour: specialReport[100],
        highlightColour: neutral[100],
    },
    articleCountTextColour: neutral[100],
    imageSettings: {
        mainUrl:
            'https://i.guim.co.uk/img/media/d9439edc81326f0546960316bd1c84acaf974366/752_639_3258_1303/1000.jpg?width=500&quality=75&s=f19e815a62c8550748d9514d39298683',
        mobileUrl:
            'https://i.guim.co.uk/img/media/d9439edc81326f0546960316bd1c84acaf974366/752_639_3258_1303/1000.jpg?width=500&quality=75&s=f19e815a62c8550748d9514d39298683',
        tabletUrl:
            'https://i.guim.co.uk/img/media/d9439edc81326f0546960316bd1c84acaf974366/1400_406_1772_1773/1000.jpg?width=500&quality=75&s=16e4aebfcbad771ee40c9b6f9fd99056',
        desktopUrl:
            'https://i.guim.co.uk/img/media/d9439edc81326f0546960316bd1c84acaf974366/1400_406_1772_1773/1000.jpg?width=500&quality=75&s=16e4aebfcbad771ee40c9b6f9fd99056',
        leftColUrl:
            'https://i.guim.co.uk/img/media/d9439edc81326f0546960316bd1c84acaf974366/1395_636_1953_1302/1953.jpg?width=900&quality=75&s=133c6e21b3a43c57f91fd16ecbe942ec',
        wideUrl:
            'https://i.guim.co.uk/img/media/d9439edc81326f0546960316bd1c84acaf974366/1395_636_1953_1302/1953.jpg?width=900&quality=75&s=133c6e21b3a43c57f91fd16ecbe942ec',
        altText: 'APPROPRIATE ALT TEXT HERE',
    },
    bannerId: 'scotus-2023-moment-banner',
});

const unvalidated = bannerWrapper(Scotus2023MomentBanner, 'scotus-2023-moment-banner');
const validated = validatedBannerWrapper(Scotus2023MomentBanner, 'scotus-2023-moment-banner');

export { validated as Scotus2023MomentBanner, unvalidated as Scotus2023MomentBannerUnvalidated };
