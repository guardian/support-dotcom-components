import React, { useState, useEffect } from 'react';
import { css } from 'emotion';
import { ThemeProvider } from 'emotion-theming';
import { body, titlepiece, textSans } from '@guardian/src-foundations/typography';
import { neutral, brandAlt, opinion } from '@guardian/src-foundations/palette';
import { from, until } from '@guardian/src-foundations/mq';
import { space } from '@guardian/src-foundations';
import { LinkButton, Button } from '@guardian/src-button';
import { Link } from '@guardian/src-link';
import { brand } from '@guardian/src-foundations/themes';
import Close from '../closeButton/Close';
import ExpandableText from './expandableText';
import { BannerProps } from '../Banner';
import { setContributionsBannerClosedTimestamp } from './localStorage';

const targetIncrease = 30_000;
const startingAmt = 120_000;
const haloSize = 65;
const startPercent = 20;

const calculatePercentage = (supporters: number): number => {
    const startToCurrentDiff = Math.min(Math.max(supporters - startingAmt, 0), targetIncrease);
    return startToCurrentDiff / targetIncrease;
};

const calculateCircumference = (supporters: number): number => {
    const startToCurrentDiff = Math.min(Math.max(supporters - startingAmt, 0), targetIncrease);
    const percentageGained = startToCurrentDiff / targetIncrease;
    return startPercent * (1 - percentageGained) + percentageGained * haloSize;
};

const sunBackground = (supporters: number): string => {
    const circumference = calculateCircumference(supporters);
    return `radial-gradient(
        circle at center,
        ${brandAlt[400]} ${circumference}%,
        ${brandAlt[200]} ${circumference}%,
        ${brandAlt[200]} ${haloSize}%,
        ${opinion[500]} ${haloSize}%
    ) !important`;
};

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

const banner = (supporters: number): string => css`
    width: 100%;
    margin: 0;
    padding: 0;
    position: relative;
    height: 420px !important;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    // background: ${sunBackground(supporters)};
`;

const sunSVGContainer = css`
    position: fixed;
`;

const sunSVG = css`
    width: 100%;
    height: 230px;
    background-color: ${opinion[500]};
`;

function getInnerCircleFill(start: number, stop: number, percentage: number): number {
    return start * (1 - percentage) + stop * percentage;
}

const innnerCircleMobile = (percentage: number): string => {
    const start = 30;
    const stop = 50;
    const fill = getInnerCircleFill(start, stop, percentage);
    return css`
        clip-path: circle(${fill}%);
        @keyframes grow-mobile {
            0% {
                clip-path: circle(${start}%);
            }
            100% {
                clip-path: circle(${fill}%);
            }
        }
        color: ${brandAlt[400]};
        animation-name: grow-mobile;
        animation-duration: 2s;
        animation-timing-function: ease;
        animation-iteration-count: 1;

        ${from.tablet} {
            display: none;
        }
    `;
};

const innnerCircleTablet = (percentage: number): string => {
    const start = 20;
    const stop = 50;
    const fill = getInnerCircleFill(start, stop, percentage);
    return css`
        clip-path: circle(${fill}%);
        @keyframes grow-tablet {
            0% {
                clip-path: circle(${start}%);
            }
            100% {
                clip-path: circle(${fill}%);
            }
        }
        color: ${brandAlt[400]};
        animation-name: grow-tablet;
        animation-duration: 2s;
        animation-timing-function: ease;
        animation-iteration-count: 1;

        display: none;

        ${from.tablet} {
            display: block;
        }

        ${from.desktop} {
            display: none;
        }
    `;
};

