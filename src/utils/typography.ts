import {
    titlepiece as sfTitlepiece,
    headline as sfHeadline,
    body as sfBody,
    textSans as sfTextSans,
} from '@guardian/src-foundations/typography';

// Copied over from @src/foundations
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
    titlepiece[size] = (fontScaleArgs: FontScaleArgs): string => `${sfTitlepiece[size](
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
        `${sfHeadline[size](fontScaleArgs)};
        font-family: GH Guardian Headline, Guardian Egyptian Web, Georgia, serif;`;
}

// BODY
const bodySizes = ['small', 'medium'];
const body: TypographyHelperFunction = {};
for (let i = 0; i < bodySizes.length; i++) {
    const size = bodySizes[i] as BodyType;
    body[size] = (fontScaleArgs: FontScaleArgs): string =>
        `${sfBody[size](fontScaleArgs)};
        font-family: Guardian Text Egyptian Web, GuardianTextEgyptian, Georgia, serif;`;
}

// TEXT SANS
const textSansSizes = ['xsmall', 'small', 'medium', 'large', 'xlarge'];
const textSans: TypographyHelperFunction = {};
for (let i = 0; i < textSansSizes.length; i++) {
    const size = textSansSizes[i] as TextSansType;
    textSans[size] = (fontScaleArgs: FontScaleArgs): string =>
        `${sfTextSans[size](fontScaleArgs)};
        font-family: GuardianTextSans, Guardian Text Sans Web, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;`;
}

export { titlepiece, headline, body, textSans };
