import React, { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';

const containerStyles = css`
    width: 100%;
`;
// const allowedOrigins = ['https://www.theguardian.com', 'https://m.code.dev-theguardian.com'];

const NewsletterSignup = ({ url }: { url: string }): JSX.Element => {
    const [iframeHeight, setIframeHeight] = useState(60);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        window.addEventListener('message', event => {
            // if (!allowedOrigins.includes(event.origin)) {
            //     return;
            // }

            try {
                // Check if this is the newsletter iframe
                const contentWindow = iframeRef?.current?.contentWindow;
                if (contentWindow && event.source && contentWindow === event.source) {
                    const message = JSON.parse(event.data);

                    if (message.type === 'set-height') {
                        if (typeof message.value === 'number') {
                            setIframeHeight(message.value);
                        } else if (typeof message.value === 'string') {
                            const value = parseInt(message.value, 10);
                            if (Number.isInteger(value)) {
                                setIframeHeight(message.value);
                            }
                        }
                    }
                }
            } catch (err) {
                console.log(`Error handling event in epic NewsletterSignup: ${err}`);
            }
        });
    }, []);

    return (
        <div css={containerStyles}>
            <iframe
                src={url}
                name="newsletter-signup-epic"
                ref={iframeRef}
                scrolling="no"
                seamless
                frameBorder="0"
                css={css`
                    width: 100% !important;
                    height: ${iframeHeight}px;
                `}
            />
        </div>
    );
};

export default NewsletterSignup;
