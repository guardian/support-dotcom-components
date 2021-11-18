import React from 'react';
import { css } from '@emotion/core';
import { from } from '@guardian/src-foundations/mq';
import { brandAlt, brandText } from '@guardian/src-foundations';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { LinkButton, buttonReaderRevenueBrand } from '@guardian/src-button';
import { Hide } from '@guardian/src-layout';
import { ThemeProvider } from '@emotion/react';
import { SvgArrowRightStraight } from '@guardian/src-icons';
import { HeaderRenderProps, headerWrapper } from './HeaderWrapper';
import { Link } from '@guardian/src-link';

const messageStyles = (isThankYouMessage: boolean) => css`
    color: ${brandAlt[400]};
    ${headline.xxsmall({ fontWeight: 'bold' })};
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

const mobileLinkStyles = css`
    &,
    &:hover {
        color: ${brandAlt[400]};
        line-height: 1.15;
    }
`;

const subMessageStyles = css`
    color: ${brandText.primary};
    ${textSans.medium()};
    margin: 5px 0;
`;

const Header: React.FC<HeaderRenderProps> = (props: HeaderRenderProps) => {
    const { heading, subheading, primaryCta, secondaryCta } = props.content;

    return (
        <div>
            <Hide below="tablet">
                <div css={messageStyles(false)}>
                    <span>{heading}</span>
                </div>

                <div css={subMessageStyles}>
                    <div>{subheading}</div>
                </div>
            </Hide>

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
                    <Hide above="tablet">
                        <Link priority="primary" href={primaryCta.ctaUrl} css={mobileLinkStyles}>
                            Make a year-end gift
                        </Link>
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
