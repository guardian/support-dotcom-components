import React from 'react';
import { Global, css } from '@emotion/core';
import { fontFaces, cssResets, previewStyles } from './renderHtmlDocument';

type Props = {
    children: React.ReactElement;
};

export const StorybookWrapper: React.FC<Props> = ({ children }: Props) => (
    <div>
        <Global
            styles={css`
                ${fontFaces}
                ${cssResets}
                ${previewStyles}
            `}
        />
        <div className="preview">{children}</div>
    </div>
);
