import React, { useEffect, useRef, useState } from 'react';
import { css } from 'emotion';
import { body, headline, textSans } from '@guardian/src-foundations/typography';
import { neutral, opinion } from '@guardian/src-foundations/palette';
import { from, until } from '@guardian/src-foundations/mq';
import { space } from '@guardian/src-foundations';
import { BannerProps } from '../Banner';
import { setContributionsBannerClosedTimestamp } from './localStorage';
import { BannerTracking } from '../../BannerTypes';
import { SocialLinks } from './social-links';
import { SvgClose } from '@guardian/src-icons';
import SunriseBackground from './SunriseBackground';
import { useWindowSize } from './useWindowSize';

const targetIncrease = 30_000;
const startingAmt = 120_000;

const calculatePercentage = (supporters: number): number => {
    const startToCurrentDiff = Math.min(Math.max(supporters - startingAmt, 0), targetIncrease);
    return startToCurrentDiff / targetIncrease;
};

const banner = css`
    width: 100%;
    margin: 0;
    padding: 0;
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 460px;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    }
    ${from.tablet} {
        height: 420px;
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
    height: 100%;
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
    padding-top: 125px;
    ${from.tablet} {
        padding-top: 100px;
    }
    ${from.desktop} {
        padding-top: 85px;
    }
`;

const actualNumberFigure = css`
    ${headline.medium({ fontWeight: 'bold' })};
    font-size: 34px;
    ${from.phablet} {
        font-size: 54px;
    }
    margin: 0;
`;

const textUnderNumber = css`
    ${body.medium({ fontStyle: 'italic' })};
    font-size: 12px;
    ${from.phablet} {
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
        bottom: 50px;
        right: ${space[24]}px;
    }
`;

const goalNumber = css`
    ${headline.small({ fontWeight: 'bold' })};
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
        &:before {
            content: 'our ';
        }
    }
`;

const svgAndBottomContentContainer = css`
    position: absolute;
    bottom: 0;
    display: flex;
    align-items: stretch;
    flex-grow: 1;
    flex-direction: column;
`;

const horizonContainer = css`
    margin: 0;
    padding: 0;
    width: 100% !important;
    height: 19px;
`;

const horizon = css`
    margin: 0;
    padding: 0;
`;

const horizonSvg = (
    <svg
        className={horizon}
        viewBox="0 0 1300 19"
        preserveAspectRatio="none"
        fill="${neutral[7]}"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M-1 10.1209L61.7913 0H95.2198H151.687L225.243 15H450.736V14.7865L622.72 5.93066H714.28H868.941L1008.16 15H1191.58V14.8651L1254.37 4.74414H1287.8H1300V15H1301V246H0V18.9767H-1V10.1209Z"
        />
    </svg>
);

const bottomContentContainer = css`
    min-height: 100%;
    display: flex;
    flex: 1;
    justify-content: space-between;
    margin-top: -6px;
    box-sizing: border-box;
    background-color: ${neutral[7]};
    width: 100%;
    height: 100%;
    padding: ${space[3]}px;

    ${from.tablet} {
        padding: 0 ${space[5]}px ${space[4]}px;
    }

    ${from.wide} {
        padding: 0 ${space[24]}px ${space[4]}px;
    }
`;

const headingAndCta = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: ${space[4]}px 0 0 0;
    margin: 0 ${space[3]}px 0 0;
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
    ${headline.small({ fontWeight: 'bold' })};
    font-size: 24px;

    ${from.phablet} {
        font-size: 24px;
    }

    ${from.tablet} {
        font-size: 26px;
    }

    ${from.desktop} {
        font-size: 38px;
    }
`;

const mobileMessageContainer = css`
    ${from.tablet} {
        display: none;
    }
`;

const mobileMessage = (isExpanded: boolean = false): string => {
    if (isExpanded) {
        return css`
            display: block;
            ${from.tablet} {
                display: none;
            }
        `;
    } else {
        return css`
            overflow: hidden;
            max-height: 55px;
            display: block;
            ${from.tablet} {
                display: none;
            }
        `;
    }
};

const ctaContainer = css`
    display: flex;
    padding: 0;
    margin: 0;
    max-height: 40px;
    ${from.tablet} {
        padding-bottom: ${space[4]}px;
        margin-top: ${space[4]}px;
        align-items: flex-start;
        flex-direction: column;
        max-height: auto;
    }
    ${from.desktop} {
        padding-bottom: ${space[4]}px;
        margin-top: ${space[6]}px;
        align-items: center;
        flex-direction: row;
        max-height: auto;
    }
