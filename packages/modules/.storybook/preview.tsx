import React, { useEffect } from 'react';
import { FocusStyleManager } from '@guardian/source-foundations';
import { breakpoints } from '@guardian/source-foundations';
import { StylesDecorator } from './StylesDecorator';
import { Preview } from '@storybook/react';

const isProd = process.env.NODE_ENV === 'production';

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

const FocusManagerDecorator = (storyFn) => {
    useEffect(() => {
        FocusStyleManager.onlyShowFocusOnTabs();
    });

    return <div>{storyFn()}</div>;
};

export const decorators = [FocusManagerDecorator, StylesDecorator];

const preview: Preview = {
    parameters: {
        chromatic: {
            delay: 300,
            modes: {
                mobile: {
                    viewport: 'mobile',
                },
                tablet: {
                    viewport: 'tablet',
                },
                desktop: {
                    viewport: 'desktop',
                },
            },
        },
        options: {
            isToolshown: !isProd,
            isFullscreen: isProd,
        },
        viewport: { viewports },
        layout: 'fullscreen',
    },
};

export default preview;
