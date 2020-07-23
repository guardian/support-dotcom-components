import React from 'react';
import { BannerProps } from '../BannerTypes';
import { styles } from './ContributionsBannerStyles';
import { getLocalCurrencySymbol } from '../../../../lib/geolocation';

export const ContributionsBanner: React.FC<BannerProps> = (props: BannerProps) => {
    const { content, countryCode } = props;
    const replaceCurrencyPlaceholder = (text: string, currencySymbol: string): string => {
        return text.replace('%%CURRENCY_SYMBOL%%', currencySymbol);
    };

    if (content && countryCode) {
        const currencySymbol = getLocalCurrencySymbol(countryCode);
        return (
            <>
                <div className={styles.banner}>
                    <p className={styles.copy}>
                        <span className={styles.header}>{content.header}</span>
                        <span
                            className={styles.messageText}
                            dangerouslySetInnerHTML={{ __html: content.messageText }}
                        />
                        <span className={styles.ctaText}>
                            {replaceCurrencyPlaceholder(content.ctaText, currencySymbol)}
                        </span>
                    </p>
                </div>
            </>
        );
    } else {
        return null;
    }
};
