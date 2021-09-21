import React from 'react';
import { css } from '@emotion/react';
import { neutral, space } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { headline } from '@guardian/src-foundations/typography';
import { SvgCross } from '@guardian/src-icons';
import { Button } from '@guardian/src-button';
import { Hide } from '@guardian/src-layout';

const styles = {
    container: css`
        position: relative;
    `,
    header: css`
        background: ${neutral[100]};
        padding: ${space[2]}px ${space[3]}px;
        margin: 0;

        h2 {
            ${headline.xsmall({ fontWeight: 'bold' })}
            max-width: 160px;
            margin: 0;

            ${from.tablet} {
                max-width: none;
                font-size: 32px;
            }

            ${from.desktop} {
                ${headline.large({ fontWeight: 'bold' })}
            }

            ${from.leftCol} {
                ${headline.xlarge({ fontWeight: 'bold' })}
            }
        }

        ${from.mobileLandscape} {
            padding: ${space[2]}px ${space[5]}px;
        }

        ${from.tablet} {
            padding: ${space[2]}px 0;
        }
    `,
    closeButtonContainer: css`
        position: absolute;
        top: ${space[2]}px;
        right: ${space[3]}px;
    `,
    closeButton: css`
        background-color: ${neutral[100]};
        color: ${neutral[0]};
    `,
    mobileShadow: css`
        width: 100px;
        position: absolute;
        top: 0;
        right: 0;
    `,
};

interface InvestigationsMomentBannerHeaderProps {
    heading: JSX.Element | JSX.Element[] | null;
    mobileHeading: JSX.Element | JSX.Element[] | null;
    onCloseClick: () => void;
}

export function InvestigationsMomentBannerHeader({
    heading,
    mobileHeading,
    onCloseClick,
}: InvestigationsMomentBannerHeaderProps): JSX.Element {
    return (
        <div css={styles.container}>
            <header css={styles.header}>
                <h2>
                    <Hide above="tablet">{mobileHeading ?? heading}</Hide>
                    <Hide below="tablet">{heading}</Hide>
                </h2>
            </header>

            <Hide above="tablet">
                <div css={styles.mobileShadow}>
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <polygon points="0 0, 130 0, 130 100" />
                    </svg>
                </div>
            </Hide>

            <div css={styles.closeButtonContainer}>
                <Button
                    onClick={onCloseClick}
                    cssOverrides={styles.closeButton}
                    icon={<SvgCross />}
                    size="xsmall"
                    hideLabel
                >
                    Close
                </Button>
            </div>
        </div>
    );
}
