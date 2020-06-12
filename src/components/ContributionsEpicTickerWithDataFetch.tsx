import React, { useEffect, useState } from 'react';

import { ContributionsEpicTicker } from './ContributionsEpicTicker';

const tickerUrl = 'https://support.theguardian.com/ticker.json';

const checkForErrors = (response: Response): Response => {
    if (!response.ok) {
        throw Error(
            response.statusText || `Ticker api call returned HTTP status ${response.status}`,
        );
    }
    return response;
};

const parseJson = (response: Response): Promise<TickerData> => response.json();

const fetchTickerData = (): Promise<TickerData> =>
    fetch(tickerUrl)
        .then(checkForErrors)
        .then(parseJson);

type TickerData = {
    total: number;
    goal: number;
};

type TickerState = TickerData | undefined;

type Props = {
    countryCode?: string;
};

export const ContributionsEpicTickerWithDataFetch: React.FC<Props> = ({ countryCode }: Props) => {
    const [tickerData, setTickerData] = useState<TickerState>();

    useEffect(() => {
        fetchTickerData()
            .then(tickerData =>
                setTickerData({
                    total: parseInt(String(tickerData.total), 10),
                    goal: parseInt(String(tickerData.goal), 10),
                }),
            )
            .catch(error => console.log('Error fetching ticker data:', error));
    }, []);

    if (!tickerData) {
        return null;
    }

    return (
        <div>
        </div>
    );
};
