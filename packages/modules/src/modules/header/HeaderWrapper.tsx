import React, { useEffect } from 'react';
import { HeaderProps, Cta, headerSchema } from '@sdc/shared/types';
import { addRegionIdAndTrackingParamsToSupportUrl } from '@sdc/shared/lib';
import { OphanAction } from '@sdc/shared/types';
import { HasBeenSeen, useHasBeenSeen } from '../../hooks/useHasBeenSeen';
import { withParsedProps } from '../shared/ModuleWrapper';

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
        const buildEnrichedCta = (cta: Cta): HeaderEnrichedCta => ({
            ctaUrl: addRegionIdAndTrackingParamsToSupportUrl(
                cta.baseUrl,
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

        const getMobileCta = (): HeaderEnrichedCta | null => {
            if (mobileContent) {
                // If mobileContent is defined but its primaryCta is not then we do not render a cta at all
                return mobileContent.primaryCta ? buildEnrichedCta(mobileContent.primaryCta) : null;
            }
            return primaryCta;
        };

        const mobilePrimaryCta = getMobileCta();

        const renderedMobileContent = mobileContent
            ? ({
                  heading: mobileContent.heading,
                  subheading: mobileContent.subheading,
                  primaryCta: mobilePrimaryCta,
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

const validate = (props: unknown): props is HeaderProps => {
    const result = headerSchema.safeParse(props);
    return result.success;
};

export const validatedHeaderWrapper = (
    Header: React.FC<HeaderRenderProps>,
): React.FC<HeaderProps> => withParsedProps(headerWrapper(Header), validate);
