import { useLayoutEffect, useRef } from 'react';

export function useScrollDepth(
    effect: (scrollPercent: number) => void,
    deps: React.DependencyList,
    debounce?: number,
): void {
    const pageHeight = useRef(document.documentElement.scrollHeight - window.innerHeight);

    let throttleTimeout: NodeJS.Timeout | null = null;

    function onScroll() {
        const currentPosition = window.scrollY;
        const percentScroll = (currentPosition / pageHeight.current) * 100;
        effect(percentScroll);
        throttleTimeout = null;
    }

    useLayoutEffect(() => {
        function handleScroll() {
            if (debounce) {
                if (throttleTimeout === null) {
                    throttleTimeout = setTimeout(onScroll, debounce);
                }
            } else {
                onScroll();
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, deps);
}
