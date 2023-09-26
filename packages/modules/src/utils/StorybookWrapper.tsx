import React from 'react';
import { fontFaces, cssResets, previewStyles } from './renderHtmlDocument';
import type { ReactComponent } from '../types';

type Props = {
    children: React.ReactElement;
};

export const StorybookWrapper: ReactComponent<Props> = ({ children }: Props) => (
    <div>
        <style>
            {fontFaces}
            {cssResets}
            {previewStyles}
        </style>
        <div css="preview">{children}</div>
    </div>
);

export const BannerWrapper: ReactComponent<Props> = ({ children }: Props) => (
    <div
        style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
        }}
    >
        {children}
    </div>
);
