export {};

interface ApplePaySession {
    canMakePayments: () => boolean;
    canMakePaymentsWithActiveCard: (merchantIdentifier: string) => Promise<boolean>;
}

declare global {
    interface Window {
        ApplePaySession: ApplePaySession | undefined;
    }
}
