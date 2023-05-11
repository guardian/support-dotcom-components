import { useState, useEffect } from 'react';

// breakpoint argument should be passed as follows: `from.<breakpoint>`
const useMediaQuery = (breakpoint: string): boolean => {
    const [matches, setMatches] = useState(false);

    const handleChange = (e: { matches: boolean | ((prevState: boolean) => boolean) }) => {
        setMatches(e.matches);
    };

    const query = breakpoint.replace('@media', '').trim();
    const media = window.matchMedia(query);

    useEffect(() => {
        if (media.matches !== matches) {
            setMatches(media.matches);
        }

        media.addEventListener('change', handleChange);

        try {
            // Chrome & Firefox
            media.addEventListener('change', handleChange);
        } catch (e1) {
            try {
                // Safari - addEventListener supported from v14
                media.addListener(handleChange);
            } catch (e2) {
                console.error(e2);
            }
        }

        return () => media.removeEventListener('change', handleChange);
    }, [matches, query]);

    return matches;
};

export default useMediaQuery;
