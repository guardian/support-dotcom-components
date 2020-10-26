import React from 'react';
import { fontFaces, cssResets, previewStyles } from './renderHtmlDocument';

type Props = {
    children: React.ReactElement;
};

export const StorybookWrapper: React.FC<Props> = ({ children }: Props) => (
    <div>
        <style>
            {fontFaces}
            {cssResets}
            {previewStyles}
        </style>
        <div css="preview">{children}</div>
    </div>
);

export const BannerWrapper: React.FC<Props> = ({ children }: Props) => (
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
