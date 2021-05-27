import React, { useEffect } from 'react';

import { css } from '@emotion/core';
import { from } from '@guardian/src-foundations/mq';
import { brandAlt, brandText } from '@guardian/src-foundations';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { LinkButton, buttonReaderRevenueBrand } from '@guardian/src-button';
import { Hide } from '@guardian/src-layout';
import { ThemeProvider } from '@emotion/react';
import { SvgArrowRightStraight } from '@guardian/src-icons';
import { HeaderProps } from '../../../types/HeaderTypes';
import { addRegionIdAndTrackingParamsToSupportUrl } from '../../../lib/tracking';
import { HasBeenSeen, useHasBeenSeen } from '../../../hooks/useHasBeenSeen';
import { OphanAction } from '../../../types/OphanTypes';

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

const subMessageStyles = css`
    color: ${brandText.primary};
    ${textSans.medium()};
    margin: 5px 0;
`;

export const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
    const { heading, subheading, primaryCta, secondaryCta } = props.content;
    const { abTestName, abTestVariant, componentType, campaignCode } = props.tracking;

    const sendOphanEvent = (action: OphanAction): void =>
        props.submitComponentEvent &&
        props.submitComponentEvent({
            component: {
                componentType,
                id: campaignCode,
                campaignCode,
            },
            action,
            abTest: {
                name: abTestName,
                variant: abTestVariant,
            },
        });

    const [hasBeenSeen, setNode] = useHasBeenSeen(
        {
            threshold: 0,
        },
        true,
    ) as HasBeenSeen;

    useEffect(() => {
        if (hasBeenSeen) {
            sendOphanEvent('VIEW');
        }
    }, [hasBeenSeen]);

    useEffect(() => {
        sendOphanEvent('INSERT');
    }, []);

    const addTracking = (baseUrl: string): string =>
        addRegionIdAndTrackingParamsToSupportUrl(baseUrl, props.tracking, props.countryCode);

    return (
        <div ref={setNode}>
            <Hide below="tablet">
                <div css={messageStyles(false)}>
                    <span>{heading}</span>
                </div>
                <div css={subMessageStyles}>
                    <div>{subheading}</div>
                </div>
            </Hide>
            {primaryCta && (
                <ThemeProvider theme={buttonReaderRevenueBrand}>
                    <Hide below="mobileMedium">
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
                    </Hide>
                    <Hide above="mobileMedium">
                        <LinkButton
                            priority="primary"
                            href={addTracking(primaryCta.url)}
                            css={linkStyles}
                        >
                            {primaryCta.text}
                        </LinkButton>
                    </Hide>
                </ThemeProvider>
            )}
            {secondaryCta && (
                <Hide below="tablet">
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
                </Hide>
            )}
        </div>
    );
};
