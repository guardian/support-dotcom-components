import type { BannerProps, ConfigurableDesign, HexColour } from '../shared/types';
import { isNazaNewsletterTest } from './lib/newsletters';

type NewsletterBannerDesign = Omit<ConfigurableDesign, 'colours'> & {
    tabletImageAsBackground?: boolean;
    colours: Omit<ConfigurableDesign['colours'], 'newsletterBanner'> & {
        newsletterBanner: NonNullable<ConfigurableDesign['colours']['newsletterBanner']> & {
            frequencyIconColor?: HexColour;
            emailInputTextColor?: HexColour;
            emailInputBackgroundColor?: HexColour;
            emailInputBorderColor?: HexColour;
            signupButtonBackgroundColor?: HexColour;
            signupButtonTextColor?: HexColour;
            toggleActiveColor?: HexColour;
            successIconColor?: HexColour;
        };
    };
};

const newsletterBannerOverridesBase = {
    bannerChannel: 'contributions',
    isCollapsible: false,
    design: {
        colours: {
            basic: {
                background: { r: 'F3', g: 'F7', b: 'FF', kind: 'hex' },
                bodyText: { r: '33', g: '33', b: '33', kind: 'hex' },
                headerText: { r: '12', g: '12', b: '12', kind: 'hex' },
                articleCountText: { r: '00', g: '00', b: '00', kind: 'hex' },
                logo: { r: '00', g: '00', b: '00', kind: 'hex' },
            },
            newsletterBanner: {
                divider: { r: 'DC', g: 'DC', b: 'DC', kind: 'hex' },
                actionColor: { r: '05', g: '29', b: '62', kind: 'hex' },
                frequencyIconColor: { r: 'FF', g: 'FF', b: 'FF', kind: 'hex' },
                emailInputTextColor: { r: '12', g: '12', b: '12', kind: 'hex' },
                emailInputBackgroundColor: { r: 'FF', g: 'FF', b: 'FF', kind: 'hex' },
                errorColor: { r: 'C7', g: '00', b: '00', kind: 'hex' },
                privacyTextColor: { r: '70', g: '70', b: '70', kind: 'hex' },
                toggleActiveColor: { r: '22', g: '87', b: '4D', kind: 'hex' },
                successIconColor: { r: '58', g: 'D0', b: '8B', kind: 'hex' },
                browseButtonColor: { r: '05', g: '29', b: '62', kind: 'hex' },
            },
            highlightedText: {
                text: { r: '33', g: '33', b: '33', kind: 'hex' },
                highlight: { r: 'F3', g: 'F7', b: 'FF', kind: 'hex' },
            },
            primaryCta: {
                default: {
                    text: { r: '05', g: '29', b: '62', kind: 'hex' },
                    background: { r: 'FF', g: 'E5', b: '00', kind: 'hex' },
                },
            },
            secondaryCta: {
                default: {
                    text: { r: '00', g: '00', b: '00', kind: 'hex' },
                    background: { r: 'F1', g: 'F8', b: 'FC', kind: 'hex' },
                    border: { r: '00', g: '00', b: '00', kind: 'hex' },
                },
            },
            closeButton: {
                default: {
                    text: { r: '00', g: '00', b: '00', kind: 'hex' },
                    background: { r: 'E6', g: 'EC', b: 'EF', kind: 'hex' },
                    border: { r: 'E6', g: 'EC', b: 'EF', kind: 'hex' },
                },
            },
            ticker: {
                filledProgress: { r: '33', g: '33', b: '33', kind: 'hex' },
                progressBarBackground: { r: 'F3', g: 'F7', b: 'FF', kind: 'hex' },
                headlineColour: { r: '33', g: '33', b: '33', kind: 'hex' },
                totalColour: { r: '33', g: '33', b: '33', kind: 'hex' },
                goalColour: { r: '33', g: '33', b: '33', kind: 'hex' },
            },
        },
    },
} satisfies Pick<BannerProps, 'bannerChannel' | 'isCollapsible'> & {
    design: NewsletterBannerDesign;
};

