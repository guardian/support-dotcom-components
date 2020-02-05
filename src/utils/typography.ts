// This file provides access to the 4 typography helpers from the Guardian Design System (@guardian/src-foundations/typography)
// with the output of each helper extended to include the font faces expected by both pre- and post-design system platforms (i.e. Frontend vs DCR)
// This ensures we can develop our components unaware of platform differences whilst leveraging the convenience of the helpers in the design system.
// NOTE - this is meant to be used as temporary tool to abstract those differences until we find a solution on the platform side.
import {
    // The original Design System typography objects
    titlepiece as dsTitlepiece,
    headline as dsHeadline,
    body as dsBody,
    textSans as dsTextSans,
    // Types used to compose the FontScaleArgs type
    LineHeight,
    FontWeight,
    // The types we'll use to cast the size names that we'll turn into functions
    TitlepieceSizes,
    HeadlineSizes,
    BodySizes,
    TextSansSizes,
    // Objects where each key is a size name (e.g. 'small' or 'medium') so we know which sizes are allowed into any typography object
    titlepieceSizes,
    headlineSizes,
    bodySizes,
    textSansSizes,
} from '@guardian/src-foundations/typography';

// Copied over from @guardian/src-foundations/typography
// Defines the FontScaleArgs argument allowed into any typography helper
type FontScaleArgs = {
    lineHeight?: LineHeight;
    fontWeight?: FontWeight;
    italic?: boolean;
};

// Describes any of the helper functions we're mapping from @guardian/src-foundations/typography
interface TypographyHelperFunction {
    [key: string]: Function;
}

// Declaring the objects to which the helper functions will be dynamically assigned
const titlepiece: TypographyHelperFunction = {};
const headline: TypographyHelperFunction = {};
const body: TypographyHelperFunction = {};
const textSans: TypographyHelperFunction = {};

// Assigning TITLEPIECE sizing helper functions
Object.keys(titlepieceSizes).forEach((sizeName): void => {
    const size = sizeName as TitlepieceSizes;
    titlepiece[size] = (fontScaleArgs: FontScaleArgs): string => `${dsTitlepiece[size](
        fontScaleArgs,
    )};
    font-family: GT Guardian Titlepiece, Guardian Titlepiece, Georgia, serif;`;
});

// Assigning HEADLINE sizing helper functions
Object.keys(headlineSizes).forEach((sizeName): void => {
    const size = sizeName as HeadlineSizes;
    headline[size] = (fontScaleArgs: FontScaleArgs): string =>
        `${dsHeadline[size](fontScaleArgs)};
        font-family: GH Guardian Headline, Guardian Egyptian Web, Georgia, serif;`;
});

// Assigning BODY sizing helper functions
Object.keys(bodySizes).forEach((sizeName): void => {
    const size = sizeName as BodySizes;
    body[size] = (fontScaleArgs: FontScaleArgs): string =>
        `${dsBody[size](fontScaleArgs)};
        font-family: GuardianTextEgyptian, Guardian Text Egyptian Web, Georgia, serif;`;
});

// Assigning TEXT SANS sizing helper functions
Object.keys(textSansSizes).forEach((sizeName): void => {
    const size = sizeName as TextSansSizes;
    textSans[size] = (fontScaleArgs: FontScaleArgs): string =>
        `${dsTextSans[size](fontScaleArgs)};
        font-family: GuardianTextSans, Guardian Text Sans Web, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;`;
});

export { titlepiece, headline, body, textSans };
