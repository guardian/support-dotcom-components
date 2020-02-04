// This file provides access to the 4 typography helpers from the Guardian Design System (@src-foundations/typography)
// with the output of each helper extended to include the font faces expected by both pre- and post-design system platforms (i.e. Frontend vs DCR)
// This ensures we can develop our components unaware of platform differences whilst taking advantage of convenience of the design system helper functions.
// NOTE - meant to be used as temporary tool to abstract those differences until we find a solution on the platform side.
import {
    titlepiece as dsTitlepiece,
    headline as dsHeadline,
    body as dsBody,
    textSans as dsTextSans,
} from '@guardian/src-foundations/typography';

// Copied over from @src/foundations
// Defines the FontScaleArgs argument allowed into any typography helper
type LineHeight = 'tight' | 'regular' | 'loose';
type FontWeight = 'light' | 'regular' | 'medium' | 'bold';
type FontScaleArgs = {
    lineHeight?: LineHeight;
    fontWeight?: FontWeight;
    italic?: boolean;
};

// Describes any of the helper functions we're mapping from @src/foundations
interface TypographyHelperFunction {
    [key: string]: Function;
}

// Defines the possible sizes for each typography object
// Used to describe the keys allowed for any of those objects
type TitlepieceType = 'small' | 'medium' | 'large';
type HeadlineType = 'xxxsmall' | 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
type BodyType = 'small' | 'medium';
type TextSansType = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';

// Assigning TITLEPIECE sizing helper functions
const titlepiece: TypographyHelperFunction = {};
const titlepieceSizes: TitlepieceType[] = ['small', 'medium', 'large'];
titlepieceSizes.forEach((size): void => {
    titlepiece[size] = (fontScaleArgs: FontScaleArgs): string => `${dsTitlepiece[size](
        fontScaleArgs,
    )};
    font-family: GT Guardian Titlepiece, Guardian Titlepiece, Georgia, serif;`;
});

// Assigning HEADLINE sizing helper functions
const headline: TypographyHelperFunction = {};
const headlineSizes: HeadlineType[] = [
    'xxxsmall',
    'xxsmall',
    'xsmall',
    'small',
    'medium',
    'large',
    'xlarge',
];
headlineSizes.forEach((size): void => {
    headline[size] = (fontScaleArgs: FontScaleArgs): string =>
        `${dsHeadline[size](fontScaleArgs)};
        font-family: GH Guardian Headline, Guardian Egyptian Web, Georgia, serif;`;
});

// Assigning BODY sizing helper functions
const body: TypographyHelperFunction = {};
const bodySizes: BodyType[] = ['small', 'medium'];
bodySizes.forEach((size): void => {
    body[size] = (fontScaleArgs: FontScaleArgs): string =>
        `${dsBody[size](fontScaleArgs)};
        font-family: GuardianTextEgyptian, Guardian Text Egyptian Web, Georgia, serif;`;
});

// Assigning TEXT SANS sizing helper functions
const textSans: TypographyHelperFunction = {};
const textSansSizes: TextSansType[] = ['xsmall', 'small', 'medium', 'large', 'xlarge'];
textSansSizes.forEach((size): void => {
    textSans[size] = (fontScaleArgs: FontScaleArgs): string =>
        `${dsTextSans[size](fontScaleArgs)};
        font-family: GuardianTextSans, Guardian Text Sans Web, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;`;
});

export { titlepiece, headline, body, textSans };