`;

const readMore = css`
    ${until.tablet} {
        margin-top: ${space[1] * 0.75}px;
        margin-bottom: ${space[4] * 1.5}px;
    }
    padding-bottom: 0;
    display: inline-block;
    cursor: pointer;
    color: ${neutral[86]};
    ${body.medium()};
    border-bottom: 1px solid ${neutral[86]};
`;

const button = css`
    text-decoration: none;
    cursor: pointer;
    text-align: center;
    border-radius: 20px;
    color: ${neutral[100]};
    font-family: 'Guardian Text Sans', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    padding: 5px 20px;
    line-height: 30px;
    background-color: ${opinion[400]};
    box-sizing: border-box;
    &:hover {
        background-color: ${opinion[300]};
    }
`;

const hearFromOurEditor = css`
    margin-left: ${space[4]}px;
    color: ${neutral[86]};
    ${textSans.medium()};
    display: none;
    ${from.desktop} {
        display: block;
    }
    text-decoration: underline;
`;

const shareYourSupport = css`
    margin-left: ${space[4]}px;
    color: ${neutral[86]};
    ${textSans.medium()};
    ${from.tablet} {
        margin: 0;
    }
    ${from.desktop} {
        margin-left: ${space[4]}px;
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

const chevron = css`
    position: relative;
    top: 5px;
    padding-left: 4px;
`;

const message = css`
    overflow: hidden;
    display: none;
    max-height: 70px;
    ${from.tablet} {
        max-height: 130px;
        display: block;
    }
    ${from.wide} {
        max-height: 180px;
    }
`;

const messageExpanded = css`
    display: none;
    ${from.tablet} {
        display: block;
    }
`;

const messageText = css`
    ${body.small()};
    color: ${neutral[97]};
    line-height: 125%;

    p:first-child {
        margin-top: 1em;
        margin-bottom: 1em;
    }
`;

const chevronUp = (
    <svg
        className={chevron}
        viewBox="0 0 30 30"
        xmlns="http://www.w3.org/2000/svg"
        height="20px"
        width="20px"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 9.95L14.45 20.4H15.45L25.8999 9.95L24.9249 9L14.95 17.4L4.975 9L4 9.95Z"
            fill={neutral[86]}
        />
    </svg>
);

const chevronDown = (
    <svg
        className={chevron}
        viewBox="0 0 30 30"
        xmlns="http://www.w3.org/2000/svg"
        height="20px"
        width="20px"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M25.8999 19.45L15.45 9H14.45L4 19.45L4.975 20.4L14.95 12L24.9249 20.4L25.8999 19.45Z"
            fill={neutral[86]}
        />
    </svg>
);

const messageSupporter = (
    <div className={messageText}>
        <p>
            Thanks to the support of thousands of readers like you, Guardian Australia has grown and
            is now read by one in three people. Your support has helped us deliver our independent
            quality journalism when it’s never been so vital. And you’ve helped us remain open to
            everyone.
        </p>
        <p>
            Right now, you can help us grow our community even further in Australia. To reach our
            ambitious goal of 150,000 supporters, we hope you will champion our mission and
            encourage more people to read and support our work. Your support has an impact – and so
            does your voice. Thank you.
        </p>
    </div>
);

const messageNonSupporter = (
    <div className={messageText}>
        <p>
            One in three people in Australia read the Guardian in the last year. We need to keep
            growing our readership and gaining your financial support so we can provide high
            quality, independent journalism that’s open to everyone. Now more than ever, we all
            deserve access to factual information, and to trust the stories we read.
        </p>
        <p>
            Right now, you can help us grow our community in Australia. To reach our ambitious goal
            of 150,000 supporters, we hope more readers like you will support us for the first time,
            and share our work widely. Your support has an impact – and so does your voice. Thank
            you.
        </p>
    </div>
);

const urlWithTracking = (baseUrl: string, tracking: BannerTracking): string => {
    return `${baseUrl}?acquisitionData=%7B%22source%22%3A%22${tracking.platformId}%22%2C%22componentType%22%3A%22ACQUISITIONS_ENGAGEMENT_BANNER%22%2C%22componentId%22%3A%22${tracking.campaignCode}%22%2C%22campaignCode%22%3A%22${tracking.campaignCode}%22%7D&INTCMP=${tracking.campaignCode}}`;
};

const socialShare = (): JSX.Element => {
    return (
        <div className={ctaContainer}>
            <SocialLinks />
            <p className={shareYourSupport}>Share your support</p>
        </div>
    );
};

const support = (tracking: BannerTracking): JSX.Element => {
    const supportTheGuardianUrl = urlWithTracking(
        'https://support.theguardian.com/contribute',
        tracking,
    );
    const hearFromOurEditorUrl =
        'https://www.theguardian.com/media/commentisfree/2020/jun/23/information-can-save-lives-help-guardian-australia-reach-150000-supporters';
    return (
        <div className={ctaContainer}>
            <a className={button} href={supportTheGuardianUrl}>
                Support the Guardian
            </a>
            <a className={hearFromOurEditor} href={hearFromOurEditorUrl}>
                Hear from our editor
            </a>
        </div>
    );
};

export const AusMomentContributionsBanner: React.FC<BannerProps> = ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    tracking,
    isSupporter,
    tickerSettings,
}: BannerProps) => {
    if (!(tickerSettings && tickerSettings.tickerData)) {
        return null;
    }
    useWindowSize();
    const [showBanner, closeBanner] = useState(true);
    const [supporters, setSupporters] = useState(120_000);
    const [overflowing, setOverflowing] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const messageElement = useRef(null);

    const totalSupporters = tickerSettings.tickerData.total;
    const supportersGoal = tickerSettings.tickerData.goal;

    const animationDurationInMS = 2000;
    const [animationStartTime, ,] = useState(Date.now());

    const toggleReadMore = (): void => {
        setExpanded(!expanded);
    };

    const getSupportersForAnimation = (): number => {
        const elapsedTimeInMS = Math.min(Date.now() - animationStartTime, animationDurationInMS);
        const percentageCompleted = elapsedTimeInMS / animationDurationInMS;

        return Math.floor(
            startingAmt * (1 - percentageCompleted) + totalSupporters * percentageCompleted,
        );
    };

    useEffect(() => {
        if (supporters < totalSupporters) {
            window.requestAnimationFrame(() => {
                setSupporters(getSupportersForAnimation());
            });
        }
    }, [supporters, totalSupporters]);

    const messageIsOverflowing = (): boolean => {
        const message = document.querySelector('#message');
        return message
            ? message.scrollHeight > message.clientHeight ||
                  message.scrollWidth > message.clientWidth
            : false;
    };

    useEffect(() => {
        setOverflowing(messageIsOverflowing());
    });

    const percentage = calculatePercentage(totalSupporters);

    return (
        <>
            {showBanner ? (
                <section className={banner}>
                    <div className={contentContainer}>
                        <SunriseBackground percentage={percentage} />
                        <div className={topContentContainer}>
                            <div className={actualNumber}>
                                <p className={actualNumberFigure}>{supporters.toLocaleString()}</p>
                                <p className={textUnderNumber}>supporters in Australia</p>
                            </div>
                            <div className={goal}>
                                <p className={goalNumber}>{supportersGoal.toLocaleString()}</p>
                                <p className={goalText}>goal</p>
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
                                    <SvgClose />
                                </button>
                            </div>
                        </div>

                        <div className={svgAndBottomContentContainer}>
                            <div className={horizonContainer}>{horizonSvg}</div>
                            <div className={bottomContentContainer}>
                                <div className={headingAndCta}>
                                    <h3 id="heading" className={heading}>
                                        {isSupporter
                                            ? 'Help us reach more people across Australia'
                                            : 'Our supporters are doing something powerful'}
                                    </h3>
                                    <div className={mobileMessageContainer}>
                                        <div className={mobileMessage(expanded)}>
                                            {isSupporter ? messageSupporter : messageNonSupporter}
                                        </div>
                                        <p onClick={toggleReadMore} className={readMore}>
                                            Read {expanded ? 'less' : 'more'}
                                            {expanded ? chevronUp : chevronDown}
                                        </p>
                                    </div>
                                    {isSupporter ? socialShare() : support(tracking)}
                                </div>

                                <div className={messageContainer}>
                                    <div
                                        ref={messageElement}
                                        id="message"
                                        className={expanded ? messageExpanded : message}
                                    >
                                        {isSupporter ? messageSupporter : messageNonSupporter}
                                    </div>
                                    {(overflowing || expanded) && (
                                        <p onClick={toggleReadMore} className={readMore}>
                                            Read {expanded ? 'less' : 'more'}
                                            {expanded ? chevronUp : chevronDown}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ) : null}
        </>
    );
};
