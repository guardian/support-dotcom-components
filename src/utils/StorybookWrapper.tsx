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
        <div className="preview">{children}</div>
    </div>
);
