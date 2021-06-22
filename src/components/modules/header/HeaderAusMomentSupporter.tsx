import React, { useState, useEffect } from 'react';
import { css } from '@emotion/core';
import { from } from '@guardian/src-foundations/mq';
import { space } from '@guardian/src-foundations';
import { brandAlt, brandText } from '@guardian/src-foundations';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { LinkButton, buttonReaderRevenueBrand } from '@guardian/src-button';
import { Link, linkBrand } from '@guardian/src-link';
import { Hide } from '@guardian/src-layout';
import { ThemeProvider } from '@emotion/react';
import { SvgArrowRightStraight } from '@guardian/src-icons';
import { HeaderRenderProps, headerWrapper } from './HeaderWrapper';
import { background } from '@guardian/src-foundations/palette';
import { fetchTickerData } from '../../../lib/fetchTickerDataClient';
import { TickerCountType, TickerData } from '../../../types/shared';
import { addForMinutes, getCookie } from '../../../lib/cookies';

const ausMomentHeadingStyles = css`
    ${headline.medium({ fontWeight: 'bold' })}
    color: ${brandAlt[400]};
`;

const ausMomentSubheadingStyles = css`
    ${textSans.medium()};
    color: ${brandText.primary};
`;

const linkStyles = css`
    height: 32px;
    min-height: 32px;
    ${textSans.medium({ fontWeight: 'bold' })};
    border-radius: 16px;
    padding: 0 12px 0 12px;
    line-height: 18px;
    margin-right: 10px;
    margin-bottom: 6px;
    background-color: ${background.ctaSecondary};

    &:hover {
        background-color: ${background.ctaSecondaryHover};
    }

    svg {
        width: 24px;
    }
`;

const headerYellowHighlight = css`
    color: ${brandAlt[400]};
    font-weight: 700;
    margin: 5px 0;
`;

const AUS_MOMENT_SUPPORTER_COUNT_COOKIE_NAME = 'gu_aus_moment_supporter_count';

const Header: React.FC<HeaderRenderProps> = (props: HeaderRenderProps) => {
    const { heading, primaryCta, secondaryCta } = props.content;
    const [numberOfSupporters, setNumberOfSupporters] = useState<string>('147,784');

    useEffect(() => {
        const cookieValue = getCookie(AUS_MOMENT_SUPPORTER_COUNT_COOKIE_NAME);

        if (cookieValue) {
            setNumberOfSupporters(cookieValue);
        } else {
            fetchTickerData(TickerCountType.people).then((td: TickerData) => {
                addForMinutes(
                    AUS_MOMENT_SUPPORTER_COUNT_COOKIE_NAME,
                    `${td.total.toLocaleString('en-US')}`,
                    60,
                );
                setNumberOfSupporters(td.total.toLocaleString('en-US'));
            });
        }
    }, []);

    return (
        <div>
            <div>
                <div css={ausMomentHeadingStyles}>{heading}</div>
            </div>
            <div>
                <div css={ausMomentSubheadingStyles}>
                    We&apos;re funded by{' '}
                    <span css={headerYellowHighlight}>{numberOfSupporters} </span>
                    readers across Australia.
                </div>
            </div>

            {primaryCta && (
                <>
                    <ThemeProvider theme={buttonReaderRevenueBrand}>
                        <LinkButton
                            priority="primary"
                            href={primaryCta.ctaUrl}
                            icon={<SvgArrowRightStraight />}
                            iconSide="right"
                            nudgeIcon={true}
                            css={linkStyles}
                        >
                            {primaryCta.ctaText}
                        </LinkButton>
                    </ThemeProvider>
                </>
            )}

            {secondaryCta && (
                <ThemeProvider theme={buttonReaderRevenueBrand}>
                    <LinkButton
                        priority="primary"
                        href={secondaryCta.ctaUrl}
                        icon={<SvgArrowRightStraight />}
                        iconSide="right"
                        nudgeIcon={true}
                        css={linkStyles}
                    >
                        {secondaryCta.ctaText}
                    </LinkButton>
                </ThemeProvider>
            )}
        </div>
    );
};

const wrapped = headerWrapper(Header);
export { wrapped as Header };
