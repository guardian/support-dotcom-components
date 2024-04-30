import React from 'react';
import { CountryGroupId, getLocalCurrencySymbol } from '@sdc/shared/dist/lib/geolocation';
import {
    tickerHeadline,
    tickerLabel,
    tickerLabelContainer,
    tickerLabelTotal,
    tickerProgressBar,
    tickerProgressBarBackground,
    tickerProgressBarFill,
} from './tickerStyles';
import { TickerCountType, TickerSettings } from '@sdc/shared/dist/types/props/shared';

type TickerLabelProps = {
    total: number;
    goal: number;
    countType: TickerCountType;
    countryGroupId: CountryGroupId;
};

const localesByCountryGroup: Record<CountryGroupId, string> = {
    UnitedStates: 'en-US',
    Canada: 'en-US',
    International: 'en-US',
    GBPCountries: 'en-GB',
    EURCountries: 'en-GB',
    AUDCountries: 'en-GB',
    NZDCountries: 'en-GB',
};

function progressBarTranslation(total: number, end: number) {
    const percentage = (total / end) * 100 - 100;
    return percentage > 0 ? 0 : percentage;
}

function localiseAmount(amount: number, countryGroupId: CountryGroupId) {
    return amount.toLocaleString(localesByCountryGroup[countryGroupId]);
}
function TickerLabel(props: TickerLabelProps) {
    if (props.countType === TickerCountType.people) {
        return (
            <div css={tickerLabelContainer}>
                <p css={tickerLabel}>
                    <span css={tickerLabelTotal}>
                        {localiseAmount(props.total, props.countryGroupId)} supporters
                    </span>{' '}
                    of {localiseAmount(props.goal, props.countryGroupId)} goal
                    {props.total >= props.goal && (
                        <span>
                            <br />
                            Goal reached
                        </span>
                    )}
                </p>
            </div>
        );
    }

    const currencySymbol = getLocalCurrencySymbol(props.countryGroupId);
    return (
        <div css={tickerLabelContainer}>
            <p css={tickerLabel}>
                <span css={tickerLabelTotal}>
                    {currencySymbol}
                    {localiseAmount(props.total, props.countryGroupId)}
                </span>{' '}
                of {currencySymbol}
                {localiseAmount(props.goal, props.countryGroupId)} goal
            </p>
        </div>
    );
}

export function DesignableBannerTicker(props: TickerSettings): React.JSX.Element {
    const progressBarTransform = `translate3d(${progressBarTranslation(
        props.tickerData.total,
        props.end,
    )}%, 0, 0)`;

    return (
        <div>
            <h2 css={tickerHeadline}>{props.headline}</h2>
            <div css={tickerProgressBar}>
                <div css={tickerProgressBarBackground}>
                    <div
                        css={tickerProgressBarFill}
                        style={{
                            transform: progressBarTransform,
                        }}
                    />
                </div>
            </div>
            <TickerLabel
                countType={props.countType}
                countryGroupId={props.countryGroupId}
                total={props.tickerData.total}
                goal={props.tickerData.goal}
            />
        </div>
    );
}
