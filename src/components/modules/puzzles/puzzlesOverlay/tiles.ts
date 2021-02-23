import { brandAlt, lifestyle, neutral, text } from '@guardian/src-foundations/palette';

export type Tile = {
    background: string;
    color?: string;
    text?: string;
    size?: number;
    isText?: boolean;
};

const darkTiles: Tile[] = Array.from({ length: 4 }, () => {
    return {
        background: neutral[20],
    };
});

const purpleTiles: Tile[] = Array.from({ length: 6 }, () => {
    return {
        background: lifestyle[300],
    };
});

const pinkTiles: Tile[] = Array.from({ length: 5 }, (_, i) => {
    const hasNumber = i > 0;
    const displayNumber = i % 2 ? '5' : '6';
    return {
        background: lifestyle[600],
        color: text.primary,
        text: hasNumber ? displayNumber : undefined,
    };
});

const yellowTiles: Tile[] = [null, 4, 2, null, null, 4, 8, 9].map(tileNumber => {
    return {
        background: brandAlt[400],
        color: text.primary,
        text: tileNumber ? tileNumber.toString() : undefined,
    };
});

const whiteTiles: Tile[] = [null, 2, 3, null, null, null, 3, null].map(tileNumber => {
    return {
        background: neutral[100],
        color: text.primary,
        text: tileNumber ? tileNumber.toString() : undefined,
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
            color: text.primary,
            text: `Solve\nwith no\ndistractions`,
            isText: true,
        },
        {
            background: neutral[100],
            color: text.primary,
            text: `Access and solve over 15,000 crosswords and sudokus, wherever you are.`,
            size: 176,
            isText: true,
        },
        {
            background: neutral[100],
            color: text.primary,
            text: `Share and play with friends`,
            isText: true,
        },
    ];
}

export function getBackgroundTiles(): Tile[] {
    return shuffle([...darkTiles, ...purpleTiles, ...pinkTiles, ...yellowTiles, ...whiteTiles]);
}
