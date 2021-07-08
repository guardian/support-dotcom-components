import { addForMinutes, getCookie } from '../lib/cookies';
import { fetchTickerData } from '../lib/fetchTickerDataClient';
import { useEffect, useState } from 'react';
import { TickerCountType, TickerData } from '../types/shared';

const AUS_MOMENT_SUPPORTER_COUNT_COOKIE_NAME = 'gu_aus_moment_supporter_count';

const useNumberOfSupporters = (): number => {
    const [numberOfSupporters, setNumberOfSupporters] = useState<number>('');

    useEffect(() => {
        const cookieValue = getCookie(AUS_MOMENT_SUPPORTER_COUNT_COOKIE_NAME);
        if (cookieValue) {
            setNumberOfSupporters(Number(cookieValue));
        } else {
            fetchTickerData(TickerCountType.people).then((td: TickerData) => {
                addForMinutes(AUS_MOMENT_SUPPORTER_COUNT_COOKIE_NAME, `${td.total}`, 60);
                setNumberOfSupporters(td.total);
            });
        }
    }, []);

    return numberOfSupporters;
};

export default useNumberOfSupporters;
