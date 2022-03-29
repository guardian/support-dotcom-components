import React from 'react';
import { ThemeProvider, css } from '@emotion/react';
import { brandAlt, brandText, space } from '@guardian/src-foundations';
import { headline } from '@guardian/src-foundations/typography';
import { LinkButton, buttonBrand } from '@guardian/src-button';
import { Hide } from '@guardian/src-layout';
import { HeaderRenderProps, headerWrapper, validatedHeaderWrapper } from './HeaderWrapper';

const headingStyles = () => css`
    color: ${brandText.primary};
    ${headline.xxsmall({ fontWeight: 'bold' })};
    margin: 0;
`;

const subHeadingStyles = css`
    color: ${brandAlt[400]};
    ${headline.xxxsmall({ fontWeight: 'bold' })};
    margin: 0;
`;

const bulletStyles = css`
    margin: ${space[1]}px 0 ${space[2]}px;
`;

const bulletPoint = css`
    display: inline-block;
    background: ${brandAlt[400]};
    width: 13px;
    height: 13px;
    border-radius: 50%;
    margin-right: ${space[2]}px;
`;

const bulletTextStyles = css`
    color: ${brandText.primary};
    ${headline.xxxsmall()};
`;

const SignInPromptHeader: React.FC<HeaderRenderProps> = props => {
    const { heading, subheading, primaryCta } = props.content;

    return (
        <Hide below="mobileLandscape">
            <div>
                <h2 css={headingStyles}>{heading}</h2>
                <h3 css={subHeadingStyles}>{subheading}</h3>

                {/* TODO implement animation, and possibly avoid hardcoding text */}
                <div css={bulletStyles}>
                    <span css={bulletPoint} />
                    <span css={bulletTextStyles}>Ad free</span>
                </div>

                {primaryCta && (
                    <ThemeProvider theme={buttonBrand}>
                        <LinkButton priority="primary" href={primaryCta.ctaUrl} size="xsmall">
                            {primaryCta.ctaText}
                        </LinkButton>
                    </ThemeProvider>
                )}
            </div>
        </Hide>
    );
};

const unvalidated = headerWrapper(SignInPromptHeader);
const validated = validatedHeaderWrapper(SignInPromptHeader);
export { validated as SignInPromptHeader, unvalidated as SignInPromptHeaderUnvalidated };
