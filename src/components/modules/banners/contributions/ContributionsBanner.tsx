// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { addTrackingParams, createClickEventFromTracking } from '../../../../lib/tracking';
import { setContributionsBannerClosedTimestamp } from '../localStorage';
import React, { useState } from 'react';
import { BannerProps } from '../../../../types/BannerTypes';
import { styles } from './ContributionsBannerStyles';
import { getLocalCurrencySymbol } from '../../../../lib/geolocation';
import { containsPlaceholder } from '../../../../lib/placeholders';
import { SvgRoundel } from '@guardian/src-brand';
import { SvgClose } from '@guardian/src-icons';

const bannerId = 'contributions-banner';
const closeComponentId = `${bannerId} : close`;
const ctaComponentId = `${bannerId} : cta`;

export const ContributionsBanner: React.FC<BannerProps> = (props: BannerProps) => {
    const [showBanner, setShowBanner] = useState(true);
    const { content, countryCode } = props;
    const replaceCurrencyPlaceholder = (text: string, currencySymbol: string): string => {
        return text.replace('%%CURRENCY_SYMBOL%%', currencySymbol);
    };

    const onContributeClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        evt.preventDefault();
        const contributeBaseUrl =
            (props && props.content && props.content.cta && props.content.cta.baseUrl) ||
            'https://support.theguardian.com/contribute';
        const contributeUrlWithTracking = addTrackingParams(contributeBaseUrl, props.tracking);
        const componentClickEvent = createClickEventFromTracking(props.tracking, ctaComponentId);
        if (props.submitComponentEvent) {
            props.submitComponentEvent(componentClickEvent);
        }
        window.location.href = contributeUrlWithTracking;
    };

    const onCloseClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        evt.preventDefault();
        const componentClickEvent = createClickEventFromTracking(props.tracking, closeComponentId);
        if (props.submitComponentEvent) {
            props.submitComponentEvent(componentClickEvent);
        }
        setShowBanner(false);
        setContributionsBannerClosedTimestamp();
    };

    if (content && countryCode) {
        const currencySymbol = getLocalCurrencySymbol(countryCode);

        const highlightedText =
            content.highlightedText &&
            replaceCurrencyPlaceholder(content.highlightedText, currencySymbol);

        const copyHasPlaceholder =
            containsPlaceholder(content.messageText) ||
            (!!highlightedText && containsPlaceholder(highlightedText)) ||
            (!!content.header && containsPlaceholder(content.header));

        if (!copyHasPlaceholder && showBanner) {
            return (
                <>
                    <div css={styles.banner}>
                        <div css={styles.leftRoundel}>
                            <div css={styles.roundelContainer}>
                                <SvgRoundel />
                            </div>
                        </div>
                        <div css={styles.copyAndCta}>
                            <div css={styles.copy}>
                                {content.header && (
                                    <span css={styles.header}>{content.header}</span>
                                )}
                                <span
                                    css={styles.messageText}
                                    dangerouslySetInnerHTML={{ __html: content.messageText }}
                                />
                                <span css={styles.highlightedText}>{highlightedText}</span>
                            </div>
                            <div>
                                <button
                                    css={styles.cta}
                                    data-link-name={ctaComponentId}
                                    onClick={onContributeClick}
                                >
                                    {content && content.cta && content.cta.text}
                                </button>
                                <img
                                    src="https://assets.guim.co.uk/images/acquisitions/2db3a266287f452355b68d4240df8087/payment-methods.png"
                                    alt="Accepted payment methods: Visa, Mastercard, American Express and PayPal"
                                    css={styles.paymentMethods}
                                />
                            </div>
                        </div>
                        <div css={styles.rightButtons}>
                            <div css={styles.rightRoundel}>
                                <div css={styles.roundelContainer}>
                                    <SvgRoundel />
                                </div>
                            </div>
                            <div css={styles.closeButtonContainer}>
                                <button
                                    css={styles.closeButton}
                                    onClick={onCloseClick}
                                    data-link-name={closeComponentId}
                                    aria-label="Close"
                                >
                                    <SvgClose />
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            );
        }
    }

    return null;
};
