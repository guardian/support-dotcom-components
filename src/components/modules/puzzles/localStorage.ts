export const setBannerState = (isMinimised: boolean): void => {
    localStorage.setItem(
        'gu.prefs.isPuzzlesBannerMinimised',
        JSON.stringify({
            value: isMinimised,
        }),
    );
};

export const getBannerState = (): boolean => {
    const savedState = localStorage.getItem('gu.prefs.isPuzzlesBannerMinimised');
    if (savedState) {
        try {
            return JSON.parse(savedState)?.value ?? false;
        } catch (error) {
            return false;
        }
    }
    return false;
};
