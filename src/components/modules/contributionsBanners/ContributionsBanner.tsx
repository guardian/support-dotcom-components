import React from 'react';
import { BannerProps } from '../../BannerTypes';
import { styles } from './ContributionsBannerStyles';
import { getLocalCurrencySymbol } from '../../../lib/geolocation';

export const ContributionsBanner: React.FC<BannerProps> = (props: BannerProps) => {
    const currencySymbol = getLocalCurrencySymbol(props.countryCode);
    const replaceCurrencyPlaceholder = (text: string): string => {
        return text.replace('%%CURRENCY_SYMBOL%%', currencySymbol);
    };

    return (
        <>
            {props.data && (
                <div className={styles.banner}>
                    <p className={styles.copy}>
                        <span dangerouslySetInnerHTML={{ __html: props.data.messageText }} />
                        <span className={styles.inlineCTA}>
                            {replaceCurrencyPlaceholder(props.data.ctaText)}
                        </span>
                    </p>
                </div>
            )}
        </>
    );
};
