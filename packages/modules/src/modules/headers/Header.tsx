import React from 'react';
import { css } from '@emotion/react';
import { from } from '@guardian/src-foundations/mq';
import { brandAlt, brandText } from '@guardian/src-foundations';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { LinkButton, buttonReaderRevenueBrand } from '@guardian/src-button';
import { Hide } from '@guardian/src-layout';
import { ThemeProvider } from '@emotion/react';
import { SvgArrowRightStraight } from '@guardian/src-icons';
import { HeaderRenderProps, headerWrapper, validatedHeaderWrapper } from './HeaderWrapper';

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

const subMessageStyles = css`
    color: ${brandText.primary};
    ${textSans.medium()};
    margin: 5px 0;
`;

// override user agent styles
const headingStyles = css`
    margin: 0;
    font-size: 100%;
`;

const Header: React.FC<HeaderRenderProps> = (props: HeaderRenderProps) => {
    const { heading, subheading, primaryCta, secondaryCta } = props.content;

    return (
        <div>
            <Hide below="tablet">
                <div css={messageStyles(false)}>
                    <h2 css={headingStyles}>{heading}</h2>
                </div>

                <div css={subMessageStyles}>
                    <div>{subheading}</div>
                </div>
            </Hide>

            {primaryCta && (
                <ThemeProvider theme={buttonReaderRevenueBrand}>
                    <Hide below="mobileLandscape">
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
                    </Hide>

                    <Hide above="mobileLandscape">
                        <LinkButton
                            priority="primary"
                            href={props.mobileContent?.primaryCta?.ctaUrl || primaryCta.ctaUrl}
                            css={linkStyles}
                        >
                            {props.mobileContent?.primaryCta?.ctaText || primaryCta.ctaText}
                        </LinkButton>
                    </Hide>
                </ThemeProvider>
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

const unvalidated = headerWrapper(Header);
const validated = validatedHeaderWrapper(Header);
export { validated as Header, unvalidated as HeaderUnvalidated };