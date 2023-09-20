import * as z from 'zod';

const hexValueRegex = /^[0-9A-F]{2}$/;

const hexValueSchema = z.string().refine(
    val => {
        return hexValueRegex.test(val);
    },
    val => {
        return { message: `"${val}" is not a valid hex value` };
    },
);

export const hexColourSchema = z.object({
    r: hexValueSchema,
    g: hexValueSchema,
    b: hexValueSchema,
});

export const configurableDesignSchema = z.object({
    image: z.object({
        mobileUrl: z.string(),
        tabletDesktopUrl: z.string(),
        wideUrl: z.string(),
        altText: z.string(),
    }),
    colours: z.object({
        basic: z.object({
            background: hexColourSchema,
            bodyText: hexColourSchema,
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

interface HexColour {
    r: HexValue;
    g: HexValue;
    b: HexValue;
}

export const hexColourToString = (h: HexColour): string => `#${h.r}${h.g}${h.b}`;

export interface ConfigurableDesign {
    image: {
        mobileUrl: string;
        tabletDesktopUrl: string;
        wideUrl: string;
        altText: string;
    };
    colours: {
        basic: {
            background: HexColour;
            bodyText: HexColour;
        };
    };
}
