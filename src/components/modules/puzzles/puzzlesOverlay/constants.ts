export const ANGLE = {
    MIN: -0.6,
    MAX: 0.6,
};

export const BACKGROUND = {
    COLOR: '#ffffff',
};

export const BOUNDS = {
    SIZE: 200,
};

export const LINE = {
    WIDTH: 3,
    STROKE: '#000000',
};

type TextSize = 'LARGE' | 'SMALL';

type TextConstant = {
    FONT: string;
    LINE_HEIGHT: number;
    ALIGN: CanvasTextAlign;
    BASELINE: CanvasTextBaseline;
};

export const TEXT: { [key in TextSize]: TextConstant } = {
    LARGE: {
        FONT: '100px GuardianTextSans, sans-serif',
        LINE_HEIGHT: 100,
        ALIGN: 'center',
        BASELINE: 'middle',
    },
    SMALL: {
        FONT: 'bold 18px GH Guardian Headline, serif',
        LINE_HEIGHT: 18,
        ALIGN: 'left',
        BASELINE: 'top',
    },
};

export const TILE_SIZE = {
    LARGE: 176,
    SMALL: 120,
};

export const TILE_SHADOW = {
    OFFSET: 6,
    BLUR: 3,
    COLOR: 'rgba(0, 0, 0, 0.25)',
};

export const TILE_PROPERTIES = {
    DENSITY: {
        LIGHT: 0.01,
        HEAVY: 0.015,
    },
    FRICTION: 0.5,
    RESTITUTION: 0.7,
};

export const TIME = {
    SLOW: 0.02,
    NORMAL: 1,
};
