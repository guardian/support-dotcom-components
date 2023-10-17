export const isValidApplePaySession = (): boolean => {
    const protocol = window.location.protocol;
    /**
     * Need to check protocol to prevent 'Trying to start an Apple Pay
     * session from an insecure document' error which will break
     * storybook otherwise */
    if (protocol === 'https:' && window.ApplePaySession) {
        return window.ApplePaySession.canMakePayments();
    }
    return false;
};
