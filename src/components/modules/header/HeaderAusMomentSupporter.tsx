import React from 'react';
import { css } from '@emotion/core';
import { from, until } from '@guardian/src-foundations/mq';
import { brandAlt, brandText, space } from '@guardian/src-foundations';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { LinkButton, buttonReaderRevenueBrand } from '@guardian/src-button';
import { ThemeProvider } from '@emotion/react';
import { SvgArrowRightStraight } from '@guardian/src-icons';
import { HeaderRenderProps, headerWrapper } from './HeaderWrapper';
import { Link } from '@guardian/src-link';
import { Hide } from '@guardian/src-layout';
import useNumberOfSupporters from '../../../hooks/useNumberOfSupporters';

const ausMomentHeadingStyles = css`
    ${until.mobileMedium} {
        display: none;
    }

    ${from.mobileMedium} {
        ${textSans.xsmall({ fontWeight: 'bold' })};
        color: ${brandAlt[400]};
    }

    ${from.tablet} {
        ${headline.xxsmall({ fontWeight: 'bold' })}
    }

    ${from.desktop} {
        ${headline.medium({ fontWeight: 'bold' })}
    }
`;

const ausMomentSubheadingStyles = css`
    ${textSans.medium()};
    color: ${brandText.primary};
`;

const ctaStyles = css`
    /* ${textSans.small({ fontWeight: 'bold' })}; */
    margin-top: ${space[2]}px;
`;

const headerYellowHighlight = css`
    color: ${brandAlt[400]};
    font-weight: 700;
    margin: 5px 0;
`;

const mobileSubheadingStyles = css`
    ${until.mobileMedium} {
        display: none;
    }

    ${textSans.xxsmall()}
    color: ${brandAlt[400]};
`;

const ausMapLinkStyles = css`
    color: ${brandText.primary};
`;

const Header: React.FC<HeaderRenderProps> = (props: HeaderRenderProps) => {
    const { heading, primaryCta } = props.content;

    const numberOfSupporters = useNumberOfSupporters();

    return (
        <div>
            <div>
                <div css={ausMomentHeadingStyles}>{heading}</div>
            </div>
            <Hide below="tablet">
                <div>
                    <div css={ausMomentSubheadingStyles}>
                        You&apos;re one of{' '}
                        <Link
                            href="https://support.theguardian.com/aus-map?INTCMP"
                            css={ausMapLinkStyles}
                        >
                            <span css={headerYellowHighlight}>{numberOfSupporters} </span>
                            supporters in Australia
                        </Link>
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
                                size="small"
                                cssOverrides={ctaStyles}
                            >
                                {primaryCta.ctaText}
                            </LinkButton>
                        </ThemeProvider>
                    </>
                )}
            </Hide>
            <Hide above="tablet">
                <div>
                    <Link
                        href="http://support.theguardian.com/contribute"
                        css={mobileSubheadingStyles}
                    >
                        Support us again
                    </Link>
                </div>
            </Hide>
        </div>
    );
};

const wrapped = headerWrapper(Header);
export { wrapped as Header };
