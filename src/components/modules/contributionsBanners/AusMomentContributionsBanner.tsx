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
    // justify-content: space-between;
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
    margin-top: ${space[4]}px;
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
    isSupporter: boolean;
    showSupportMessaging: boolean;
    isRecurringContributor: boolean;
    lastOneOffContributionDate?: number; // Platform to send undefined or a timestamp date
    numberOfSupporters: number;
};

export const AusMomentContributionsBanner: React.FC<AusMomentContributionsBannerProps> = ({
    isSupporter,
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
                                    {isSupporter
                                        ? 'Our supporters are doing something powerful'
                                        : 'Help us reach more people across Australia'}
                                </h3>
                                {isSupporter ? (
                                    <div
                                        className={css`
                                            margin-top: ${space[4]}px;
                                            display: flex;
                                            align-items: center;
                                        `}
                                    >
                                        <svg
                                            width="36"
                                            height="36"
                                            viewBox="0 0 36 36"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <circle cx="18" cy="18" r="18" fill="#E05E00" />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M16.3469 13.9626V16.2354H14V18.7444H16.3469V26.2354H19.1734V18.7444H21.4861L22 16.2354H19.1734V14.2354C19.1734 13.1263 19.7902 12.7444 20.5953 12.7444H22L21.9143 10.3626C21.212 10.2899 20.6638 10.2354 19.8587 10.2354C17.8544 10.2354 16.3469 11.5626 16.3469 13.9626Z"
                                                fill="#F6F6F6"
                                            />
                                        </svg>
                                        <svg
                                            className={css`
                                                margin-left: ${space[2]}px;
                                            `}
                                            width="36"
                                            height="36"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <circle cx="18" cy="18" r="18" fill="#E05E00" />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M26.706 13.767a6.74 6.74 0 01-1.91.529 3.046 3.046 0 001.474-1.824c-.637.31-1.382.73-2.091.784-.6-.601-1.4-1.02-2.418-1.02-1.782 0-3.273 1.494-3.273 3.281 0 .2.018.547.09.748-2.781-.146-5.054-1.422-6.781-3.446-.237.492-.437 1.075-.437 1.659 0 1.094.582 2.206 1.473 2.735-.29.055-1.218-.237-1.509-.383 0 1.696 1.182 2.917 2.655 3.264-.564.146-1 .182-1.491.054.454 1.313 1.6 2.261 3.054 2.261-1.09.93-2.527 1.422-4.054 1.44-.273-.054-.564 0-.782-.054 1.4.93 3.218 1.44 5.036 1.44 6.018 0 9.346-4.995 9.346-9.335 0-.127-.037-.292-.037-.42a7.37 7.37 0 001.655-1.713z"
                                                fill="#F6F6F6"
                                            />
                                        </svg>
                                        <svg
                                            className={css`
                                                margin-left: ${space[2]}px;
                                            `}
                                            width="36"
                                            height="36"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <circle cx="18" cy="18" r="18" fill="#E05E00" />
                                            <path
                                                d="M25.632 13.425l-6.779 5.399h-1.236l-6.778-5.4.72-.777h13.354l.719.778z"
                                                fill="#F6F6F6"
                                                stroke="#F6F6F6"
                                                strokeWidth=".824"
                                            />
                                            <path
                                                d="M10.235 22.144v-6.909l7.238 5.091h1.524l7.238-5.09v6.908l-1.142 1.091H11.378l-1.143-1.09z"
                                                fill="#F6F6F6"
                                            />
                                        </svg>
                                        <div
                                            className={css`
                                            ${textSans.medium()}
                                            color: ${neutral[86]};
                                            margin-left: ${space[4]}px;
                                        `}
                                        >
                                            Share you support
                                        </div>
                                    </div>
                                ) : (
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
                                )}
                            </div>
                            <div className={messageContainer}>
                                {isSupporter ? (
                                    <p className={message}>
                                        Thanks to the support of thousands of readers like you,
                                        Guardian Australia has grown and is now read by one in three
                                        people. Your support has helped us deliver our independent
                                        quality journalism when it’s never been so vital. And you’ve
                                        helped us remain open to everyone. Right now, you can help
                                        <br />
                                        us grow our community even further in Australia. To reach
                                        our ambitious goal of 150,000 supporters, we hope you will
                                        champion our mission and encourage more people to read and
                                        support our work. Your support has an impact – and so does
                                        your voice. Thank you.
                                    </p>
                                ) : (
                                    <p className={message}>
                                        One in three people in Australia read the Guardian in the
                                        last year. We need to keep growing our readership and
                                        gaining your support so we can provide high quality,
                                        independent journalism that’s open to everyone. Now more
                                        than ever, we all deserve access to factual information, and
                                        to trust the stories we read.
                                        <br />
                                        Right now, you can help us grow our community in Australia.
                                        To reach our ambitious goal of 150,000 supporters, we hope
                                        more readers like you will support us for the first time,
                                        and shareour work widely. Your support has an impact – and
                                        so does your voice. Thank you.
                                    </p>
                                )}
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
