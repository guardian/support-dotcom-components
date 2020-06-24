// @flow
import React from 'react';
import { css } from 'emotion';
import { neutral, opinion } from '@guardian/src-foundations/palette';

const links = {
    facebook:
        'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fsupport.theguardian.com%2Fcontribute%3FausAcquisitionData%3Dthankyou_facebook',
    twitter:
        'https://twitter.com/intent/tweet?url=https%3A%2F%2Fsupport.theguardian.com%2Fcontribute%3FausAcquisitionData%3Dthankyou_twitter&hashtags=supporttheguardian&text=Guardian%20Australia%20supporters%20are%20doing%20something%20powerful.%20I%20support%20the%20Guardian%20because%20I%20believe%20their%20vital%2C%20independent%20journalism%20should%20be%20open%20and%20free%20to%20all.%20Join%20me.%20With%20your%20support%2C%20we%20can%20do%20more.',
    email:
        'mailto:?subject=Guardian%20Australia%20supporters%20are%20doing%20something%20powerful&body=Guardian%20Australia%20supporters%20are%20doing%20something%20powerful.%20I%20support%20the%20Guardian%20because%20I%20believe%20their%20vital%2C%20independent%20journalism%20should%20be%20open%20and%20free%20to%20all.%20Join%20me.%20With%20your%20support%2C%20we%20can%20do%20more.%20%23supporttheguardian%0A%0Ahttps%3A%2F%2Fsupport.theguardian.com%2Fcontribute%3FausAcquisitionData%3Dthankyou_email',
};

const linksWrapper = css`
    margin: 0 -3px;
    padding-bottom: -10px;
`;

const socialLink = css`
    margin: 0 3px;
`;

const socialLinkButton = css`
    fill: ${opinion[400]};
    &:hover {
        fill: ${opinion[300]};
    }
`;

export const SocialLinks = (): JSX.Element => (
    <div className={linksWrapper}>
        <a href={links.facebook} className={socialLink} target="_blank" rel="noopener noreferrer">
            <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx="18" cy="18" r="18" className={socialLinkButton} />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.3469 13.9626V16.2354H14V18.7444H16.3469V26.2354H19.1734V18.7444H21.4861L22 16.2354H19.1734V14.2354C19.1734 13.1263 19.7902 12.7444 20.5953 12.7444H22L21.9143 10.3626C21.212 10.2899 20.6638 10.2354 19.8587 10.2354C17.8544 10.2354 16.3469 11.5626 16.3469 13.9626Z"
                    fill={neutral[86]}
                />
            </svg>
        </a>

        <a href={links.twitter} className={socialLink} target="_blank" rel="noopener noreferrer">
            <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx="18" cy="18" r="18" className={socialLinkButton} />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M26.7059 13.7669C26.0696 14.0404 25.5059 14.2045 24.7968 14.2957C25.5423 13.8763 26.0332 13.2564 26.2696 12.4724C25.6332 12.7823 24.8878 13.2017 24.1787 13.2564C23.5787 12.6547 22.7787 12.2354 21.7605 12.2354C19.9787 12.2354 18.4878 13.7304 18.4878 15.5173C18.4878 15.7178 18.5059 16.0642 18.5787 16.2648C15.7968 16.1189 13.5241 14.8426 11.7968 12.8188C11.5605 13.3111 11.3605 13.8945 11.3605 14.478C11.3605 15.572 11.9423 16.6842 12.8332 17.2129C12.5423 17.2676 11.615 16.9759 11.3241 16.83C11.3241 18.5257 12.5059 19.7473 13.9787 20.0937C13.415 20.2396 12.9787 20.276 12.4878 20.1484C12.9423 21.4612 14.0878 22.4093 15.5423 22.4093C14.4514 23.3391 13.015 23.8314 11.4878 23.8497C11.215 23.795 10.9241 23.8497 10.7059 23.795C12.1059 24.7248 13.9241 25.2354 15.7423 25.2354C21.7605 25.2354 25.0878 20.2396 25.0878 15.9001C25.0878 15.7725 25.0514 15.6084 25.0514 15.4808C25.7059 14.9885 26.2696 14.4051 26.7059 13.7669Z"
                    fill={neutral[86]}
                />
            </svg>
        </a>

        <a href={links.email} className={socialLink} target="_blank" rel="noopener noreferrer">
            <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx="18" cy="18" r="18" className={socialLinkButton} />
                <path
                    d="M25.632 13.4248L18.8533 18.8236H17.6174L10.8387 13.4248L11.5582 12.6471H24.9125L25.632 13.4248Z"
                    fill="#F6F6F6"
                    stroke="#F6F6F6"
                    strokeWidth="0.823529"
                />
                <path
                    d="M10.2354 22.1444V15.2354L17.4734 20.3263H18.9973L26.2354 15.2354V22.1444L25.0925 23.2354H11.3782L10.2354 22.1444Z"
                    fill={neutral[86]}
                />
            </svg>
        </a>
    </div>
);
