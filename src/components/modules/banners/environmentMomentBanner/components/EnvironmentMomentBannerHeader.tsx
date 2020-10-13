import React from 'react';
import { css } from '@emotion/core';
import { from } from '@guardian/src-foundations/mq';
import { headline } from '@guardian/src-foundations/typography';
import { space } from '@guardian/src-foundations';
import { neutral } from '@guardian/src-foundations/palette';
import IconPen from './IconPen';

const container = css`
    position: relative;
    display: flex;
    flex-direction: row;
    border-top: 1px solid ${neutral[86]};
    border-bottom: 1px solid ${neutral[86]};

    ${from.tablet} {
        border-top: none;
    }
`;

const iconAndTextContainer = css`
    display: flex;
    position: relative;
    z-index: 100;
    margin-left: ${space[4]}px;

    ${from.tablet} {
        margin-left: ${space[9]}px;
        margin-right: ${space[9]}px;
    }
`;

const iconContainer = css`
    height: 55px;
    img {
        height: 100%;
        display: block;
    }

    ${from.tablet} {
        height: 91px;
    }

    ${from.desktop} {
        height: 140px;
    }
`;

const textContainer = css`
    display: flex;
    flex-direction: column;
    margin-left: ${space[2]}px;
    ${headline.xsmall({ fontWeight: 'bold' })}
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
        font-size: 60px;
        margin-top: ${space[1]}px;
        margin-left: ${space[4]}px;

        & > * + * {
            margin-top: ${space[4]}px;
        }
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
    border-top: 1px solid ${neutral[86]};
`;

const hideAfterTablet = css`
    display: block;

    ${from.tablet} {
        display: none;
    }
`;

const hideBeforeTablet = css`
    display: none;

    ${from.tablet} {
        display: block;
    }
`;

interface EnvironmentMomentBannerHeaderProps {
    isSupporter: boolean;
}

const EnvironmentMomentBannerHeader: React.FC<EnvironmentMomentBannerHeaderProps> = ({
    isSupporter,
}: EnvironmentMomentBannerHeaderProps) => (
    <header css={container}>
        <div css={iconAndTextContainer}>
            <div css={iconContainer}>
                <IconPen />
            </div>
            <div css={hideAfterTablet}>
                <div css={textContainer}>
                    {isSupporter ? (
                        <>
                            <span>You help power</span>
                            <span>our climate pledge</span>
                        </>
                    ) : (
                        <>
                            <span>Help power</span>
                            <span>our climate pledge</span>
                        </>
                    )}
                </div>
            </div>
            <div css={hideBeforeTablet}>
                <div css={textContainer}>
                    {isSupporter ? (
                        <>
                            <span>You help power</span>
                            <span>our pledge</span>
                        </>
                    ) : (
                        <>
                            <span>Help power our</span>
                            <span>climate pledge</span>
                        </>
                    )}
                </div>
            </div>
        </div>
        <div css={lineContainer}>
            <div css={line} />
        </div>
    </header>
);

export default EnvironmentMomentBannerHeader;
