import React, { useEffect, useMemo, useState } from 'react';
import { ThemeProvider, css } from '@emotion/react';
import { brandAlt, brandText, space } from '@guardian/src-foundations';
import { headline } from '@guardian/src-foundations/typography';
import { LinkButton, buttonBrand } from '@guardian/src-button';
import { Hide } from '@guardian/src-layout';
import { HeaderRenderProps, headerWrapper, validatedHeaderWrapper } from './HeaderWrapper';

const FADE_TIME_MS = 300;
const REST_TIME_MS = 1500;

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

const transisitionable = css`
    transition: opacity 150ms linear;
    opacity: 0;
`;

const entering = css`
    opacity: 1;
`;

// TODO: find alternative to hardcoding benefits
const BENEFITS = ['Ad free', 'Fewer interruptions', 'Newsletters and comments'];

// TODO: fix conflict between IDE prettier and ESLint prettier
// eslint-disable-next-line prettier/prettier
const SignInPromptHeader: React.FC<HeaderRenderProps> = props => {
    const { heading, subheading, primaryCta } = props.content;
    const [benefitIndex, setBenefitIndex] = useState(-1);
    const [transitionState, setTransitionState] = useState<'entering' | 'rest' | 'exiting'>('rest');
    const benefitText = useMemo(() => BENEFITS[benefitIndex], [benefitIndex]);
    const bulletCSS = [bulletStyles, transisitionable];

    if (transitionState === 'entering') {
        bulletCSS.push(entering);
    }

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;

        if (benefitIndex === -1) {
            setBenefitIndex(0);
        } else {
            setTransitionState('entering');
        }

        if (benefitIndex < BENEFITS.length - 1) {
            timeout = setTimeout(() => {
                setTransitionState('exiting');
            }, FADE_TIME_MS + REST_TIME_MS);
            timeout = setTimeout(() => {
                setBenefitIndex(benefitIndex + 1);
            }, FADE_TIME_MS * 2 + REST_TIME_MS);
        }

        () => {
            clearTimeout(timeout);
        };
    }, [benefitIndex]);

    return (
        <Hide below="mobileLandscape">
            <div>
                <h2 css={headingStyles}>{heading}</h2>
                <h3 css={subHeadingStyles}>{subheading}</h3>

                {/* TODO implement animation, and possibly avoid hardcoding text */}
                <div css={bulletCSS}>
                    <span css={bulletPoint} />
                    <span css={bulletTextStyles}>{benefitText}</span>
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