const innnerCircleDesktop = (percentage: number): string => {
    const start = 18;
    const stop = 50;
    const fill = getInnerCircleFill(start, stop, percentage);
    return css`
        clip-path: circle(${fill}%);
        @keyframes grow-desktop {
            0% {
                clip-path: circle(${start}%);
            }
            100% {
                clip-path: circle(${fill}%);
            }
        }
        color: ${brandAlt[400]};
        animation-name: grow-desktop;
        animation-duration: 2s;
        animation-timing-function: ease;
        animation-iteration-count: 1;

        display: none;

        ${from.desktop} {
            display: block;
        }

        ${from.wide} {
            display: none;
        }
    `;
};

const innnerCircleWide = (percentage: number): string => {
    const start = 18;
    const stop = 50;
    const fill = getInnerCircleFill(start, stop, percentage);
    return css`
        clip-path: circle(${fill}%);
        @keyframes grow-desktop {
            0% {
                clip-path: circle(${start}%);
            }
            100% {
                clip-path: circle(${fill}%);
            }
        }
        color: ${brandAlt[400]};
        animation-name: grow-desktop;
        animation-duration: 2s;
        animation-timing-function: ease;
        animation-iteration-count: 1;

        display: none;

        ${from.desktop} {
            display: block;
        }
    `;
};

const outerCircleMobile = css`
    color: ${brandAlt[200]};

    ${from.tablet} {
        display: none;
    }
`;

const outerCircleTablet = css`
    color: ${brandAlt[200]};
    display: none;

    ${from.tablet} {
        display: block;
    }

    ${from.desktop} {
        display: none;
    }
`;

const outerCircleDesktop = css`
    color: ${brandAlt[200]};
    display: none;

    ${from.desktop} {
        display: block;
    }

    ${from.wide} {
        display: none;
    }
`;

const outerCircleWide = css`
    color: ${brandAlt[200]};
    display: none;

    ${from.wide} {
        display: block;
    }
`;

const closeButton = css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: 0;
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

    position: absolute;
    top: ${space[3]}px;
    right: ${space[3]}px;

    ${from.tablet} {
        right: ${space[9]}px;
        border: 1px solid ${neutral[7]};
    }

    ${from.desktop} {
        right: ${space[24]}px;
    }
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
    min-height: 230px;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    width: 100%;
`;

const actualNumber = css`
    margin: 0 auto;
    color: ${neutral[7]};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    padding-top: 150px;
    ${from.tablet} {
        padding-top: 115px;
    }
`;

const actualNumberFigure = css`
    ${titlepiece.medium({ fontWeight: 'bold' })};
    font-size: 34px;
    ${from.tablet} {
        font-size: 54px;
    }
    margin: 0;
`;

const textUnderNumber = css`
    ${body.medium({ fontStyle: 'italic' })};
    font-size: 12px;
    ${from.tablet} {
        font-size: 17px;
    }
    margin: 0;
`;

const goal = css`
    position: absolute;
    display: flex;
    flex-direction: column;
    color: ${neutral[7]};
    align-items: flex-start;

    ${until.tablet} {
        top: ${space[1]}px !important;
        left: ${space[3]}px !important;
        flex-direction: row;
        align-items: baseline;
    }

    ${until.desktop} {
        top: ${space[3]}px;
        left: ${space[6]}px;
    }

    ${from.desktop} {
        bottom: ${space[2]}px;
        right: ${space[24]}px;
    }
`;

const goalNumber = css`
    ${titlepiece.small({ fontWeight: 'bold' })};
    font-size: 15px;
    margin: 0;

    ${from.tablet} {
        font-size: 28px;
    }
`;

const goalText = css`
    ${body.small({ fontStyle: 'italic' })};
    margin-left: ${space[1]}px;
    ${from.tablet} {
        ${body.medium({ fontStyle: 'italic' })};
        margin: 0;
    }
`;

const svgAndBottomContentContainer = css`
    display: flex;
    align-items: stretch;
    flex-direction: column;
    margin-top: -20px;
`;

const horizonContainer = css`
    margin: 0;
    padding: 0;
`;

const horizon = css`
    bottom: 0 !important;
    left: 0;
    width: 100%;
    fill: ${neutral[7]};
    margin: 0;
    padding: 0;
