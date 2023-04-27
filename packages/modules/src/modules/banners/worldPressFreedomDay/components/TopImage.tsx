import React from 'react';
import { css } from '@emotion/react';
import { from } from '@guardian/src-foundations/mq';
import { TopImageSvg } from './TopImageSvg';

const styles = css`
    padding-right: 50px; // prevent overlap with close button
    margin-bottom: -40px; // pull copy element beneath closer

    ${from.mobileMedium} {
        margin-bottom: -30px;
    }

    ${from.mobileLandscape} {
        margin-bottom: -20px;
    }

    ${from.phablet} {
        margin-bottom: -10px;
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
