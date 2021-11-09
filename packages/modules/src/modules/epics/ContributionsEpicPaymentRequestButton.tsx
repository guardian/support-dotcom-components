import React, { useState, useEffect } from 'react';
import { Elements, PaymentRequestButtonElement, useStripe } from '@stripe/react-stripe-js';
import { loadStripe, PaymentRequest, CanMakePaymentResult } from '@stripe/stripe-js';

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
    const stripe = useStripe();
    const [paymentRequest, setPaymentRequest] = useState<null | PaymentRequest>(null);

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

            paymentRequest.canMakePayment().then(function(result: CanMakePaymentResult | null) {
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
