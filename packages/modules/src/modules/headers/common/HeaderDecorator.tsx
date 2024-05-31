import React from 'react';
import { DecoratorFn } from '@storybook/react';
import { css } from '@emotion/react';
import { brand } from '@guardian/source/foundations';

const background = css`
    background-color: ${brand[400]};
    padding: 10px;
`;

const HeaderDecorator: DecoratorFn = (Story) => (
    <div css={background}>
        <Story />
    </div>
);

export default HeaderDecorator;
