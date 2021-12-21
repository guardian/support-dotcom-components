import React from 'react';
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

const supportAgainHeadingStyles = css`
    ${textSans.small({ fontWeight: 'bold' })}
    color: ${brandAlt[400]};
    font-size: 14px;
    margin: 0;

    ${from.tablet} {
        ${headline.xxsmall({ fontWeight: 'bold' })};
    }

    ${from.desktop} {
        ${headline.xsmall({ fontWeight: 'bold' })}
    }

    ${from.leftCol} {
        ${headline.small({ fontWeight: 'bold' })}
    }
`;

const supportAgainSubheadingStyles = css`
    ${textSans.medium()};
    color: ${brandText.primary};
`;

const supportAgainLinkStyles = css`
    font-size: 12px;
`;

const supportAgainButtonStyles = css`
    margin-top: ${space[2]}px;
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

const Header: React.FC<HeaderRenderProps> = (props: HeaderRenderProps) => {
    const { heading, subheading, primaryCta, secondaryCta } = props.content;

    return (
        <div>
            <div>
                <h2 css={supportAgainHeadingStyles}>{heading}</h2>

                <Hide below="tablet">
                    <div css={supportAgainSubheadingStyles}>{subheading}</div>
                </Hide>
            </div>

            {primaryCta && (
                <>
                    <Hide above="tablet">
                        <ThemeProvider theme={linkBrand}>
                            <Link
                                priority="primary"
                                href={primaryCta.ctaUrl}
                                cssOverrides={supportAgainLinkStyles}
                            >
                                {primaryCta.ctaText}
                            </Link>
                        </ThemeProvider>
                    </Hide>

                    <Hide below="tablet">
                        <ThemeProvider theme={buttonReaderRevenueBrand}>
                            <LinkButton
                                priority="primary"
                                href={primaryCta.ctaUrl}
                                icon={<SvgArrowRightStraight />}
                                iconSide="right"
                                nudgeIcon={true}
                                size="xsmall"
                                cssOverrides={supportAgainButtonStyles}
                            >
                                {primaryCta.ctaText}
                            </LinkButton>
                        </ThemeProvider>
                    </Hide>
                </>
            )}

            {secondaryCta && (
                <Hide below="tablet">
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
                </Hide>
            )}
        </div>
    );
};

const wrapped = headerWrapper(Header);
export { wrapped as Header };
