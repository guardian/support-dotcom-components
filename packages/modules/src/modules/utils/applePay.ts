export const isValidApplePaySessionTestingOn = (): boolean => {
    return true;
};
export const isValidApplePaySessionTestingOff = (): boolean => {
    return false;
};

// export const isValidApplePaySession = (): boolean => {
//     const tempWindow: any = window;
//     const applePaySession = tempWindow.ApplePaySession;

//     if (applePaySession) {
//         if (applePaySession.canMakePayments) {
//             return true;
//         }
//     }
//     return false;
// };
