import { Factory } from 'fishery';
import type { BannerDesignFromTool, HexColour } from '../../shared/types';

const hexColourStringRegex = /^([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i;
const stringToHexColour = (colourString: string): HexColour => {
    if (hexColourStringRegex.test(colourString)) {
        const matches = hexColourStringRegex.exec(colourString);
        return {
            r: (matches?.[1] as string).toUpperCase(),
            g: (matches?.[2] as string).toUpperCase(),
            b: (matches?.[3] as string).toUpperCase(),
            kind: 'hex',
        } as HexColour;
    } else {
        throw new Error('Invalid hex colour string!');
    }
};

export default Factory.define<BannerDesignFromTool>(() => ({
    name: 'EXAMPLE_DESIGN',
    visual: {
        kind: 'Image',
        mobileUrl:
            'https://i.guim.co.uk/img/media/630a3735c02e195be89ab06fd1b8192959e282ab/0_0_1172_560/500.png?width=500&quality=75&s=937595b3f471d6591475955335c7c023',
        tabletUrl:
            'https://i.guim.co.uk/img/media/20cc6e0fa146574bb9c4ed410ac1a089fab02ce0/0_0_1428_1344/500.png?width=500&quality=75&s=fe64f647f74a3cb671f8035a473b895f',
        desktopUrl:
            'https://i.guim.co.uk/img/media/6c933a058d1ce37a5ad17f79895906150812dfee/0_0_1768_1420/500.png?width=500&quality=75&s=9277532ddf184a308e14218e3576543b',
        altText: 'Example alt text',
    },
    fonts: {
        heading: {
            size: 'medium',
        },
    },
    colours: {
        basic: {
            background: stringToHexColour('F1F8FC'),
            bodyText: stringToHexColour('000000'),
            headerText: stringToHexColour('000000'),
            articleCountText: stringToHexColour('000000'),
            logo: stringToHexColour('000000'),
        },
        highlightedText: {
            text: stringToHexColour('000000'),
            highlight: stringToHexColour('FFE500'),
        },
        primaryCta: {
            default: {
                text: stringToHexColour('FFFFFF'),
                background: stringToHexColour('0077B6'),
            },
        },
        secondaryCta: {
            default: {
                text: stringToHexColour('004E7C'),
                background: stringToHexColour('F1F8FC'),
                border: stringToHexColour('FFFFFF'),
            },
        },
        closeButton: {
            default: {
                text: stringToHexColour('052962'),
                background: stringToHexColour('F1F8FC'),
                border: stringToHexColour('052962'),
            },
        },
        ticker: {
            text: stringToHexColour('052962'),
            filledProgress: stringToHexColour('052962'),
            progressBarBackground: stringToHexColour('ffffff'),
            goalMarker: stringToHexColour('000000'),
            headlineColour: stringToHexColour('000000'),
            totalColour: stringToHexColour('000000'),
            goalColour: stringToHexColour('000000'),
        },
    },
}));
