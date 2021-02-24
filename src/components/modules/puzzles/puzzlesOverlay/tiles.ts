import { brandAlt, lifestyle, neutral, text } from '@guardian/src-foundations/palette';
import { getTileTextAsImage } from './renderTileText';

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

const darkTilePositions: TilePosition[] = [
    {
        xPercentage: 30,
        yPercentage: 59,
        angle: 0.24504423,
    },
    {
        xPercentage: 37,
        yPercentage: 70,
        angle: -0.1277581,
    },
    {
        xPercentage: 71,
        yPercentage: 66,
        angle: 0.24504423,
    },
    {
        xPercentage: 96,
        yPercentage: 85,
        angle: -0.9138544,
    },
];

const darkTiles: Tile[] = darkTilePositions.map(position => {
    return {
        background: neutral[20],
        position,
    };
});

const purpleTilePositions: TilePosition[] = [
    {
        xPercentage: 3,
        yPercentage: 41,
        angle: -0.78958695,
    },
    {
        xPercentage: 15,
        yPercentage: 55,
        angle: 0.62430427,
    },
    {
        xPercentage: 28,
        yPercentage: 93,
        angle: -0.32253685,
    },
    {
        xPercentage: 81,
        yPercentage: 43,
        angle: 0.51539573,
    },
    {
        xPercentage: 88,
        yPercentage: 56,
        angle: -0.38606683,
    },
    {
        xPercentage: 82,
        yPercentage: 98,
        angle: -0.32253685,
    },
];

const purpleTiles: Tile[] = purpleTilePositions.map(position => {
    return {
        background: lifestyle[300],
        position,
    };
});

const pinkTilePositions: TilePositionWithText[] = [
    {
        xPercentage: 23,
        yPercentage: 70,
        angle: -0.39723694,
        tileText: '6',
    },
    {
        xPercentage: 25,
        yPercentage: 47,
        angle: 0.172264,
        tileText: '5',
    },
    {
        xPercentage: 61,
        yPercentage: 77,
        angle: -0.39723694,
    },
    {
        xPercentage: 81,
        yPercentage: 65,
        angle: 0.172264,
        tileText: '5',
    },
    {
        xPercentage: 86,
        yPercentage: 35,
        angle: -0.39723694,
        tileText: '6',
    },
];

const pinkTiles: Tile[] = pinkTilePositions.map(({ tileText, ...position }) => {
    return {
        background: lifestyle[600],
        color: text.primary,
        text: tileText,
        position,
    };
});

const yellowTilePositions: TilePositionWithText[] = [
    {
        xPercentage: 6,
        yPercentage: 87,
        angle: -0.33894294,
    },
    {
        xPercentage: 12,
        yPercentage: 42,
        angle: 0.52098078,
        tileText: '4',
    },
    {
        xPercentage: 34,
        yPercentage: 82,
        angle: -0.44872415,
        tileText: '2',
    },
    {
        xPercentage: 41,
        yPercentage: 59,
        angle: -0.33894294,
    },
    {
        xPercentage: 61,
        yPercentage: 90,
        angle: -0.33894294,
    },
    {
        xPercentage: 72,
        yPercentage: 88,
        angle: 0.52098078,
        tileText: '4',
    },
    {
        xPercentage: 78,
        yPercentage: 49,
        angle: -0.17645279,
        tileText: '8',
    },
    {
        xPercentage: 96,
        yPercentage: 44,
        angle: 0.52098078,
        tileText: '9',
    },
];

const yellowTiles: Tile[] = yellowTilePositions.map(({ tileText, ...position }) => {
    return {
        background: brandAlt[400],
        color: text.primary,
        text: tileText,
        position,
    };
});

const whiteTilePositions: TilePositionWithText[] = [
    {
        xPercentage: -0.5,
        yPercentage: 52,
        angle: -0.28763026,
    },
    {
        xPercentage: 9,
        yPercentage: 68,
        angle: 0.34051374,
        tileText: '2',
    },
    {
        xPercentage: 12,
        yPercentage: 91,
        angle: -0.38100538,
        tileText: '3',
    },
    {
        xPercentage: 20,
        yPercentage: 92,
        angle: 0.3546509,
    },
    {
        xPercentage: 31,
        yPercentage: 46,
        angle: -0.56409041,
    },
    {
        xPercentage: 51,
        yPercentage: 67,
        angle: -0.56409041,
    },
    {
        xPercentage: 91,
        yPercentage: 73,
        angle: 0.34051374,
        tileText: '3',
    },
    {
        xPercentage: 89,
        yPercentage: 90,
        angle: -0.28763026,
    },
];

const whiteTiles: Tile[] = whiteTilePositions.map(({ tileText, ...position }) => {
    return {
        background: neutral[100],
        color: text.primary,
        text: tileText,
        position,
    };
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function shuffle(array: any[]): any[] {
    const toShuffle = [...array];
    for (let i = toShuffle.length - 1; i > 0; i--) {
        const randomLowerIndex = Math.floor(Math.random() * i);
        const currentItem = toShuffle[i];
        toShuffle[i] = toShuffle[randomLowerIndex];
        toShuffle[randomLowerIndex] = currentItem;
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
