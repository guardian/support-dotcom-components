import React, { useState } from 'react';
import { css } from 'emotion';
import { SerializedStyles } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { body, titlepiece, headline, textSans } from '@guardian/src-foundations/typography';
import { neutral, brandAlt, opinion } from '@guardian/src-foundations/palette';
import { from, until } from '@guardian/src-foundations/mq';
import { space } from '@guardian/src-foundations';
import { LinkButton, Button } from '@guardian/src-button';
import { Link } from '@guardian/src-link';
import { brand } from '@guardian/src-foundations/themes';
import Logo from '../guardianLogo/Logo';
import Close from '../closeButton/Close';

const FacebookLogoSvg: React.FC = () => {
    return (
        <svg
            className={css`
                color: ${neutral[97]};
            `}
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.425 9.12498V12.25H8V15.7H11.425V25.9999H15.55V15.7H18.925L19.675 12.25H15.55V9.49998C15.55 7.97499 16.45 7.44999 17.625 7.44999H19.675L19.55 4.175C18.525 4.075 17.725 4 16.55 4C13.625 4 11.425 5.82499 11.425 9.12498Z"
            />
        </svg>
    );
};

const TwitterLogoSvg: React.FC = () => {
    return (
        <svg
            className={css`
                color: ${neutral[97]};
            `}
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M25.9999 8.09999C25.1249 8.47499 24.3499 8.69999 23.3749 8.82499C24.3999 8.24999 25.0749 7.4 25.3999 6.325C24.5249 6.75 23.4999 7.325 22.5249 7.4C21.6999 6.575 20.5999 6 19.1999 6C16.75 6 14.7 8.04999 14.7 10.5C14.7 10.775 14.725 11.25 14.825 11.525C11 11.325 7.87499 9.57499 5.49999 6.8C5.175 7.47499 4.9 8.27499 4.9 9.07499C4.9 10.575 5.69999 12.1 6.92499 12.825C6.52499 12.9 5.25 12.5 4.85 12.3C4.85 14.625 6.47499 16.3 8.49998 16.775C7.72499 16.975 7.12499 17.025 6.44999 16.85C7.07499 18.65 8.64998 19.95 10.65 19.95C9.14998 21.2249 7.17499 21.8999 5.075 21.9249C4.7 21.8499 4.3 21.9249 4 21.8499C5.92499 23.1249 8.42498 23.8249 10.925 23.8249C19.1999 23.8249 23.7749 16.975 23.7749 11.025C23.7749 10.85 23.7249 10.625 23.7249 10.45C24.6249 9.77499 25.3999 8.97499 25.9999 8.09999Z"
            />
        </svg>
    );
};

const EnvelopeSvg: React.FC = () => {
    return (
        <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M18.632 5.4248L11.8533 10.8236H10.6174L3.83873 5.4248L4.55822 4.64712H17.9125L18.632 5.4248Z"
                fill="#F6F6F6"
                stroke="#F6F6F6"
                strokeWidth="0.823529"
            />
            <path
                d="M3.23535 14.1444V7.23535L10.4734 12.3263H11.9973L19.2354 7.23535V14.1444L18.0925 15.2354H4.37821L3.23535 14.1444Z"
                fill="#F6F6F6"
            />
        </svg>
    );
};

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
    padding: ${space[4]}px 0 0 6%;
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
    margin-left: -${space[2]}px;
    padding-bottom: ${space[6]}px;
    align-items: center;
`;

const cta = css`
    margin-left: ${space[2]}px;
    background-color: ${opinion[400]} !important;
    color: ${neutral[100]};

    :hover {
        background-color: ${opinion[300]} !important;
    }
`;

const secondCta = css`
    // ${textSans.medium()}
    margin-left: ${space[4]}px;
`;

const messageContainer = css`
    width: 50%;
    padding: ${space[2]}px 6% 0 0;
`;

const message = css`
    ${body.small()}
    color: ${neutral[97]};
    line-height: 135%;
    margin-bottom: ${space[1]}px;
`;

const messagePartTwo = css`
    ${body.small()}
    color: ${neutral[97]};
    line-height: 135%;
    margin: 0px;
`;

type AusMomentContributionsBannerProps = {
    isSupporter: boolean;
    totalSupporters: number;
    showSupportMessaging: boolean;
    isRecurringContributor: boolean;
    lastOneOffContributionDate?: number; // Platform to send undefined or a timestamp date
    numberOfSupporters: number;
};

export const AusMomentContributionsBanner: React.FC<AusMomentContributionsBannerProps> = ({
    isSupporter,
    totalSupporters,
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
                                <p className={actualNumberFigure}>
                                    {totalSupporters.toLocaleString()}
                                </p>
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
                                        ? 'Help us reach more people across Australia'
                                        : 'Our supporters are doing something powerful'}
                                </h3>
                                {isSupporter ? (
                                    <div className={ctaContainer}>
                                        <Button
                                            className={cta}
                                            icon={<FacebookLogoSvg />}
                                            size="small"
                                        ></Button>

                                        <Button
                                            className={cta}
                                            icon={<TwitterLogoSvg />}
                                            size="small"
                                        ></Button>

                                        <Button
                                            className={cta}
                                            icon={<EnvelopeSvg />}
                                            size="small"
                                        ></Button>
                                        <div
                                            className={css`
                                            ${textSans.medium()}
                                            color: ${neutral[86]};
                                            margin-left: ${space[4]}px;
                                        `}
                                        >
                                            Share your support
                                        </div>
                                    </div>
                                ) : (
                                    <div className={ctaContainer}>
                                        {/* <ThemeProvider theme={brandAlt}> */}
                                        <LinkButton
                                            className={cta}
                                            // priority="primary"
                                            size="default"
                                            href="https://support.theguardian.com/contribute" // TODO: campaign code?
                                        >
                                            <span>Support the Guardian</span>
                                        </LinkButton>
                                        {/* </ThemeProvider> */}
                                        <div className={secondCta}>
                                            <ThemeProvider theme={brand}>
                                                {/* TODO: Add link */}
                                                <Link priority="primary" href="#">
                                                    View our pledge
                                                </Link>
                                            </ThemeProvider>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className={messageContainer}>
                                {isSupporter ? (
                                    <div>
                                        <p className={message}>
                                            Thanks to the support of thousands of readers like you,
                                            Guardian Australia has grown and is now read by one in
                                            three people. Your support has helped us deliver our
                                            independent quality journalism when it’s never been so
                                            vital. And you’ve helped us remain open to everyone.
                                        </p>
                                        <p className={messagePartTwo}>
                                            Right now, you can help us grow our community even
                                            further in Australia. To reach our ambitious goal of
                                            150,000 supporters, we hope you will champion our
                                            mission and encourage more people to read and support
                                            our work. Your support has an impact – and so does your
                                            voice. Thank you.
                                        </p>
                                    </div>
                                ) : (
                                    <div>
                                        <p className={message}>
                                            One in three people in Australia read the Guardian in
                                            the last year. We need to keep growing our readership
                                            and gaining your financial support so we can provide
                                            high quality, independent journalism that’s open to
                                            everyone. Now more than ever, we all deserve access to
                                            factual information, and to trust the stories we read.
                                        </p>
                                        <p className={messagePartTwo}>
                                            Right now, you can help us grow our community in
                                            Australia. To reach our ambitious goal of 150,000
                                            supporters, we hope more readers like you will support
                                            us for the first time, and shareour work widely. Your
                                            support has an impact – and so does your voice. Thank
                                            you.
                                        </p>
                                    </div>
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
