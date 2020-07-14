import React, { useState } from 'react';
import { css } from 'emotion';
import { neutral, opinion, brandAlt } from '@guardian/src-foundations/palette';
import { headline, body } from '@guardian/src-foundations/typography';
import { space } from '@guardian/src-foundations';
import { Button } from '@guardian/src-button';
import { SvgChevronDownSingle, SvgCross } from '@guardian/src-icons';
import { ThemeProvider } from 'emotion-theming';
import { brandAlt as brandAltTheme } from '@guardian/src-foundations/themes';

const banner = css`
    position: relative;
    background-color: ${opinion[500]};

    @keyframes sun-rise-banner {
        0% {
            background-color: ${opinion[400]};
        }
        100% {
            background-color: ${opinion[500]};
        }
    }

    animation-name: sun-rise-banner;
    animation-duration: 1s;
    animation-timing-function: ease-in-out;
`;

const sunSvgAndMessagesContainer = css`
    overflow: hidden;
`;

const slideUpContainer = css`
    position: relative;
    transition: transform 0.5s ease-in-out;
`;

const slideUpContainerExpanded = css`
    ${slideUpContainer}
    transform: translateY(-140px);
`;

const sunSvg = css`
    display: block;
`;

const sunSvgSun = css`
    @keyframes sun-rise-sun-svg--delay {
        0% {
            transform: translateY(20px);
            opacity: 0;
        }
        100% {
            transform: translateY(20px);
            opacity: 0;
        }
    }

    @keyframes sun-rise-sun-svg {
        0% {
            transform: translateY(20px);
            opacity: 0;
        }
        100% {
            transform: translateY(0);
            opacity: 1;
        }
    }

    animation-name: sun-rise-sun-svg--delay, sun-rise-sun-svg;
    animation-delay: 0s, 0.7s;
    animation-duration: 0.7s, 1.3s;
    animation-timing-function: ease-in-out;
`;

const sunSvgOuterSun = css`
    color: ${brandAlt[200]};
`;

const sunSvgInnerSun = css`
    color: ${brandAlt[400]};
`;

const thankYouMessageInSun = css`
    position: absolute;
    top: 0;
    width: 100%;
    padding-top: 15%;
    color: ${neutral[7]};
    text-align: center;

    @keyframes sun-rise-thank-you--delay {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 0;
        }
    }

    @keyframes sun-rise-thank-you {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    animation-name: sun-rise-thank-you--delay, sun-rise-thank-you;
    animation-delay: 0s, 1.5s;
    animation-duration: 1.5s, 0.5s;
    animation-timing-function: ease-in-out;

    // turn off the opacity animation in ff due to flickering bug
    -moz-animation-name: sun-rise-thank-you--delay;
    -moz-animation-delay: 0s;
    -moz-animation-duration: 2s;
    -moz-animation-timing-function: ease-in-out;
`;

const thankYouMessageInSunThankYou = css`
    ${headline.xsmall()}
    font-size: 15px;
    font-weight: normal;
`;

const thankYouMessageInSunSupportersCount = css`
    ${headline.xsmall()}
    font-weight: bold;
    margin-top: ${space[1]}px;
`;

const thankYouMessageInSunTagLine = css`
    ${body.small()}
    font-size: 12px;
`;

const thankYouMessageMain = css`
    position: relative;
    margin-top: -${space[12]}px;
    color: ${neutral[7]};
    padding: 0 ${space[3]}px;
    z-index: 100;
`;

const thankYouMessageMainHeader = css`
    ${headline.xsmall()}
    font-weight: bold;
    padding-bottom: 28px;
`;

const thankYouMessageMainBody = css`
    position: absolute;
    top: 84px;
    ${body.small()}
    margin-top: ${space[1]}px;
    overflow: hidden;
    height: 160px;
`;

const thankYouMessageMainBodyExpanded = css`
    ${thankYouMessageMainBody}
    overflow-y: scroll;
`;

const closeButtonContainer = css`
    position: absolute;
    top: 0;
    right: 0;
`;

const buttonsContainer = css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 ${space[3]}px ${space[3]}px;
`;

const readMoreButton = css`
    position: relative;
    ${body.small()}
    background: none;
    border: none;
    display: flex;
    align-items: center;
    padding: 0;
    cursor: pointer;

    &:after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        border-bottom: 1px solid #000;
    }
`;

const readMoreButtonText = css`
    width: 80px;
    text-align: start;
`;

const readMoreButtonIconContainer = css`
    transition: transform 0.5s ease-in-out;

    svg {
        display: block;
        width: 16px;
    }
`;

const readMoreButtonIconContainerExpanded = css`
    ${readMoreButtonIconContainer}
    transform: rotate(-180deg);
`;

const ctaButtonContainer = css`
    margin-top: ${space[4]}px;
`;

export const AusMomentThankYouBanner: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className={banner}>
            <div className={sunSvgAndMessagesContainer}>
                <div className={isExpanded ? slideUpContainerExpanded : slideUpContainer}>
                    <svg className={sunSvg} viewBox="0 0 32 20">
                        <g className={sunSvgSun}>
                            <circle
                                className={sunSvgOuterSun}
                                r="9"
                                cx="16"
                                cy="10"
                                fill="currentColor"
                            />
                            <circle
                                className={sunSvgInnerSun}
                                r="8.5"
                                cx="16"
                                cy="10"
                                fill="currentColor"
                            />
                        </g>
                    </svg>
                    <div className={thankYouMessageInSun}>
                        <div className={thankYouMessageInSunThankYou}>Thank you!</div>
                        <div className={thankYouMessageInSunSupportersCount}>177,976</div>
                        <div className={thankYouMessageInSunTagLine}>supporters in Australia</div>
                    </div>
                    <div className={thankYouMessageMain}>
                        <div className={thankYouMessageMainHeader}>
                            <div>Our supporters</div>
                            <div>have done something</div>
                            <div>powerful</div>
                        </div>
                        <div
                            className={
                                isExpanded
                                    ? thankYouMessageMainBodyExpanded
                                    : thankYouMessageMainBody
                            }
                        >
                            <div>
                                Thank you to all who support us financially, including more than
                                10,000 who have just joined us for the first time, and everyone
                                who’s spread the word about our work. We’ve surpassed our ambitious
                                goal and grown our community in Australia.
                            </div>
                            <div>
                                Reader support powers our work – it helps us provide independent,
                                quality journalism every day. You enable us to remain open to
                                everyone. To reach even further, we hope you will champion our
                                mission. Together we can do more.
                            </div>
                        </div>
                    </div>
                </div>
                <div className={closeButtonContainer}>
                    <ThemeProvider theme={brandAltTheme}>
                        <Button icon={<SvgCross />} priority="subdued" />
                    </ThemeProvider>
                </div>
            </div>

            <div className={buttonsContainer}>
                <button className={readMoreButton} onClick={(): void => setIsExpanded(!isExpanded)}>
                    <div className={readMoreButtonText}>
                        {isExpanded ? 'Read less' : 'Read more'}
                    </div>
                    <div
                        className={
                            isExpanded
                                ? readMoreButtonIconContainerExpanded
                                : readMoreButtonIconContainer
                        }
                    >
                        <SvgChevronDownSingle />
                    </div>
                </button>
                <div className={ctaButtonContainer}>
                    <ThemeProvider theme={brandAltTheme}>
                        <Button size="small">Support the Guardian</Button>
                    </ThemeProvider>
                </div>
            </div>
        </div>
    );
};
