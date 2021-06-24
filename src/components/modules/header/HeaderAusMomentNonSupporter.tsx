import React from 'react';
import { css } from '@emotion/core';
import { brandAlt, brandText } from '@guardian/src-foundations';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { LinkButton, buttonReaderRevenueBrand } from '@guardian/src-button';
import { ThemeProvider } from '@emotion/react';
import { SvgArrowRightStraight } from '@guardian/src-icons';
import { Link } from '@guardian/src-link';
import { from } from '@guardian/src-foundations/mq';
import { Hide } from '@guardian/src-layout';
import { HeaderRenderProps, headerWrapper } from './HeaderWrapper';
import useNumberOfSupporters from '../../../hooks/useNumberOfSupporters';

const ausMomentHeadingStyles = css`
    ${headline.medium({ fontWeight: 'bold' })}
    color: ${brandAlt[400]};
`;

const ausMomentSubheadingStyles = css`
    ${textSans.small()};
    color: ${brandAlt[400]};
    margin-bottom: 5px;

    ${from.tablet} {
        ${textSans.medium()};
        color: ${brandText.primary};
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

const headerYellowHighlight = css`
    color: ${brandAlt[400]};
    font-weight: 700;
    margin: 5px 0;
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
                            css={linkStyles}
                        >
                            {secondaryCta.ctaText}
                        </LinkButton>
                    </ThemeProvider>
                )}
            </Hide>

            <Hide above="tablet">
                <div>
                    <Link cssOverrides={ausMomentSubheadingStyles}>
                        Join {numberOfSupporters} supporters in Australia
                    </Link>
                </div>
            </Hide>
        </div>
    );
};

const wrapped = headerWrapper(Header);
export { wrapped as Header };
