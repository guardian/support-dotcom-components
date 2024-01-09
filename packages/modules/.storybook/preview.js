import React, { useEffect } from 'react';
import { FocusStyleManager } from '@guardian/src-foundations/utils';
import { breakpoints } from '@guardian/src-foundations';
import { StylesDecorator } from './StylesDecorator';
import isChromatic from 'chromatic/isChromatic';
import MockDate from 'mockdate';

const isProd = process.env.NODE_ENV === 'production';

if (isChromatic()){
    MockDate.set('1 Jan 2024');
}

const viewportMeta = {
    mobile: {
        name: 'Mobile',
        type: 'mobile',
    },
    mobileMedium: {
        name: 'Mobile Medium',
        type: 'mobile',
    },
    mobileLandscape: {
        name: 'Mobile Landscape',
        type: 'mobile',
    },
    phablet: {
        name: 'Phablet',
        type: 'mobile',
    },
    tablet: {
        name: 'Tablet',
        type: 'tablet',
    },
    desktop: {
        name: 'Desktop',
        type: 'desktop',
    },
    leftCol: {
        name: 'Left Col',
        type: 'desktop',
    },
    wide: {
        name: 'Wide',
        type: 'desktop',
    },
};
const viewportEntries = Object.entries(breakpoints).map(([name, width]) => {
    return [
        name,
        {
            name: viewportMeta[name].name,
            styles: {
                width: `${width}px`,
                height: '100%',
            },
            type: viewportMeta[name].type,
        },
    ];
});
const viewports = Object.fromEntries(viewportEntries);

export const parameters = {
    options: {
        isToolshown: !isProd,
        isFullscreen: isProd,
    },
    viewport: { viewports },
    layout: 'fullscreen',
};

const FocusManagerDecorator = storyFn => {
    useEffect(() => {
        FocusStyleManager.onlyShowFocusOnTabs();
    });

    return <div>{storyFn()}</div>;
};

export const decorators = [FocusManagerDecorator, StylesDecorator];
