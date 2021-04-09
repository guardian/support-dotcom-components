import React from 'react';

import { css } from '@emotion/core';
import { from, until } from '@guardian/src-foundations/mq';
import { brandAlt, brandText } from '@guardian/src-foundations';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { LinkButton, buttonReaderRevenueBrand } from '@guardian/src-button';
import { ThemeProvider } from 'emotion-theming';
import { SvgArrowRightStraight } from '@guardian/src-icons';
import { HeaderProps } from '../../../types/HeaderTypes';
import { addRegionIdAndTrackingParamsToSupportUrl } from '../../../lib/tracking';

const messageStyles = (isThankYouMessage: boolean) => css`
    color: ${brandAlt[400]};
    ${headline.xxsmall({ fontWeight: 'bold' })};
    padding-top: 3px;
    margin-bottom: 3px;

    ${from.desktop} {
        ${headline.xsmall({ fontWeight: 'bold' })}
    }

    ${from.leftCol} {
        ${isThankYouMessage
            ? headline.small({ fontWeight: 'bold' })
            : headline.medium({ fontWeight: 'bold' })}
    }
`;

const linkStyles = css`
    height: 32px;
    min-height: 32px;
    ${textSans.small({ fontWeight: 'bold' })};
    border-radius: 16px;
    padding: 0 12px 0 12px;
    line-height: 18px;
    margin-right: 10px;
    margin-bottom: 6px;

    svg {
        width: 24px;
    }
`;

const hiddenUntilTablet = css`
    ${until.tablet} {
        display: none;
    }
`;

const hiddenFromTablet = css`
    ${from.tablet} {
        display: none;
    }
`;

const subMessageStyles = css`
    color: ${brandText.primary};
    ${textSans.medium()};
    margin: 5px 0;
`;

export const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
    const { heading, subheading, primaryCta, secondaryCta } = props.content;

    const addTracking = (baseUrl: string): string =>
        // Deliberately do not include the countryCode for now, because DCR does not. This will make the initial AB
        // test fair.
        addRegionIdAndTrackingParamsToSupportUrl(baseUrl, props.tracking);
    // addRegionIdAndTrackingParamsToSupportUrl(baseUrl, props.tracking, props.countryCode);

    return (
        <div>
            <div css={hiddenUntilTablet}>
                <div css={messageStyles(false)}>
                    <span>{heading}</span>
                </div>
                <div css={subMessageStyles}>
                    <div>{subheading}</div>
                </div>
                {primaryCta && (
                    <ThemeProvider theme={buttonReaderRevenueBrand}>
                        <LinkButton
                            priority="primary"
                            href={addTracking(primaryCta.url)}
                            icon={<SvgArrowRightStraight />}
                            iconSide="right"
                            nudgeIcon={true}
                            css={linkStyles}
                        >
                            {primaryCta.text}
                        </LinkButton>
                    </ThemeProvider>
                )}
                {secondaryCta && (
                    <ThemeProvider theme={buttonReaderRevenueBrand}>
                        <LinkButton
                            priority="primary"
                            href={addTracking(secondaryCta.url)}
                            icon={<SvgArrowRightStraight />}
                            iconSide="right"
                            nudgeIcon={true}
                            css={linkStyles}
                        >
                            {secondaryCta.text}
                        </LinkButton>
                    </ThemeProvider>
                )}
            </div>

            {primaryCta && (
                <div css={hiddenFromTablet}>
                    <ThemeProvider theme={buttonReaderRevenueBrand}>
                        <LinkButton
                            priority="primary"
                            href={addTracking(primaryCta.url)}
                            css={linkStyles}
                        >
                            {primaryCta.text}
                        </LinkButton>
                    </ThemeProvider>
                </div>
            )}
        </div>
    );
};
