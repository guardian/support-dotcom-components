import React from 'react';
import { css } from '@emotion/core';
import { from } from '@guardian/src-foundations/mq';
import { brandAlt, brandText } from '@guardian/src-foundations';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { LinkButton, buttonReaderRevenueBrand } from '@guardian/src-button';
import { ThemeProvider } from '@emotion/react';
import { SvgArrowRightStraight } from '@guardian/src-icons';
import { HeaderRenderProps, headerWrapper } from './HeaderWrapper';
import { Link } from '@guardian/src-link';
import { Hide } from '@guardian/src-layout';
import useNumberOfSupporters from '../../../hooks/useNumberOfSupporters';

const ausMomentHeadingStyles = css`
    ${textSans.medium({ fontWeight: 'bold' })};
    color: ${brandAlt[400]};

    ${from.tablet} {
        ${headline.medium({ fontWeight: 'bold' })}
    }
`;

const ausMomentSubheadingStyles = css`
    ${textSans.medium()};
    color: ${brandText.primary};
    margin-bottom: 5px;
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

    svg {
        width: 24px;
    }
`;

const headerYellowHighlight = css`
    color: ${brandAlt[400]};
    font-weight: 700;
    margin: 5px 0;
`;

const mobileSubheadingStyles = css`
    ${textSans.small()}
    color: ${brandAlt[400]};
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
                        You&apos;re one of the{' '}
                        <u>
                            <span css={headerYellowHighlight}>{numberOfSupporters} </span>
                            supporters in Australia
                        </u>
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
