import React from 'react';
import { css } from '@emotion/core';
import { brandAlt, brandText } from '@guardian/src-foundations';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { LinkButton, buttonReaderRevenueBrand } from '@guardian/src-button';
import { ThemeProvider } from '@emotion/react';
import { SvgArrowRightStraight } from '@guardian/src-icons';
import { HeaderRenderProps, headerWrapper } from './HeaderWrapper';
import { background } from '@guardian/src-foundations/palette';
import useNumberOfSupporters from '../../../hooks/useNumberOfSupporters';

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

const Header: React.FC<HeaderRenderProps> = (props: HeaderRenderProps) => {
    const { heading, primaryCta } = props.content;

    const numberOfSupporters = useNumberOfSupporters();

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
        </div>
    );
};

const wrapped = headerWrapper(Header);
export { wrapped as Header };
