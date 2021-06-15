import { useEffect, useState, useRef } from 'react';
import libDebounce from 'lodash.debounce';

type SetNode = (el: HTMLDivElement) => void;
export type HasBeenSeen = [boolean, SetNode];

const useHasBeenSeen = (options: IntersectionObserverInit, debounce?: boolean): HasBeenSeen => {
    const [hasBeenSeen, setHasBeenSeen] = useState<boolean>(false);
    const [node, setNode] = useState<HTMLElement | null>(null);

    const observer = useRef<IntersectionObserver | null>(null);

    // Enabling debouncing ensures the target element intersects for at least
    // 200ms before the callback is executed
    const intersectionFn: IntersectionObserverCallback = ([entry]) => {
        if (entry?.isIntersecting) {
            setHasBeenSeen(true);
        }
    };
    const intersectionCallback = debounce ? libDebounce(intersectionFn, 200) : intersectionFn;

    useEffect(() => {
        if (observer.current) {
            observer.current.disconnect();
        }

        observer.current = new window.IntersectionObserver(intersectionCallback, options);

        const { current: currentObserver } = observer;

        if (node) {
            currentObserver.observe(node);
        }

        return (): void => currentObserver.disconnect();
    }, [node, options, intersectionCallback]);

    return [hasBeenSeen, setNode];
};

const useOnSeenEffect = (
    options: IntersectionObserverInit,
    debounce: boolean,
    effect: () => void,
): SetNode => {
    const [hasBeenSeen, setNode] = useHasBeenSeen(options, debounce);

    useEffect(() => {
        if (hasBeenSeen) {
            effect();
        }
    }, [hasBeenSeen]);

    return setNode;
};

export { useHasBeenSeen, useOnSeenEffect };
