import { BannerDesignFromTool, HexColour } from '@sdc/shared/types';
import { Factory } from 'fishery';

// Unsafe - do not use outside of factories
const hexColourFromString = (s: string): HexColour =>
    ({
        r: s[0] + s[1],
        g: s[2] + s[3],
        b: s[4] + s[5],
        kind: 'hex',
    }) as HexColour;

export default Factory.define<BannerDesignFromTool>(() => ({
    name: 'EXAMPLE_DESIGN',
    image: {
        mobileUrl:
            'https://i.guim.co.uk/img/media/630a3735c02e195be89ab06fd1b8192959e282ab/0_0_1172_560/500.png?width=500&quality=75&s=937595b3f471d6591475955335c7c023',
        tabletDesktopUrl:
            'https://i.guim.co.uk/img/media/20cc6e0fa146574bb9c4ed410ac1a089fab02ce0/0_0_1428_1344/500.png?width=500&quality=75&s=fe64f647f74a3cb671f8035a473b895f',
        wideUrl:
            'https://i.guim.co.uk/img/media/6c933a058d1ce37a5ad17f79895906150812dfee/0_0_1768_1420/500.png?width=500&quality=75&s=9277532ddf184a308e14218e3576543b',
        altText: 'Example alt text',
    },
    colours: {
        basic: {
            background: hexColourFromString('F1F8FC'),
            bodyText: hexColourFromString('000000'),
            headerText: hexColourFromString('000000'),
            articleCountText: hexColourFromString('000000'),
        },
        highlightedText: {
            text: hexColourFromString('000000'),
            highlight: hexColourFromString('FFE500'),
        },
        primaryCta: {
            default: {
                text: hexColourFromString('FFFFFF'),
                background: hexColourFromString('0077B6'),
            },
            hover: {
                text: hexColourFromString('FFFFFF'),
                background: hexColourFromString('004E7C'),
            },
        },
        secondaryCta: {
            default: {
                text: hexColourFromString('004E7C'),
                background: hexColourFromString('F1F8FC'),
                border: hexColourFromString('FFFFFF'),
            },
            hover: {
                text: hexColourFromString('004E7C'),
                background: hexColourFromString('E5E5E5'),
                border: hexColourFromString('222527'),
            },
        },
        closeButton: {
            default: {
                text: hexColourFromString('052962'),
                background: hexColourFromString('F1F8FC'),
                border: hexColourFromString('052962'),
            },
            hover: {
                text: hexColourFromString('052962'),
                background: hexColourFromString('E5E5E5'),
            },
        },
    },
}));