`;

const bottomContentContainer = css`
    display: flex;
    justify-content: space-between;
    margin-top: -6px;
    padding: 0 ${space[3]}px;
    box-sizing: border-box;
    background-color: ${neutral[7]};
    min-height: 211px;
    width: 100%;

    ${from.tablet} {
        padding: 0 ${space[5]}px;
    }

    ${from.wide} {
        padding: 0 ${space[24]}px;
    }
`;

const headingAndCta = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: ${space[1]}px 0 0 0;
    margin: 0;
    width: 100%;

    ${from.tablet} {
        width: 33%;
    }

    ${from.desktop} {
        width: 50%;
    }
`;

const heading = css`
    color: ${neutral[100]};
    line-height: 115%;
    padding: 0;
    margin: 0;
    ${titlepiece.small({ fontWeight: 'bold' })};
    font-size: 24px;

    ${from.tablet} {
        font-size: 28px;
    }

    ${from.desktop} {
        font-size: 42px;
    }
`;

const mobileMessage = css`
    margin-bottom: ${space[5]}px;

    ${from.tablet} {
        display: none;
    }
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
    display: none;
    ${textSans.medium()};
    margin-left: ${space[4]}px;

    ${from.desktop} {
        display: block;
    }
`;

const messageContainer = css`
    display: none;
    padding: 0;

    ${from.tablet} {
        display: block;
        width: 60%;
    }

    ${from.desktop} {
        width: 50%;
    }
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

const messageSupporter = (
    <div>
        <p className={message}>
            Thanks to the support of thousands of readers like you, Guardian Australia has grown and
            is now read by one in three people. Your support has helped us deliver our independent
            quality journalism when it’s never been so vital. And you’ve helped us remain open to
            everyone.
        </p>
        <p className={messagePartTwo}>
            Right now, you can help us grow our community even further in Australia. To reach our
            ambitious goal of 150,000 supporters, we hope you will champion our mission and
            encourage more people to read and support our work. Your support has an impact – and so
            does your voice. Thank you.
        </p>
    </div>
);

const messageNonSupporter = (
    <div>
        <p className={message}>
            One in three people in Australia read the Guardian in the last year. We need to keep
            growing our readership and gaining your financial support so we can provide high
            quality, independent journalism that’s open to everyone. Now more than ever, we all
            deserve access to factual information, and to trust the stories we read.
        </p>
        <p className={messagePartTwo}>
            Right now, you can help us grow our community in Australia. To reach our ambitious goal
            of 150,000 supporters, we hope more readers like you will support us for the first time,
            and shareour work widely. Your support has an impact – and so does your voice. Thank
            you.
        </p>
    </div>
);

const socialShare = (
    <div className={ctaContainer}>
        <Button className={cta} icon={<FacebookLogoSvg />} size="small"></Button>

        <Button className={cta} icon={<TwitterLogoSvg />} size="small"></Button>

        <Button className={cta} icon={<EnvelopeSvg />} size="small"></Button>
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
);

const support = (
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
);

export const AusMomentContributionsBanner: React.FC<BannerProps> = ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    tracking,
    isSupporter,
    tickerSettings,
}: BannerProps) => {
    if (!(tickerSettings && tickerSettings.tickerData)) {
        return null;
    }

    const [showBanner, closeBanner] = useState(true);
    const [supporters, setSupporters] = useState(120_000);

    const totalSupporters = tickerSettings.tickerData.total;
    const supportersGoal = tickerSettings.tickerData.goal;

    const animationDurationInMS = 2000;
    const [animationStartTime, _] = useState(Date.now());

    const getSupportersForAnimation = (): number => {
        const elapsedTimeInMS = Math.min(Date.now() - animationStartTime, animationDurationInMS);
        const percentageCompleted = elapsedTimeInMS / animationDurationInMS;

        return startingAmt * (1 - percentageCompleted) + totalSupporters * percentageCompleted;
    };

    useEffect(() => {
        if (supporters < totalSupporters) {
            window.requestAnimationFrame(() => {
                setSupporters(getSupportersForAnimation());
            });
        }
    }, [supporters, totalSupporters]);

    const percentage = calculatePercentage(totalSupporters);

    return (
        <>
            {showBanner ? (
                <section className={banner(supporters)}>
                    <div className={sunSVGContainer}>
                        <svg className={sunSVG} viewBox="0 0 1300 230">
                            {/* wide */}
                            <circle
                                className={outerCircleWide}
                                cx="50%"
                                cy="90%"
                                r="45%"
                                fill="currentColor"
                            />
                            <circle
                                className={innnerCircleWide(percentage)}
                                cx="50%"
                                cy="90%"
                                r="45%"
                                fill="currentColor"
                            />
                            {/* desktop */}
                            <circle
                                className={outerCircleDesktop}
                                cx="50%"
                                cy="90%"
                                r="55%"
                                fill="currentColor"
                            />
                            <circle
                                className={innnerCircleDesktop(percentage)}
                                cx="50%"
                                cy="90%"
                                r="55%"
                                fill="currentColor"
                            />
                            {/* tablet */}
                            <circle
                                className={outerCircleTablet}
                                cx="50%"
                                cy="120%"
                                r="55%"
                                fill="currentColor"
                            />
                            <circle
                                className={innnerCircleTablet(percentage)}
                                cx="50%"
                                cy="120%"
                                r="55%"
                                fill="currentColor"
                            />
                            {/* mobile */}
                            <circle
                                className={outerCircleMobile}
                                cx="50%"
                                cy="250%"
                                r="65%"
                                fill="currentColor"
                            />
                            <circle
                                className={innnerCircleMobile(percentage)}
                                cx="50%"
                                cy="250%"
                                r="65%"
                                fill="currentColor"
                            />
                        </svg>
                    </div>
                    <div className={contentContainer}>
                        <div className={topContentContainer}>
                            <div className={actualNumber}>
                                <p className={actualNumberFigure}>{supporters.toLocaleString()}</p>
                                <p className={textUnderNumber}>supporters in Australia</p>
                            </div>
                            <div className={goal}>
                                <p className={goalNumber}>{supportersGoal}</p>
                                <p className={goalText}>our goal</p>
                            </div>
                            <div>
                                <button
                                    onClick={(): void => {
                                        setContributionsBannerClosedTimestamp();
                                        closeBanner(false);
                                    }}
                                    className={closeButton}
                                    aria-label="Close"
                                >
                                    <Close />
                                </button>
                            </div>
                        </div>

                        <div className={svgAndBottomContentContainer}>
                            <div className={horizonContainer}>
                                <svg
                                    className={horizon}
                                    width="1300"
                                    height="19"
                                    viewBox="0 0 1300 19"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M-1 10.1209L61.7913 0H95.2198H151.687L225.243 15H450.736V14.7865L622.72 5.93066H714.28H868.941L1008.16 15H1191.58V14.8651L1254.37 4.74414H1287.8H1300V15H1301V246H0V18.9767H-1V10.1209Z"
                                    />
                                </svg>
                            </div>
                            <div className={bottomContentContainer}>
                                <div className={headingAndCta}>
                                    <h3 className={heading}>
                                        {isSupporter
                                            ? 'Help us reach more people across Australia'
                                            : 'Our supporters are doing something powerful'}
                                    </h3>
                                    <div className={mobileMessage}>
                                        <ExpandableText
                                            text={
                                                isSupporter ? messageSupporter : messageNonSupporter
                                            }
                                            initialHeight={58}
                                        />
                                    </div>
                                    {isSupporter ? socialShare : support}
                                </div>

                                <div className={messageContainer}>
                                    {isSupporter ? messageSupporter : messageNonSupporter}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ) : null}
        </>
    );
};
