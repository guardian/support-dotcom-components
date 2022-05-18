import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';

const containerStyles = css`
    width: 100%;
`;

const NewsletterSignup = ({ url }: { url: string }): JSX.Element => {
    const [iframeHeight, setIframeHeight] = useState(60);

    // TODO - copy from newsletterEmbedIframe/init.ts to:
    // 1. only resize specific iframe
    // 2. validate height event
    useEffect(() => {
        window.addEventListener('message', event => {
            try {
                const message = JSON.parse(event.data);
                if (message.type === 'set-height') {
                    console.log({ event });
                    setIframeHeight(message.value);
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
