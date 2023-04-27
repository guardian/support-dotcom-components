import React from 'react';
import { css } from '@emotion/react';
import { from } from '@guardian/src-foundations/mq';
import { TopImageSvg } from './TopImageSvg';

const styles = css`
    padding-right: 50px; // prevent overlap with close button
    margin-bottom: -40px; // pull copy element beneath closer

    ${from.mobileLandscape} {
        margin-bottom: 0;
    }

    ${from.tablet} {
        padding-right: 0;
    }

    svg {
        max-width: 100%;
    }
`;

export function TopImage(): JSX.Element {
    return (
        <div css={styles}>
            <TopImageSvg />
        </div>
    );
}
