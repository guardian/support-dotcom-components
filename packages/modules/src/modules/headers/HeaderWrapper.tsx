import React, { useEffect } from 'react';
import { HeaderProps, Cta, headerSchema, OphanAction } from '@sdc/shared/types';
import {
    addRegionIdAndTrackingParamsToSupportUrl,
    addTrackingParamsToProfileUrl,
    createClickEventFromTracking,
    isProfileUrl,
} from '@sdc/shared/lib';
import { HasBeenSeen, useHasBeenSeen } from '../../hooks/useHasBeenSeen';
import { withParsedProps } from '../shared/ModuleWrapper';
import type { ReactComponent } from '../../types';

export interface HeaderEnrichedCta {
    ctaUrl: string;
    ctaText: string;
}

export interface HeaderRenderedContent {
    heading: string;
    subheading: string;
    primaryCta: HeaderEnrichedCta | null;
    secondaryCta: HeaderEnrichedCta | null;
    benefits: string[] | null;
}

export interface HeaderRenderProps {
    content: HeaderRenderedContent;
    mobileContent?: HeaderRenderedContent;
    onCtaClick?: () => void; // only used by sign in prompt header
}

export const headerWrapper = (
    Header: ReactComponent<HeaderRenderProps>,
): ReactComponent<HeaderProps> => {
    const Wrapped: ReactComponent<HeaderProps> = ({
        content,
        mobileContent,
        tracking,
        countryCode,
        submitComponentEvent,
        numArticles,
    }) => {
        const buildEnrichedCta = (cta: Cta): HeaderEnrichedCta => {
            if (isProfileUrl(cta.baseUrl)) {
                return {
                    ctaUrl: addTrackingParamsToProfileUrl(cta.baseUrl, tracking),
                    ctaText: cta.text,
                };
            }
            return {
                ctaUrl: addRegionIdAndTrackingParamsToSupportUrl(
                    cta.baseUrl,
                    tracking,
                    numArticles,
                    countryCode,
                ),
                ctaText: cta.text,
            };
        };

        const primaryCta = content.primaryCta ? buildEnrichedCta(content.primaryCta) : null;
        const secondaryCta = content.secondaryCta ? buildEnrichedCta(content.secondaryCta) : null;
        const benefits = content.benefits || null;

        const renderedContent: HeaderRenderedContent = {
            heading: content.heading,
            subheading: content.subheading,
            primaryCta,
            secondaryCta,
            benefits,
        };

        const mobilePrimaryCta = mobileContent?.primaryCta
            ? buildEnrichedCta(mobileContent.primaryCta)
            : primaryCta;

        const mobileSecondaryCta = mobileContent?.secondaryCta
            ? buildEnrichedCta(mobileContent.secondaryCta)
            : secondaryCta;

        const renderedMobileContent = mobileContent
            ? ({
                  heading: mobileContent.heading,
                  subheading: mobileContent.subheading,
                  primaryCta: mobilePrimaryCta,
                  secondaryCta: mobileSecondaryCta,
              } as HeaderRenderedContent)
            : undefined;

        const { abTestName, abTestVariant, componentType, campaignCode } = tracking;

        const onCtaClick = (componentId: string) => {
            return (): void => {
                const componentClickEvent = createClickEventFromTracking(
                    tracking,
                    `${componentId} : cta`,
                );
                submitComponentEvent && submitComponentEvent(componentClickEvent);
            };
        };

        const sendOphanEvent = (action: OphanAction): void =>
            submitComponentEvent &&
            submitComponentEvent({
                component: {
                    componentType,
                    id: campaignCode,
                    campaignCode,
                },
                action,
                abTest: {
                    name: abTestName,
                    variant: abTestVariant,
                },
            });

        const [hasBeenSeen, setNode] = useHasBeenSeen(
            {
                threshold: 0,
            },
            true,
        ) as HasBeenSeen;

        useEffect(() => {
            if (hasBeenSeen) {
                sendOphanEvent('VIEW');
            }
        }, [hasBeenSeen]);

        useEffect(() => {
            sendOphanEvent('INSERT');
        }, []);

        return (
            <div ref={setNode}>
                <Header
                    content={renderedContent}
                    mobileContent={renderedMobileContent}
                    onCtaClick={onCtaClick(campaignCode)}
                />
            </div>
        );
    };
    return Wrapped;
};

const validate = (props: unknown): props is HeaderProps => {
    const result = headerSchema.safeParse(props);
    return result.success;
};

export const validatedHeaderWrapper = (
    Header: ReactComponent<HeaderRenderProps>,
): ReactComponent<HeaderProps> => withParsedProps(headerWrapper(Header), validate);
