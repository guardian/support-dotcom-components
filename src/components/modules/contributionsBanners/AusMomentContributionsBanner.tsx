import React, { useState } from 'react';
import { css } from 'emotion';
import { SerializedStyles } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { body, titlepiece, headline, textSans } from '@guardian/src-foundations/typography';
import { neutral, brandAlt, opinion } from '@guardian/src-foundations/palette';
import { from, until } from '@guardian/src-foundations/mq';
import { space } from '@guardian/src-foundations';
import { LinkButton } from '@guardian/src-button';
import { brand } from '@guardian/src-foundations/themes';
import Logo from '../guardianLogo/Logo';
import Close from '../closeButton/Close';

const banner = css`
    width: 100%;
    max-width: 1440px;
    margin: 0;
    padding: 0;
    position: relative;
    height: 420px !important;
    /* html {
        box-sizing: border-box;
    }
    *,
    *:before,
    *:after {
        box-sizing: inherit;
    } */
    box-sizing: border-box;
    display: flex;
    --percentage: 20%;
    background: radial-gradient(
        circle at center,
        ${brandAlt[400]} var(--percentage),
        ${brandAlt[200]} var(--percentage),
        ${brandAlt[200]} 65%,
        ${opinion[500]} 65%
    ) !important;
`;

const horizon = css`
    position: absolute;
    bottom: 0 !important;
    left: 0;
    width: 100%;
    height: auto;
    min-height: 50%;
    fill: ${neutral[7]};
`;

const closeButton = css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: 1px solid ${neutral[7]};
    border-radius: 50%;
    background: transparent;
    cursor: pointer;
    width: 35px;
    height: 35px;

    svg {
        width: 25px;
        height: 25px;
        fill: ${neutral[7]};
        transition: background-color 0.5s ease;
        border-radius: 50%;
    }

    :hover {
        cursor: pointer;
        background-color: rgba(237, 237, 237, 0.5);
    }

    /* ${until.desktop} {
        position: absolute;
        top: 10px;
        right: 10px;
    } */
    position: absolute;
    top: ${space[3]}px;
    right: ${space[24]}px;
`;

const contentContainer = css`
    position: relative;
    width: 100%;
    /* margin: 0 auto; */
    margin: 0;
    padding: 0;
    box-sizing: border-box;
`;

const topContentContainer = css`
    position: relative;
    height: 50%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    width: 100%;
`;

const actualNumber = css`
    margin: 0 auto;
    padding-top: 115px;
    color: ${neutral[7]};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

const actualNumberFigure = css`
    ${titlepiece.medium({ fontWeight: 'bold' })};
    margin: 0;
`;

const textUnderNumber = css`
    ${body.medium({ fontStyle: 'italic' })};
    margin: 0;
`;

const goal = css`
    position: absolute;
    bottom: ${space[2]}px;
    right: ${space[24]}px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: ${neutral[7]};
`;

const goalNumber = css`
    ${titlepiece.small({ fontWeight: 'bold' })};
    font-size: 28px;
    margin: 0;
`;

const bottomContentContainer = css`
    display: flex;
    justify-content: space-between;
    /* ${from.tablet} {
        display: flex;
        flex-direction: row;
    }
    ${from.wide} {
        max-width: 1250px;
    } */
    position: absolute;
    bottom: 0;
    z-index: 100;
    height: 50%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
`;

const headingAndCta = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: ${space[4]}px 0 0 ${space[24]}px;
    margin: 0;
    width: 50%;
`;

const heading = css`
    ${titlepiece.small({ fontWeight: 'bold' })};
    font-size: 42px;
    color: ${neutral[100]};
    line-height: 115%;
    padding: 0;
    margin: 0;
`;

const ctaContainer = css`
    display: flex;
    padding-bottom: ${space[6]}px;
    align-items: center;
`;

// TODO: sort out cssOverrides on cta

// const cta = css`
//     background-color: ${opinion[400]};
//     color: ${neutral[100]};
// `;

const cta: SerializedStyles = {
    name: 'cta',
    styles: `
        background-color: ${opinion[400]};
        color: ${neutral[100]};
    `,
};

const secondCta = css`
    ${textSans.medium()}
    margin-left: ${space[4]}px;
    a {
        color: ${neutral[86]};
    }
`;

const messageContainer = css`
    width: 50%;
    padding: ${space[2]}px ${space[24]}px 0 0;
`;

const message = css`
    ${body.small()}
    color: ${neutral[97]};
    line-height: 135%;
`;

type AusMomentContributionsBannerProps = {
    showSupportMessaging: boolean;
    isRecurringContributor: boolean;
    lastOneOffContributionDate?: number; // Platform to send undefined or a timestamp date
    numberOfSupporters: number;
};

export const AusMomentContributionsBanner: React.FC<AusMomentContributionsBannerProps> = ({
    showSupportMessaging,
    isRecurringContributor,
    lastOneOffContributionDate,
    numberOfSupporters,
}: AusMomentContributionsBannerProps) => {
    const [showBanner, closeBanner] = useState(true);
    return (
        <>
            {showBanner ? (
                <section className={banner}>
                    <div className={contentContainer}>
                        <div className={topContentContainer}>
                            <div className={actualNumber}>
                                <p className={actualNumberFigure}>120,001</p>
                                <p className={textUnderNumber}>supporters in Australia</p>
                            </div>
                            <div className={goal}>
                                <p className={goalNumber}>150,000</p>
                                <p className={textUnderNumber}>our goal</p>
                            </div>
                            <div>
                                <button
                                    onClick={(): void => closeBanner(false)}
                                    className={closeButton}
                                    aria-label="Close"
                                >
                                    <Close />
                                </button>
                            </div>
                        </div>
                        <div className={bottomContentContainer}>
                            <div className={headingAndCta}>
                                <h3 className={heading}>
                                    Our supporters are doing something powerful
                                </h3>
                                <div className={ctaContainer}>
                                    {/* <ThemeProvider theme={brandAlt}> */}
                                    <LinkButton
                                        cssOverrides={cta}
                                        // priority="primary"
                                        size="default"
                                        href="https://support.theguardian.com/contribute" // TODO: campaign code?
                                    >
                                        <span>Support the Guardian</span>
                                    </LinkButton>
                                    {/* </ThemeProvider> */}
                                    <div className={secondCta}>
                                        <a href="#">View our pledge</a>
                                    </div>
                                </div>
                            </div>
                            <div className={messageContainer}>
                                <p className={message}>
                                    One in three people in Australia read the Guardian in the last
                                    year. We need to keep growing our readership and gaining your
                                    support so we can provide high quality, independent journalism
                                    that’s open to everyone. Now more than ever, we all deserve
                                    access to factual information, and to trust the stories we read.
                                    <br />
                                    Right now, you can help us grow our community in Australia. To
                                    reach our ambitious goal of 150,000 supporters, we hope more
                                    readers like you will support us for the first time, and
                                    shareour work widely. Your support has an impact – and so does
                                    your voice. Thank you.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <svg className={horizon} fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 8.53333L69.5 0H106.5H169L246.25 12H511.897L690.358 5H791.7H962.886L1103.94 12H1324.34L1389.5 4H1426.5H1440V12V20V215H0V16V12V8.53333Z"
                            />
                        </svg>
                    </div>
                </section>
            ) : null}
        </>
    );
};
