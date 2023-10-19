export const isValidApplePayWalletSession = (): Promise<boolean> => {
    console.log(`isValidApplePayWalletSession -> IN`);
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
                        console.log(`canMakePaymentsWithActiveCard -> ${result}`);
                        console.log(`isValidApplePayWalletSession -> OUT`);
                        resolve(result);
                    },
                );
            } else {
                console.log(`window.ApplePaySession -> false`);
                resolve(false);
            }
        });
    }
    console.log(`https -> false`);
    return Promise.resolve(false);
};
