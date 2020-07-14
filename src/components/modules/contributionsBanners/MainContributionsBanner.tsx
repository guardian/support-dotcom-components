import React, { useEffect, useState } from 'react';
import { BannerTargeting, BannerTracking } from '../../BannerTypes';
import { styles } from './MainContributionsBanner.styles';
import { getLocalCurrencySymbol } from '../../../lib/geolocation';

export type BannerProps = {
    tracking: BannerTracking;
    targeting: BannerTargeting;
    isSupporter?: boolean;
};

export type BannerData = {
    messageText: string;
    ctaText: string;
    buttonCaption: string;
    linkUrl: string;
};

export const MainContributionsBanner: React.FC<BannerProps> = (props: BannerProps) => {
    const [data, setData] = useState<BannerData | null>(null);
    const currencySymbol = getLocalCurrencySymbol(props.targeting.countryCode);
    const remoteDataUrl =
        'https://interactive.guim.co.uk/docsdata/1CIHCoe87hyPHosXx1pYeVUoohvmIqh9cC_kNlV-CMHQ.json';

    useEffect(() => {
        fetch(remoteDataUrl)
            .then(response => response.json())
            .then(json => json['sheets']['control'][0])
            .then(data => setData(data));
    }, [remoteDataUrl]);

    const replaceCurrencyPlaceholder = (text: string): string => {
        return text.replace('%%CURRENCY_SYMBOL%%', currencySymbol);
    };

    return (
        <>
            {data && (
                <div className={styles.banner}>
                    <p className={styles.copy}>
                        <span dangerouslySetInnerHTML={{ __html: data.messageText }} />
                        <span className={styles.inlineCTA}>
                            {replaceCurrencyPlaceholder(data.ctaText)}
                        </span>
                    </p>
                </div>
            )}
        </>
    );
};
