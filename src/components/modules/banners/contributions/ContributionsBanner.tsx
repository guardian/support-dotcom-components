import React from 'react';
import { BannerProps } from '../../../../types/BannerTypes';
import { styles } from './ContributionsBannerStyles';
import { getLocalCurrencySymbol } from '../../../../lib/geolocation';
import { containsPlaceholder } from '../../../../lib/placeholders';

export const ContributionsBanner: React.FC<BannerProps> = (props: BannerProps) => {
    const { content, countryCode } = props;
    const replaceCurrencyPlaceholder = (text: string, currencySymbol: string): string => {
        return text.replace('%%CURRENCY_SYMBOL%%', currencySymbol);
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

        if (!copyHasPlaceholder) {
            return (
                <>
                    <div className={styles.banner}>
                        <p className={styles.copy}>
                            {content.header && (
                                <span className={styles.header}>{content.header}</span>
                            )}
                            <span
                                className={styles.messageText}
                                dangerouslySetInnerHTML={{ __html: content.messageText }}
                            />
                            <span className={styles.ctaText}>{highlightedText}</span>
                        </p>
                    </div>
                </>
            );
        }
    }

    return null;
};
