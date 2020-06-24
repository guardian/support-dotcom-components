import { useState, useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useWindowSize() {
    const isClient = typeof window === 'object';

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    function getSize() {
        return {
            width: isClient ? window.innerWidth : undefined,
            height: isClient ? window.innerHeight : undefined,
        };
    }

    const [windowSize, setWindowSize] = useState(getSize);

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    useEffect(() => {
        if (!isClient) {
            return false;
        }

        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        function handleResize() {
            setWindowSize(getSize());
        }

        window.addEventListener('resize', handleResize);
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty array ensures that effect is only run on mount and unmount

    return windowSize;
}
