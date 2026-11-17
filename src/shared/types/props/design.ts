import { z } from 'zod';

const hexValueRegex = /^[0-9A-F]{2}$/;

const hexValueSchema = z.string().refine(
    (val) => {
        return hexValueRegex.test(val);
    },
    {
        error: (issue) => `"${JSON.stringify(issue.input)}" is not a valid hex value`,
    },
);

export const hexColourSchema = z.object({
    r: hexValueSchema,
    g: hexValueSchema,
    b: hexValueSchema,
    kind: z.literal('hex'),
});

const imageSchema = z.object({
    mobileUrl: z.string(),
    tabletUrl: z.string(),
    desktopUrl: z.string(),
    altText: z.string(),
    kind: z.literal('Image'),
});

const choiceCardsSchema = z.object({
    buttonColour: hexColourSchema.nullish(),
    buttonOpacity: z.number().min(0).max(1).nullish(),
    buttonTextColour: hexColourSchema.nullish(),
    buttonBorderColour: hexColourSchema.nullish(),
    buttonSelectColour: hexColourSchema.nullish(),
    buttonSelectOpacity: z.number().min(0).max(1).nullish(),
    buttonSelectTextColour: hexColourSchema.nullish(),
    buttonSelectBorderColour: hexColourSchema.nullish(),
    buttonSelectMarkerColour: hexColourSchema.nullish(),
    pillTextColour: hexColourSchema.nullish(),
    pillBackgroundColour: hexColourSchema.nullish(),
    kind: z.literal('ChoiceCards'),
});

const visualSchema = z.discriminatedUnion('kind', [imageSchema, choiceCardsSchema]);

export const configurableDesignSchema = z.object({
    visual: visualSchema.nullish(),
    headerImage: z
        .object({
            mobileUrl: z.string(),
            tabletUrl: z.string(),
            desktopUrl: z.string(),
            altText: z.string(),
        })
        .nullish(),
    tabletImageAsBackground: z.boolean().optional(),
    colours: z.object({
        basic: z.object({
            background: hexColourSchema,
            bodyText: hexColourSchema,
            // TODO - more colours
        }),
        newsletterBanner: z
            .object({
                divider: hexColourSchema.optional(),
                actionColor: hexColourSchema.optional(),
                frequencyIconColor: hexColourSchema.optional(),
                emailInputTextColor: hexColourSchema.optional(),
                emailInputBackgroundColor: hexColourSchema.optional(),
                emailInputBorderColor: hexColourSchema.optional(),
                signupButtonBackgroundColor: hexColourSchema.optional(),
                signupButtonTextColor: hexColourSchema.optional(),
                errorColor: hexColourSchema.optional(),
                privacyTextColor: hexColourSchema.optional(),
                borderColor: hexColourSchema.optional(),
                toggleActiveColor: hexColourSchema.optional(),
                successIconColor: hexColourSchema.optional(),
                browseButtonColor: hexColourSchema.optional(),
            })
            .optional(),
    }),
});

type HexChar =
    '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

type HexValue = `${HexChar}${HexChar}`;

export interface HexColour {
    r: HexValue;
    g: HexValue;
    b: HexValue;
    kind: 'hex';
}

export const hexColourToString = (h: HexColour): string => `#${h.r}${h.g}${h.b}`;

interface CtaStateDesign {
    text: HexColour;
    background: HexColour;
    border?: HexColour;
}
export interface CtaDesign {
    default: CtaStateDesign;
}

interface TickerDesign {
    filledProgress: HexColour;
    progressBarBackground: HexColour;
    headlineColour: HexColour; //new
    totalColour: HexColour; //new
    goalColour: HexColour; //new
}

export interface BannerDesignHeaderImage {
    mobileUrl: string;
    tabletUrl: string;
    desktopUrl: string;
    altText: string;
}

export interface BannerDesignImage extends BannerDesignHeaderImage {
    kind: 'Image';
}

interface ChoiceCardsDesign {
    kind: 'ChoiceCards';
    buttonColour?: HexColour;
    buttonOpacity?: number;
    buttonTextColour?: HexColour;
    buttonBorderColour?: HexColour;
    buttonSelectColour?: HexColour;
    buttonSelectOpacity?: number;
    buttonSelectTextColour?: HexColour;
    buttonSelectBorderColour?: HexColour;
    buttonSelectMarkerColour?: HexColour;
    pillTextColour?: HexColour;
    pillBackgroundColour?: HexColour;
}
type Visual = BannerDesignImage | ChoiceCardsDesign;

type FontSize = 'small' | 'medium' | 'large';

interface Font {
    size: FontSize;
}

export interface ConfigurableDesign {
    visual?: Visual;
    headerImage?: BannerDesignHeaderImage;
    tabletImageAsBackground?: boolean;
    fonts?: {
        heading: Font;
    };
    colours: {
        basic: {
            background: HexColour;
            bodyText: HexColour;
            headerText: HexColour;
            articleCountText: HexColour;
            logo: HexColour;
        };
        newsletterBanner?: {
            divider?: HexColour;
            actionColor?: HexColour;
            frequencyIconColor?: HexColour;
            emailInputTextColor?: HexColour;
            emailInputBackgroundColor?: HexColour;
            emailInputBorderColor?: HexColour;
            signupButtonBackgroundColor?: HexColour;
            signupButtonTextColor?: HexColour;
            errorColor?: HexColour;
            privacyTextColor?: HexColour;
            borderColor?: HexColour;
            toggleActiveColor?: HexColour;
            successIconColor?: HexColour;
            browseButtonColor?: HexColour;
        };
        highlightedText: {
            text: HexColour;
            highlight: HexColour;
        };
        primaryCta: CtaDesign;
        secondaryCta: CtaDesign;
        closeButton: CtaDesign;
        ticker: TickerDesign;
    };
}
