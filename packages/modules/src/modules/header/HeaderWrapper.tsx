import React, { useEffect } from 'react';
import { HeaderProps, HeaderCta } from '@sdc/shared/types';
import { addRegionIdAndTrackingParamsToSupportUrl } from '@sdc/shared/lib';
import { OphanAction } from '@sdc/shared/types';
import { HasBeenSeen, useHasBeenSeen } from '../../hooks/useHasBeenSeen';

export interface HeaderEnrichedCta {
    ctaUrl: string;
    ctaText: string;
}

export interface HeaderRenderedContent {
    heading: string;
    subheading: string;
    primaryCta: HeaderEnrichedCta | null;
    secondaryCta: HeaderEnrichedCta | null;
}

export interface HeaderRenderProps {
    content: HeaderRenderedContent;
    mobileContent?: HeaderRenderedContent;
}

export const headerWrapper = (Header: React.FC<HeaderRenderProps>): React.FC<HeaderProps> => {
    const Wrapped: React.FC<HeaderProps> = ({
        content,
        mobileContent,
        tracking,
        countryCode,
        submitComponentEvent,
        numArticles,
    }) => {
        const buildEnrichedCta = (cta: HeaderCta): HeaderEnrichedCta => ({
            ctaUrl: addRegionIdAndTrackingParamsToSupportUrl(
                cta.url,
                tracking,
                numArticles,
                countryCode,
            ),
            ctaText: cta.text,
        });

        const primaryCta = content.primaryCta ? buildEnrichedCta(content.primaryCta) : null;
        const secondaryCta = content.secondaryCta ? buildEnrichedCta(content.secondaryCta) : null;

        const renderedContent: HeaderRenderedContent = {
            heading: content.heading,
            subheading: content.subheading,
            primaryCta,
            secondaryCta,
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
                <Header content={renderedContent} mobileContent={renderedMobileContent} />
            </div>
        );
    };
    return Wrapped;
};
