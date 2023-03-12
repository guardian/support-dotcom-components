import React from 'react';
import { css, SerializedStyles } from '@emotion/react';
import { neutral, space } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';

const mainStyles = css`
    display: block;
    overflow: hidden;
    background-color: ${neutral[100]};
    color: ${neutral[7]};
    border: 1px solid ${neutral[86]};
    border-radius: ${space[3]}px ${space[3]}px 0 0;

    :not(:last-child) {
        margin-bottom: ${space[3]}px;

        ${from.mobileLandscape} {
            margin-bottom: ${space[4]}px;
        }
    }
`;

export interface BoxProps {
    children: React.ReactNode;
    cssOverrides?: SerializedStyles;
}

export function Box(props: BoxProps): JSX.Element {
    return <section css={[mainStyles, props.cssOverrides ?? '']}>{props.children}</section>;
}