const hexColour = (value: string): HexColour => ({
    r: value.slice(0, 2).toUpperCase() as HexColour['r'],
    g: value.slice(2, 4).toUpperCase() as HexColour['g'],
    b: value.slice(4, 6).toUpperCase() as HexColour['b'],
    kind: 'hex',
});

const NazaNewsletterDesign: NewsletterBannerDesign = {
    ...newsletterBannerOverridesBase.design,
    tabletImageAsBackground: true,
    headerImage: {
        mobileUrl:
            'https://i.guim.co.uk/img/media/3e54a72ccdf78508b8af96645b1ddbeb3907ffad/0_0_360_360/360.png?width=280&quality=100&s=58442d1d9b2907af5297bfc177226463',
        tabletUrl:
            'https://i.guim.co.uk/img/media/1ffc36c9f7bb070eb67efcc74dd8f74d8c52cf9a/0_0_1968_1484/1968.jpg?width=1000&quality=100&s=7256eabe674d825b55abb14af6c62887',
        desktopUrl:
            'https://i.guim.co.uk/img/media/7688239a7cc28f7f95cb8f13b3073dba277db0dd/0_0_1840_1244/1840.jpg?width=460&quality=100&s=f79da6483ae56e30aae6e04f84b135c2',
        altText: '',
    },
    colours: {
        ...newsletterBannerOverridesBase.design.colours,
        basic: {
            background: hexColour('1A1A1A'),
            bodyText: hexColour('EDEDED'),
            headerText: hexColour('FFFFFF'),
            articleCountText: hexColour('FFFFFF'),
            logo: hexColour('FFFFFF'),
        },
        newsletterBanner: {
            divider: hexColour('545454'),
            actionColor: hexColour('EACCA0'),
            frequencyIconColor: hexColour('1A1A1A'),
            emailInputTextColor: hexColour('EDEDED'),
            emailInputBackgroundColor: hexColour('333333'),
            emailInputBorderColor: hexColour('EDEDED'),
            signupButtonBackgroundColor: hexColour('FFFFFF'),
            signupButtonTextColor: hexColour('000000'),
            errorColor: hexColour('FF9081'),
            privacyTextColor: hexColour('EDEDED'),
            toggleActiveColor: hexColour('28A85F'),
            successIconColor: hexColour('58D08B'),
            browseButtonColor: hexColour('EDEDED'),
            borderColor: hexColour('999999'),
        },
        highlightedText: {
            text: hexColour('FFFFFF'),
            highlight: hexColour('FFE500'),
        },
        primaryCta: {
            default: {
                text: hexColour('1A1A1A'),
                background: hexColour('C4A484'),
            },
        },
        secondaryCta: {
            default: {
                text: hexColour('FFFFFF'),
                background: hexColour('333333'),
                border: hexColour('FFFFFF'),
            },
        },
        closeButton: {
            default: {
                text: hexColour('FFFFFF'),
                background: hexColour('333333'),
                border: hexColour('333333'),
            },
        },
        ticker: {
            filledProgress: hexColour('FFE500'),
            progressBarBackground: hexColour('333333'),
            headlineColour: hexColour('FFE500'),
            totalColour: hexColour('FFFFFF'),
            goalColour: hexColour('FFE500'),
        },
    },
};

const StakesNewsletterDesign: NewsletterBannerDesign = {
    ...newsletterBannerOverridesBase.design,
    headerImage: {
        mobileUrl: 'https://uploads.guim.co.uk/2026/10/30/The_Stakes_image_Mobile.png',
        tabletUrl: 'https://uploads.guim.co.uk/2026/10/30/The_Stakes_image.png',
        desktopUrl: 'https://uploads.guim.co.uk/2026/10/30/The_Stakes_image.png',
        altText: '',
    },
    colours: newsletterBannerOverridesBase.design.colours,
};

export const newsletterBannerOverrides = (
    testName: string,
): Pick<BannerProps, 'bannerChannel' | 'isCollapsible'> & {
    design: NewsletterBannerDesign;
} => ({
    ...newsletterBannerOverridesBase,
    design: isNazaNewsletterTest(testName)
        ? NazaNewsletterDesign
        : testName === 'NEWSLETTER_STAKES'
          ? StakesNewsletterDesign
          : newsletterBannerOverridesBase.design,
});
