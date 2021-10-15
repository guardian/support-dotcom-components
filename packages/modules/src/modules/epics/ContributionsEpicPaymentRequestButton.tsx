import React, { useState, useEffect } from 'react';
import * as stripeJs from '@stripe/react-stripe-js';
import { Elements, PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const Container: React.FC = () => {
    const [stripe] = useState(loadStripe('pk_live_auSwLB4KBzbN3JOUVHvKMe6f'));

    return (
        <Elements stripe={stripe}>
            <ContributionsEpicPaymentRequestButton />;
        </Elements>
    );
};

export { Container as ContributionsEpicPaymentRequestButton };

const ContributionsEpicPaymentRequestButton: React.FC = () => {
    const stripe = stripeJs.useStripe();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [paymentRequest, setPaymentRequest] = useState<any | null>(null);

    useEffect(() => {
        if (stripe) {
            const paymentRequest = stripe.paymentRequest({
                country: 'US',
                currency: 'usd',
                total: {
                    label: 'Demo total',
                    amount: 1099,
                },
                requestPayerName: true,
                requestPayerEmail: true,
            });

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            paymentRequest.canMakePayment().then(function(result: any) {
                if (result) {
                    console.log('[PRB]: ', { result });
                    setPaymentRequest(paymentRequest);
                } else {
                    console.log('[PRB]: cannot make payment');
                }
            });
        }
    }, [stripe]);

    return (
        <div>
            {paymentRequest && (
                <PaymentRequestButtonElement
                    options={{
                        paymentRequest: paymentRequest,
                    }}
                />
            )}
        </div>
    );
};
