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

// TITLEPIECE
const titlepieceSizes = ['small', 'medium', 'large'];
const titlepiece: TypographyHelperFunction = {};
for (let i = 0; i < titlepieceSizes.length; i++) {
    const size = titlepieceSizes[i] as TitlepieceType;
    titlepiece[size] = (fontScaleArgs: FontScaleArgs): string => `${dsTitlepiece[size](
        fontScaleArgs,
    )};
    font-family: GT Guardian Titlepiece, Guardian Titlepiece, Georgia, serif;`;
}

// HEADLINE
const headlineSizes = ['xxxsmall', 'xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge'];
const headline: TypographyHelperFunction = {};
for (let i = 0; i < headlineSizes.length; i++) {
    const size = headlineSizes[i] as HeadlineType;
    headline[size] = (fontScaleArgs: FontScaleArgs): string =>
        `${dsHeadline[size](fontScaleArgs)};
        font-family: GH Guardian Headline, Guardian Egyptian Web, Georgia, serif;`;
}

// BODY
const bodySizes = ['small', 'medium'];
const body: TypographyHelperFunction = {};
for (let i = 0; i < bodySizes.length; i++) {
    const size = bodySizes[i] as BodyType;
    body[size] = (fontScaleArgs: FontScaleArgs): string =>
        `${dsBody[size](fontScaleArgs)};
        font-family: GuardianTextEgyptian, Guardian Text Egyptian Web, Georgia, serif;`;
}

// TEXT SANS
const textSansSizes = ['xsmall', 'small', 'medium', 'large', 'xlarge'];
const textSans: TypographyHelperFunction = {};
for (let i = 0; i < textSansSizes.length; i++) {
    const size = textSansSizes[i] as TextSansType;
    textSans[size] = (fontScaleArgs: FontScaleArgs): string =>
        `${dsTextSans[size](fontScaleArgs)};
        font-family: GuardianTextSans, Guardian Text Sans Web, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;`;
}

export { titlepiece, headline, body, textSans };
