import * as z from 'zod';

const hexValueRegex = /^[0-9A-F]{2}$/;

const hexValueSchema = z.string().refine(
    (val) => {
        return hexValueRegex.test(val);
    },
    (val) => {
        return { message: `"${val}" is not a valid hex value` };
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
    tabletDesktopUrl: z.string(),
    wideUrl: z.string(),
    altText: z.string(),
    kind: z.literal('Image'),
});

const choiceCardsSchema = z.object({
    buttonColour: z.optional(hexColourSchema),
    buttonTextColour: z.optional(hexColourSchema),
    buttonBorderColour: z.optional(hexColourSchema),
    buttonSelectColour: z.optional(hexColourSchema),
    buttonSelectTextColour: z.optional(hexColourSchema),
    buttonSelectBorderColour: z.optional(hexColourSchema),
    kind: z.literal('ChoiceCards'),
});

const visualSchema = z.discriminatedUnion('kind', [imageSchema, choiceCardsSchema]);

export const configurableDesignSchema = z.object({
    visual: z.optional(visualSchema),
    colours: z.object({
        basic: z.object({
            background: hexColourSchema,
            bodyText: hexColourSchema,
            // TODO - more colours
        }),
    }),
});

type HexChar =
    | '0'
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | 'A'
    | 'B'
    | 'C'
    | 'D'
    | 'E'
    | 'F';

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
    hover: CtaStateDesign;
}

export type GuardianRoundel = 'default' | 'brand' | 'inverse';

interface TickerDesign {
    text: HexColour;
    filledProgress: HexColour;
    progressBarBackground: HexColour;
    goalMarker: HexColour;
}

export interface BannerDesignHeaderImage {
    mobileUrl: string;
    tabletDesktopUrl: string;
    wideUrl: string;
    altText: string;
}

export interface BannerDesignImage extends BannerDesignHeaderImage {
    kind: 'Image';
}

interface ChoiceCardsDesign {
    kind: 'ChoiceCards';
    buttonColour?: HexColour;
    buttonTextColour?: HexColour;
    buttonBorderColour?: HexColour;
    buttonSelectColour?: HexColour;
    buttonSelectTextColour?: HexColour;
    buttonSelectBorderColour?: HexColour;
}
type Visual = BannerDesignImage | ChoiceCardsDesign;

export interface ConfigurableDesign {
    visual?: Visual;
    headerImage?: BannerDesignHeaderImage;
    colours: {
        basic: {
            background: HexColour;
            bodyText: HexColour;
            headerText: HexColour;
            articleCountText: HexColour;
        };
        highlightedText: {
            text: HexColour;
            highlight: HexColour;
        };
        primaryCta: CtaDesign;
        secondaryCta: CtaDesign;
        closeButton: CtaDesign;
        guardianRoundel: GuardianRoundel;
        ticker: TickerDesign;
    };
}
