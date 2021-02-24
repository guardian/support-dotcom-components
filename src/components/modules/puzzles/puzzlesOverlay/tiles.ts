import { brandAlt, lifestyle, neutral, text } from '@guardian/src-foundations/palette';
import { TEXT } from './constants';
import { getTileTextAsImage } from './renderTileText';
import { numbers, letters } from './tileData.json';

type TilePosition = {
    xPercentage: number;
    yPercentage: number;
    angle: number;
};

type TileSet = 'numbers' | 'letters';

type TilePositionWithText = TilePosition & {
    tileText?: string;
};

export type Tile = {
    background: string;
    position: TilePosition;
    font?: string;
    color?: string;
    text?: string;
    size?: number;
    isText?: boolean;
    image?: HTMLCanvasElement;
};

function createColouredTiles({
    background,
    color,
    font,
}: {
    background: string;
    color: string;
    font: string;
}) {
    return function colouredTile({ tileText, ...position }: TilePositionWithText) {
        return {
            background,
            color,
            position,
            font,
            text: tileText,
        };
    };
}

function shuffle(array: Tile[]): Tile[] {
    const toShuffle = [...array];
    for (let i = toShuffle.length - 1; i > 0; i--) {
        const randomLowerIndex = Math.floor(Math.random() * i);
        const currentItem = toShuffle[i];
        toShuffle[i] = toShuffle[randomLowerIndex] as Tile;
        toShuffle[randomLowerIndex] = currentItem as Tile;
    }
    return toShuffle;
}

export function getTextTiles(): Tile[] {
    return [
        {
            background: neutral[100],
            position: {
                xPercentage: 59,
                yPercentage: 60,
                angle: -0.28763026,
            },
            size: 176,
            isText: true,
            image: getTileTextAsImage(
                'Access and\nsolve over\n15,000\ncrosswords\nand sudokus,\nwherever\nyou are.',
                text.primary,
                176,
            ),
        },
        {
            background: neutral[100],
            position: {
                xPercentage: 64,
                yPercentage: 43,
                angle: 0.2356194,
            },
            isText: true,
            image: getTileTextAsImage('Solve\nwith no\ndistractions', text.primary, 120),
        },
        {
            background: neutral[100],
            position: {
                xPercentage: 66,
                yPercentage: 77,
                angle: -0.02129302,
            },
            isText: true,
            image: getTileTextAsImage('Share and\nplay with\nfriends', text.primary, 120),
        },
    ];
}

export function getBackgroundTiles(tileSet: TileSet): Tile[] {
    const tileData = tileSet === 'letters' ? letters : numbers;
    const font = tileSet === 'letters' ? TEXT.LARGE_LETTER.FONT : TEXT.LARGE.FONT;

    const darkTiles: Tile[] = tileData.grey.map(
        createColouredTiles({ background: neutral[20], color: text.primary, font }),
    );

    const purpleTiles: Tile[] = tileData.purple.map(
        createColouredTiles({ background: lifestyle[300], color: text.primary, font }),
    );

    const pinkTiles: Tile[] = tileData.pink.map(
        createColouredTiles({ background: lifestyle[600], color: text.primary, font }),
    );

    const yellowTiles: Tile[] = tileData.yellow.map(
        createColouredTiles({ background: brandAlt[400], color: text.primary, font }),
    );

    const whiteTiles: Tile[] = tileData.white.map(
        createColouredTiles({ background: neutral[100], color: text.primary, font }),
    );

    return shuffle([...darkTiles, ...purpleTiles, ...pinkTiles, ...yellowTiles, ...whiteTiles]);
}
