import { css } from '@emotion/react';
import { addRegionIdAndTrackingParamsToSupportUrl } from '@sdc/shared/lib';
import { Tracking } from '@sdc/shared/src/types';
import React, { RefObject } from 'react';

const styles = {
    iframeContainer: css`
        border: none;
        width: 100%;
    `,
};

// Currently components don't know if they're in DEV/CODE/PROD
// hence why we hardcode urls to PROD. For convenience for future
// dev work we've left in the CODE and DEV urls below.
const BASE_URL = 'https://support.theguardian.com/contribute-in-epic';
// const BASE_URL = 'https://support.code.dev-theguardian.com/contribute-in-epic';
// const BASE_URL = 'https://support.thegulocal.com/contribute-in-epic';

interface ContributionsEpicCheckoutProps {
    iframeRef: RefObject<HTMLIFrameElement>;
    iframeHeight: number;
    tracking: Tracking;
    onReminderClicked: () => void;
    numArticles?: number;
    countryCode?: string;
    reminderCta?: string;
}

export function ContributionsEpicCheckout({
    iframeRef,
    iframeHeight,
    tracking,
    numArticles,
    countryCode,
    reminderCta,
}: ContributionsEpicCheckoutProps): JSX.Element {
    const iframeUrl = getIframeUrl(tracking, numArticles, countryCode, reminderCta);

    return (
        <div>
            <iframe
                ref={iframeRef}
                src={iframeUrl}
                css={styles.iframeContainer}
                style={{ height: iframeHeight }}
                allow="payment *"
                scrolling="no"
            />
        </div>
    );
}

// ---- Helpers ---- //

function getIframeUrl(
    tracking: Tracking,
    numArticles?: number,
    countryCode?: string,
    reminderCta?: string,
) {
    return addRegionIdAndTrackingParamsToSupportUrl(
        addReminderCtaToUrl(BASE_URL, reminderCta),
        tracking,
        numArticles,
        countryCode,
    );
}

function addReminderCtaToUrl(urlString: string, reminderCta?: string) {
    if (!reminderCta) {
        return urlString;
    }

    const url = new URL(urlString);
    url.searchParams.append('reminderCta', reminderCta);

    return url.toString();
}
