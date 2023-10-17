export {};

interface ApplePaySession {
    canMakePayments: () => boolean;
}

declare global {
    interface Window {
        ApplePaySession: ApplePaySession | undefined;
    }
}
