export const isValidApplePayWalletSession = (): Promise<boolean> => {
    const protocol = window.location.protocol;
    const merchantIdentifier = 'merchant.uk.co.guardian.contributions';
    /**
     * Need to check protocol to prevent 'Trying to start an Apple Pay
     * session from an insecure document' error which will break
     * storybook otherwise */
    if (protocol === 'https:') {
        return new Promise((resolve) => {
            if (window.ApplePaySession) {
                window.ApplePaySession.canMakePaymentsWithActiveCard(merchantIdentifier).then(
                    (result) => {
                        resolve(result);
                    },
                );
            } else {
                resolve(false);
            }
        });
    }
    return Promise.resolve(false);
};
