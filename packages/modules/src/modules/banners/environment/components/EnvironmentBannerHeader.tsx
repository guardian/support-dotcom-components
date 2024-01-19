import React from 'react';
import { css } from '@emotion/react';
import { from } from '@guardian/src-foundations/mq';
import { headline } from '@guardian/src-foundations/typography';
import { space } from '@guardian/source-foundations';
import { Hide } from '@guardian/src-layout';
import { IconEarth } from './IconEarth';
import { GREEN_HEX } from '../utils/constants';
import type { ReactComponent } from '../../../../types';

const container = css`
    position: relative;
    display: flex;
    flex-direction: row;
    border-top: 1px solid ${GREEN_HEX};
    border-bottom: 1px solid ${GREEN_HEX};
    ${from.tablet} {
        border-top: none;
    }
`;

const iconAndTextContainer = css`
    display: flex;
    position: relative;
    z-index: 100;
    margin-left: ${space[3]}px;

    ${from.tablet} {
        margin-left: ${space[9]}px;
        margin-right: ${space[9]}px;
    }

    ${from.desktop} {
        margin-left: ${space[5]}px;
        margin-right: ${space[5]}px;
    }
`;

const iconAndFirstLineContainer = css`
    display: flex;

    & > * + * {
        margin-left: 4px;
    }
`;

const iconContainer = css`
    width: 25px;
    height: 25px;
    margin-top: 5px;

    ${from.tablet} {
        width: 35px;
        height: 35px;
        margin-top: 4px;
    }

    ${from.desktop} {
        width: 45px;
        height: 45px;
        margin-top: 8px;
    }

    ${from.leftCol} {
        width: 53px;
        height: 53px;
        margin-top: 8px;
    }

    svg {
        height: 100%;
        display: block;
    }
`;

const textContainer = css`
    display: flex;
    flex-direction: column;
    ${headline.small({ fontWeight: 'bold' })}
    font-size: 30px;
    white-space: nowrap;
    ${from.tablet} {
        font-size: 40px;
        line-height: 100%;
        margin-top: 3px;
        & > * + * {
            margin-top: ${space[2]}px;
        }
    }
    ${from.desktop} {
        font-size: 50px;
        margin-top: ${space[1]}px;
        margin-left: ${space[4]}px;
        & > * + * {
            margin-top: ${space[4]}px;
        }
    }

    ${from.leftCol} {
        font-size: 60px;
    }
`;

const lineContainer = css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
`;

const line = css`
    width: 100%;
    border-top: 1px solid ${GREEN_HEX};
`;

export const EnvironmentBannerHeader: ReactComponent = () => (
    <header css={container}>
        <div css={iconAndTextContainer}>
            <Hide below="desktop">
                <div css={iconContainer}>
                    <IconEarth />
                </div>
            </Hide>

            <div css={textContainer}>
                <div css={iconAndFirstLineContainer}>
                    <Hide above="desktop">
                        <div css={iconContainer}>
                            <IconEarth />
                        </div>
                    </Hide>

                    <span>Support impactful</span>
                </div>

                <span>climate journalism</span>
            </div>
        </div>

        <div css={lineContainer}>
            <div css={line} />
        </div>
    </header>
);
