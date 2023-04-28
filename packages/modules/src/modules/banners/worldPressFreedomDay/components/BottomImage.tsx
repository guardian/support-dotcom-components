import React from 'react';
import { css } from '@emotion/react';
import { from } from '@guardian/src-foundations/mq';
import { BottomImageSvg } from './BottomImageSvg';

const styles = css`
    margin-top: -15px; // pull copy element above closer
    margin-bottom: -15px; // pull price card container beneath closer

    ${from.mobileLandscape} {
        margin-top: 0;
        margin-bottom: 0;
    }

    svg {
        max-width: 100%;
    }
`;

export function BottomImage(): JSX.Element {
    return (
        <div css={styles}>
            <BottomImageSvg />
        </div>
    );
}
