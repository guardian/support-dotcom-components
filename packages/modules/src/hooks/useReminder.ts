import { useState, useRef, useEffect } from 'react';
import { ContributionsReminderTracking } from '../modules/banners/common/types';

const useReminder = (
    reminderTracking: ContributionsReminderTracking,
): {
    isReminderActive: boolean;
    onReminderCtaClick: () => void;
    mobileReminderRef: React.RefObject<HTMLDivElement>;
} => {
    const [isReminderActive, setIsReminderActive] = useState(false);

    const onReminderCtaClick = () => {
        reminderTracking.onReminderCtaClick();
        setIsReminderActive(!isReminderActive);
    };

    const mobileReminderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (mobileReminderRef.current && isReminderActive) {
            mobileReminderRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [mobileReminderRef.current, isReminderActive]);

    return { isReminderActive, onReminderCtaClick, mobileReminderRef };
};

export default useReminder;
