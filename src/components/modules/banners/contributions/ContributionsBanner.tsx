import React from 'react';
import { BannerProps } from '../BannerTypes';
import { styles } from './ContributionsBannerStyles';
import { getLocalCurrencySymbol } from '../../../../lib/geolocation';

type ParsedMessageText = {
    header: string;
    body: string;
};

export const ContributionsBanner: React.FC<BannerProps> = (props: BannerProps) => {
    const { data, countryCode } = props;
    if (data && countryCode) {
        const currencySymbol = getLocalCurrencySymbol(countryCode);
        const replaceCurrencyPlaceholder = (text: string): string => {
            return text.replace('%%CURRENCY_SYMBOL%%', currencySymbol);
        };
        const parseMessageText = (text: string): ParsedMessageText => {
            const strongTagPattern = /<strong>(.+)<\/strong>/;
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            const header = text.match(strongTagPattern)[1];
            const body = text.split('</strong>')[1];
            return { header, body };
        };
        const { header, body } = parseMessageText(data.messageText);

        return (
            <>
                {data && (
                    <div className={styles.banner}>
                        <p className={styles.copy}>
                            <span className={styles.header}>{header}</span>
                            <span dangerouslySetInnerHTML={{ __html: body }} />
                            <span className={styles.inlineCTA}>
                                {replaceCurrencyPlaceholder(data.ctaText)}
                            </span>
                        </p>
                    </div>
                )}
            </>
        );
    } else {
        return null;
    }
};
