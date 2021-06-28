import React from 'react';
import { css } from '@emotion/core';
import { brandAlt, brandText, space } from '@guardian/src-foundations';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { LinkButton, buttonReaderRevenueBrand } from '@guardian/src-button';
import { ThemeProvider } from '@emotion/react';
import { SvgArrowRightStraight } from '@guardian/src-icons';
import { Link } from '@guardian/src-link';
import { from, until } from '@guardian/src-foundations/mq';
import { Hide } from '@guardian/src-layout';
import { HeaderRenderProps, headerWrapper } from './HeaderWrapper';
import useNumberOfSupporters from '../../../hooks/useNumberOfSupporters';

const ausMomentHeadingStyles = css`
    ${from.mobileMedium} {
        ${textSans.xsmall({ fontWeight: 'bold' })}
        color: ${brandAlt[400]};
    }
    ${from.tablet} {
        ${headline.xsmall({ fontWeight: 'bold' })}
    }

    ${from.desktop} {
        ${headline.medium({ fontWeight: 'bold' })}
    }
`;

const ausMomentSubheadingStyles = css`
    ${textSans.small()};
    color: ${brandText.primary};
    margin-bottom: ${space[1]}px;
    line-height: 1.15;

    ${from.desktop} {
        ${textSans.medium()};
    }
`;

const headerYellowHighlight = css`
    color: ${brandAlt[400]};
    font-weight: 700;
    margin-bottom: 5px 0;
`;

const mobileCtaStyles = css`
    ${until.mobileMedium} {
        display: none;
    }

    ${textSans.xxsmall()}
    color: ${brandAlt[400]};
`;

const linkStyles = css`
    height: 24px;
    min-height: 24px;
    ${textSans.small({ fontWeight: 'bold' })};
    border-radius: 16px;
    padding: 0 ${space[3]}px;
    margin-right: 10px;
    margin-bottom: 6px;

    ${from.desktop} {
        ${textSans.medium({ fontWeight: 'bold' })};
        height: 36px;
        min-height: 36px;
        padding: 0 ${space[4]}px;
        border-radius: 36px;
    }

    svg {
        width: 24px;
    }
`;

const Header: React.FC<HeaderRenderProps> = (props: HeaderRenderProps) => {
    const { heading, primaryCta, secondaryCta } = props.content;

    const numberOfSupporters = useNumberOfSupporters();

    return (
        <div>
            <Hide below="tablet">
                <div>
                    <div css={ausMomentHeadingStyles}>{heading}</div>
                </div>
                <div>
                    <div css={ausMomentSubheadingStyles}>
                        Join <span css={headerYellowHighlight}>{numberOfSupporters} </span>
                        supporters in Australia
                    </div>
                </div>

                {primaryCta && (
                    <>
                        <Hide below="tablet">
                            <ThemeProvider theme={buttonReaderRevenueBrand}>
                                <LinkButton
                                    priority="primary"
                                    href={primaryCta.ctaUrl}
                                    icon={<SvgArrowRightStraight />}
                                    iconSide="right"
                                    nudgeIcon={true}
                                    size="xsmall"
                                    css={linkStyles}
                                >
                                    {primaryCta.ctaText}
                                </LinkButton>
                            </ThemeProvider>
                        </Hide>
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
                            size="xsmall"
                            css={linkStyles}
                        >
                            {secondaryCta.ctaText}
                        </LinkButton>
                    </ThemeProvider>
                )}
            </Hide>

            <Hide above="tablet">
                <div>
                    <Link
                        href="http://support.theguardian.com/contribute"
                        cssOverrides={mobileCtaStyles}
                    >
                        Join {numberOfSupporters} supporters in Australia
                    </Link>
                </div>
            </Hide>
        </div>
    );
};

const wrapped = headerWrapper(Header);
export { wrapped as Header };
