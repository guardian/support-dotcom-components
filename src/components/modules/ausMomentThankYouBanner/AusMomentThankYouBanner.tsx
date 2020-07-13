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
`;

const sunSvgAndMessagesContainer = css`
    height: 260px;
    overflow: hidden;
`;

const slideUpContainer = css`
    position: relative;
    transition: transform 0.5s ease-in-out;
`;

const slideUpContainerExpanded = css`
    ${slideUpContainer}
    transform: translateY(-35%);
`;

const sunSvg = css`
    display: block;
`;

const sunSvgBackground = css`
    color: ${opinion[500]};
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
    margin-top: -${space[12]}px;
    color: ${neutral[7]};
    padding: 0 ${space[3]}px;
`;

const thankYouMessageMainHeader = css`
    ${headline.xsmall()}
    font-weight: bold;
`;

const thankYouMessageMainBody = css`
    ${body.small()}
    margin-top: ${space[1]}px;
    height: 160px;
    overflow: hidden;
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
    display: flex;
    width: 16px;
    transition: transform 0.5s ease-in-out;
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
                        <rect
                            className={sunSvgBackground}
                            height="40"
                            width="32"
                            fill="currentColor"
                        />
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
                            Thank you to all who support us financially, and more than 10,000 who
                            have joined for the first time this month. We’ve surpassed our ambitious
                            goal and grown our support in Australia. In these challenging times, we
                            all need a strong community. Reader support powers our work – it helps
                            us provide independent, quality journalism every day. You enable us to
                            remain open to everyone around the world. To reach even further, we hope
                            you will champion our mission. Your support has an impact – and so does
                            your voice. In these unsettling times, we all need a strong community.
                            More of you are reading, supporting and sharing our work than ever
                            before. The Guardian will remain with you, providing reliable,
                            independent, high quality reporting. Your support means we can keep our
                            journalism open to everyone, with no exception. Your support has an
                            impact, and so does your voice. Together we can help independent
                            journalism flourish in Australia for the years to come. Thank you.
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
