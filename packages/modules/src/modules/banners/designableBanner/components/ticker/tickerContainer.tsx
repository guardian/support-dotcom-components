import { useEffect, useState } from 'react';
import { TickerProps } from '../DesignableBannerTicker';
import { TickerCountType, TickerData, TickerEndType } from '@sdc/shared/dist/types/props/shared';

async function fetchJson<T extends Record<string, unknown>>(
    endpoint: RequestInfo,
    settings: RequestInit,
): Promise<T> {
    const resp = await fetch(endpoint, settings);
    return (await resp.json()) as T;
}

// In dev we use a dummy route for ticker data; in CODE and PROD this needs to point to the specific ticker ID
function getTickerUrl(tickerCountType: TickerCountType) {
    return tickerCountType === 'money' ? '/ticker.json' : '/supporters-ticker.json';
}

function getInitialTickerValues(tickerCountType: TickerCountType): Promise<TickerData> {
    return fetchJson<TickerData>(getTickerUrl(tickerCountType), {}).then((data: TickerData) => {
        const total = Math.floor(data.total);
        const goal = Math.floor(data.goal);
        return { total, goal };
    });
}

function getDefaultTickerEnd(total: number, goal: number) {
    if (goal > total) {
        return goal;
    }
    return total;
}

type TickerContainerProps = {
    countType: TickerCountType;
    endType: TickerEndType;
    headline: string;
    calculateEnd?: (total: number, goal: number) => number;
    render: (props: TickerProps) => JSX.Element;
};

export function TickerContainer({
    render,
    countType,
    endType,
    headline,
    calculateEnd = getDefaultTickerEnd,
}: TickerContainerProps): JSX.Element {
    const [tickerConfig, setTickerConfig] = useState<TickerData>({
        total: 0,
        goal: 0,
    });

    const end = calculateEnd(tickerConfig.total, tickerConfig.goal);

    useEffect(() => {
        void getInitialTickerValues(countType).then(setTickerConfig);
    }, []);

    return render({
        total: tickerConfig.total,
        goal: tickerConfig.goal,
        countType,
        endType,
        headline,
        end,
    });
}
