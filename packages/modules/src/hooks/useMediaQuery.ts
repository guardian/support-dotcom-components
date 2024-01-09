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

        if (media.addEventListener) {
            media.addEventListener('change', handleChange);
        } else if (media.addListener) {
            // Safari - addEventListener supported from v14
            media.addListener(handleChange);
        }

        return () => {
            if (media.removeEventListener) {
                media.removeEventListener('change', handleChange);
            } else if (media.removeListener) {
                // Safari - removeEventListener supported from v14
                media.removeListener(handleChange);
            }
        };
    }, [matches, query]);

    return matches;
};

export default useMediaQuery;
