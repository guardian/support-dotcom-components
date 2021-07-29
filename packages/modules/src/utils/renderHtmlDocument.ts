const CDNFontPath = 'https://assets.guim.co.uk/static/frontend';

interface TemplateData {
	html: string;
	css: string;
	js: string;
}

export const fontFaces = `
    @font-face {
        font-family: "GH Guardian Headline";
        src: url(${CDNFontPath}/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-Light.woff2) format("woff2"),
            url(${CDNFontPath}/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-Light.woff) format("woff");
        font-weight: 300;
        font-style: normal;
    }
    @font-face {
        font-family: "GH Guardian Headline";
        src: url(${CDNFontPath}/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-LightItalic.woff2) format("woff2"),
            url(${CDNFontPath}/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-LightItalic.woff) format("woff");
        font-weight: 300;
        font-style: italic;
    }
    @font-face {
        font-family: "GH Guardian Headline";
        src: url(${CDNFontPath}/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-Medium.woff2) format("woff2"),
            url(${CDNFontPath}/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-Medium.woff) format("woff");
        font-weight: 500;
        font-style: normal;
    }
    @font-face {
        font-family: "GH Guardian Headline";
        src: url(${CDNFontPath}/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-MediumItalic.woff2) format("woff2"),
            url(${CDNFontPath}/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-MediumItalic.woff) format("woff");
        font-weight: 500;
        font-style: italic;
    }
    @font-face {
        font-family: "GH Guardian Headline";
        src: url(${CDNFontPath}/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-Bold.woff2) format("woff2"),
            url(${CDNFontPath}/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-Bold.woff) format("woff");
        font-weight: 700;
        font-style: normal;
    }
    @font-face {
        font-family: "GH Guardian Headline";
        src: url(${CDNFontPath}/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-BoldItalic.woff2) format("woff2"),
            url(${CDNFontPath}/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-BoldItalic.woff) format("woff");
        font-weight: 700;
        font-style: italic;
    }
    @font-face {
        font-family: "GuardianTextEgyptian";
        src: url(${CDNFontPath}/fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-Regular.woff2) format("woff2"),
            url(${CDNFontPath}/fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-Regular.woff) format("woff");
        font-weight: 400;
        font-style: normal;
    }
    @font-face {
        font-family: "GuardianTextEgyptian";
        src: url(${CDNFontPath}/fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-RegularItalic.woff2) format("woff2"),
            url(${CDNFontPath}/fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-RegularItalic.woff) format("woff");
        font-weight: 400;
        font-style: italic;
    }
    @font-face {
        font-family: "GuardianTextEgyptian";
        src: url(${CDNFontPath}/fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-Bold.woff2) format("woff2"),
            url(${CDNFontPath}/fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-Bold.woff) format("woff");
        font-weight: 700;
        font-style: normal;
    }
    @font-face {
        font-family: "GuardianTextSans";
        src: url(${CDNFontPath}/fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-Regular.woff2) format("woff2"),
            url(${CDNFontPath}/fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-Regular.woff) format("woff");
        font-weight: 400;
        font-style: normal;
    }
    @font-face {
        font-family: "GuardianTextSans";
        src: url(${CDNFontPath}/fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-RegularItalic.woff2) format("woff2"),
            url(${CDNFontPath}/fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-RegularItalic.woff) format("woff");
        font-weight: 400;
        font-style: italic;
    }
    @font-face {
        font-family: "GuardianTextSans";
        src: url(${CDNFontPath}/fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-Bold.woff2) format("woff2"),
            url(${CDNFontPath}/fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-Bold.woff) format("woff");
        font-weight: 700;
        font-style: normal;
    }
`;

export const cssResets = `
    html {
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
    }
    body {
        margin: 0;
    }
`;

export const previewStyles = `
    .preview {
        max-width: 1300px;
        margin: 0 auto;
    }
`;

const renderComponentJs = (js: string): string => `
    <script>const init = ${js}; init({ epicRoot: document, onReminderOpen: function(params) { console.log('onReminderOpen: ', params) } });</script>
`;

export const renderHtmlDocument = ({
	html,
	css,
	js = '',
}: TemplateData): string =>
	`<!DOCTYPE html>
    <html lang="en-GB">
      <head>
        <meta charset="utf-8" />
        <title>Contributions Service Preview</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
            ${fontFaces}
            ${cssResets}
            ${previewStyles}
        </style>
        <style>
          ${css}
        </style>
      </head>
      <body>
        <div class="preview">
          ${html}
        </div>
        <script src="https://assets.guim.co.uk/polyfill.io/v3/polyfill.min.js?rum=0&features=es6,es7,es2017,es2018,default-3.6,HTMLPictureElement,IntersectionObserver,IntersectionObserverEntry,fetch,NodeList.prototype.forEach&flags=gated&callback=guardianPolyfilled&unknown=polyfill&cacheClear=1"></script>
        ${js ? renderComponentJs(js) : ''}
      </body>
    </html>
    `;
