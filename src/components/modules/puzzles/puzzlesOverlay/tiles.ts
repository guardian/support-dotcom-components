import { brandAlt, lifestyle, neutral, text } from '@guardian/src-foundations/palette';
import { getTileTextAsImage } from './renderTileText';
import tileData from './tileData.json';

type TilePosition = {
    xPercentage: number;
    yPercentage: number;
    angle: number;
};

type TilePositionWithText = TilePosition & {
    tileText?: string;
};

export type Tile = {
    background: string;
    position: TilePosition;
    color?: string;
    text?: string;
    size?: number;
    isText?: boolean;
    image?: HTMLCanvasElement;
};

function createColouredTiles({ background, color }: { background: string; color: string }) {
    return function colouredTile({ tileText, ...position }: TilePositionWithText) {
        return {
            background,
            color,
            text: tileText,
            position,
        };
    };
}

const darkTiles: Tile[] = tileData.grey.map(
    createColouredTiles({ background: neutral[20], color: text.primary }),
);

const purpleTiles: Tile[] = tileData.purple.map(
    createColouredTiles({ background: lifestyle[300], color: text.primary }),
);

const pinkTiles: Tile[] = tileData.pink.map(
    createColouredTiles({ background: lifestyle[600], color: text.primary }),
);

const yellowTiles: Tile[] = tileData.yellow.map(
    createColouredTiles({ background: brandAlt[400], color: text.primary }),
);

const whiteTiles: Tile[] = tileData.white.map(
    createColouredTiles({ background: neutral[100], color: text.primary }),
);

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

export function getBackgroundTiles(): Tile[] {
    return shuffle([...darkTiles, ...purpleTiles, ...pinkTiles, ...yellowTiles, ...whiteTiles]);
}
