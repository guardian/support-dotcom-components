import React, { useEffect, useMemo, useState } from 'react';
import { ThemeProvider, css } from '@emotion/react';
import { brandAlt, brandText, space } from '@guardian/src-foundations';
import { headline } from '@guardian/src-foundations/typography';
import { LinkButton, buttonBrand } from '@guardian/src-button';
import { Hide } from '@guardian/src-layout';
import { HeaderRenderProps, headerWrapper, validatedHeaderWrapper } from './HeaderWrapper';

const FADE_TIME_MS = 300;
const TEXT_DELAY_MS = 1500;
const ANIMATION_DELAY_MS = 150;
const DOTS_COUNT = 3;

type TransitionState = 'entering' | 'rest' | 'exiting';

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

const benefitsWrapper = css`
    margin: ${space[1]}px 0 10px;
    position: relative;
`;

const benefitStyles = css`
    display: flex;
`;

const dotsWrapper = css`
    position: absolute;
    display: flex;
`;

const dotStyles = css`
    background: ${brandAlt[400]};
    width: 13px;
    height: 13px;
    border-radius: 50%;
    margin-top: 3px;
    margin-right: ${space[2]}px;
`;

const benefitTextStyles = css`
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
    const [benefitTransitionState, setBenefitTransitionState] = useState<TransitionState>('rest');
    const [dotsTransitionState, setDotsTransitionState] = useState(() => {
        const initialState = new Array<TransitionState>(DOTS_COUNT);
        initialState.fill('rest');
        return initialState;
    });
    const benefitText = useMemo(() => BENEFITS[benefitIndex], [benefitIndex]);
    const benefitCss = [benefitStyles, transisitionable];

    if (benefitTransitionState === 'entering') {
        benefitCss.push(entering);
    }

    useEffect(() => {
        const timeouts: ReturnType<typeof setTimeout>[] = [];
        const dotAnimationLength = FADE_TIME_MS + ANIMATION_DELAY_MS;
        const totalDotAnimationLength = dotAnimationLength * DOTS_COUNT;
        const textAnimationStart = totalDotAnimationLength + FADE_TIME_MS + ANIMATION_DELAY_MS;

        if (benefitIndex === -1) {
            setBenefitIndex(0);
        } else {
            for (let i = 0; i < DOTS_COUNT; i++) {
                timeouts.push(
                    setTimeout(() => {
                        setDotsTransitionState(currentState => {
                            const newState = [...currentState];
                            newState.splice(i, 1, 'entering');
                            return newState;
                        });
                    }, i * (FADE_TIME_MS + ANIMATION_DELAY_MS)),
                );
            }

            timeouts.push(
                setTimeout(() => {
                    const newState = new Array(DOTS_COUNT).fill('exiting');
                    setDotsTransitionState(newState);
                }, totalDotAnimationLength),
            );
            timeouts.push(
                setTimeout(() => {
                    setBenefitTransitionState('entering');
                }, textAnimationStart),
            );
        }

        if (benefitIndex < BENEFITS.length - 1) {
            timeouts.push(
                setTimeout(() => {
                    setBenefitTransitionState('exiting');
                }, textAnimationStart + FADE_TIME_MS + TEXT_DELAY_MS),
            );
            timeouts.push(
                setTimeout(() => {
                    setBenefitIndex(benefitIndex + 1);
                }, textAnimationStart + FADE_TIME_MS * 2 + TEXT_DELAY_MS + ANIMATION_DELAY_MS),
            );
        }

        return () => {
            timeouts.forEach(timeout => clearTimeout(timeout));
        };
    }, [benefitIndex]);

    return (
        <Hide below="mobileLandscape">
            <div>
                <h2 css={headingStyles}>{heading}</h2>
                <h3 css={subHeadingStyles}>{subheading}</h3>

                <div css={benefitsWrapper}>
                    <div css={dotsWrapper}>
                        {dotsTransitionState.map((dotTransitionState, index) => {
                            const dotCss = [dotStyles, transisitionable];

                            if (dotTransitionState === 'entering') {
                                dotCss.push(entering);
                            }

                            return <div css={dotCss} key={index} />;
                        })}
                    </div>
                    <div css={benefitCss}>
                        <div css={dotStyles} />
                        <span css={benefitTextStyles}>{benefitText}</span>
                    </div>
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
