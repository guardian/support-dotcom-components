import React, { useEffect, useMemo, useState } from 'react';
import { ThemeProvider, css } from '@emotion/react';
import { brandAlt, brandText, space } from '@guardian/src-foundations';
import { headline } from '@guardian/src-foundations/typography';
import { LinkButton, buttonBrand } from '@guardian/src-button';
import { Hide } from '@guardian/src-layout';
import { from } from '@guardian/src-foundations/mq';
import { HeaderRenderProps, headerWrapper, validatedHeaderWrapper } from './HeaderWrapper';

const FADE_TIME_MS = 300;
const TEXT_DELAY_MS = 1500;
const ANIMATION_DELAY_MS = 150;
const DOTS_COUNT = 3;

const headingStyles = () => css`
    color: ${brandText.primary};
    ${headline.xxxsmall({ fontWeight: 'bold' })};
    margin: 0;
`;

const subHeadingStyles = css`
    color: ${brandAlt[400]};
    ${headline.xxxsmall({ fontWeight: 'bold' })};
    font-size: 14px;
    margin: 0;
`;

const benefitsWrapper = css`
    margin: 2px 0 ${space[2]}px;
    height: 16px;
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
    margin-top: 2px;
    margin-right: ${space[1]}px;
`;

const benefitTextStyles = css`
    color: ${brandText.primary};
    ${headline.xxxsmall()};
    font-size: 14px;
`;

const fadeable = css`
    transition: opacity 150ms linear;
    opacity: 0;
`;

const visible = css`
    opacity: 1;
`;

const SignInPromptHeader: React.FC<HeaderRenderProps> = props => {
    const { heading, subheading, primaryCta, benefits } = props.content;
    const [benefitIndex, setBenefitIndex] = useState(-1);
    const [benefitVisible, setBenefitVisible] = useState<boolean>(false);
    const [dotsVisible, setDotsVisible] = useState(() => {
        const initialState = new Array<boolean>(DOTS_COUNT);
        initialState.fill(false);
        return initialState;
    });
    const benefitText = useMemo(() => benefits?.[benefitIndex] ?? '', [benefitIndex]);
    const benefitCss = [benefitStyles, fadeable];

    if (benefitVisible) {
        benefitCss.push(visible);
    }

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout> | null = null;
        const animationSteps: { callback: () => void; ms: number }[] = [];

        const queueAnimation = (callback: () => void, ms: number) => {
            animationSteps.push({ callback, ms });
        };

        if (!benefits?.length) {
            return;
        }

        if (benefitIndex === -1) {
            setBenefitIndex(0);
            return;
        }

        for (let i = 0; i < DOTS_COUNT; i++) {
            const delay = i === 0 ? 0 : FADE_TIME_MS + ANIMATION_DELAY_MS;
            // Fade in individual dots
            queueAnimation(() => {
                setDotsVisible(currentState => {
                    const newState = [...currentState];
                    newState.splice(i, 1, true);
                    return newState;
                });
            }, delay);
        }

        // Fade out all dots
        queueAnimation(() => {
            const newState = new Array(DOTS_COUNT).fill(false);
            setDotsVisible(newState);
        }, FADE_TIME_MS + ANIMATION_DELAY_MS);

        // Fade in benefit text
        queueAnimation(() => {
            setBenefitVisible(true);
        }, FADE_TIME_MS + ANIMATION_DELAY_MS);

        if (benefitIndex < benefits.length - 1) {
            // Fade out benefit text
            queueAnimation(() => {
                setBenefitVisible(false);
            }, FADE_TIME_MS + TEXT_DELAY_MS);

            // Trigger this effect to run again
            queueAnimation(() => {
                setBenefitIndex(benefitIndex + 1);
            }, FADE_TIME_MS + ANIMATION_DELAY_MS);
        }

        const tick = () => {
            const animationStep = animationSteps.shift();

            if (!animationStep) {
                return;
            }

            timeout = setTimeout(() => {
                animationStep.callback();
                tick();
            }, animationStep.ms);
        };

        // Start this stage of the animation
        tick();

        return () => {
            // Clear any timeouts still running in case of unexpected unmount
            if (timeout) {
                clearTimeout(timeout);
            }
        };
    }, [benefitIndex]);

    return (
        <Hide below="tablet">
            <h2 css={headingStyles}>{heading}</h2>
            <h3 css={subHeadingStyles}>{subheading}</h3>

            <div css={benefitsWrapper}>
                <div css={dotsWrapper}>
                    {dotsVisible.map((dotVisible, index) => {
                        const dotCss = [dotStyles, fadeable];

                        if (dotVisible) {
                            dotCss.push(visible);
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
        </Hide>
    );
};

const unvalidated = headerWrapper(SignInPromptHeader);
const validated = validatedHeaderWrapper(SignInPromptHeader);
export { validated as SignInPromptHeader, unvalidated as SignInPromptHeaderUnvalidated };
