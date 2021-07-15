import React from 'react';
import { css } from '@emotion/core';
import { Link } from '@guardian/src-link';
import { space } from '@guardian/src-foundations';
import { between } from '@guardian/src-foundations/mq';

const linksWrapper = css`
    > * {
        margin-right: ${space[2]}px;
    }
`;

const socialShareCtaStyles = css`
    color: #ffe500;
    margin-left: ${space[2]}px;

    ${between.tablet.and.desktop} {
        margin-left: 0;
    }

    &:hover {
        color: #04ffff;
    }
`;

const links = {
    facebook:
        'https://www.facebook.com/sharer/sharer.php?u=https://support.theguardian.com/contribute?INTCMP=Aus_moment_2021_banner_facebook',
    twitter:
        'https://twitter.com/intent/tweet?url=https://support.theguardian.com/contribute?INTCMP=Aus_moment_2021_banner_facebook&text=I%20support%20Guardian%20Australia%20because%20I%20believe%20in%20rigorous,%20independent%20journalism%20that%E2%80%99s%20open%20for%20everyone%20to%20read.%20Join%20me%20by%20making%20a%20contribution%20and%20together%20we%20can%20be%20a%20voice%20for%20change.%20#supportGuardianAustralia',
    email:
        'mailto:?subject=Join%20me%20in%20supporting%20open,%20independent%20journalism&body=Join%20me%20and%20over%20one%20million%20others%20in%20supporting%20a%20different%20model%20for%20open,%20independent%20journalism.%20Together%20we%20can%20help%20safeguard%20The%20Guardian%E2%80%99s%20future%20%E2%80%93%20so%20more%20people,%20across%20the%20world,%20can%20keep%20accessing%20factual%20information%20for%20free:%20https://support.theguardian.com/contribute?INTCMP=Aus_moment_2021_banner_email',
};

const supportCtaUrl = 'support.guardian.com/contribute';

export const SocialShareCta: React.FC = () => {
    return (
        <Link href={supportCtaUrl} cssOverrides={socialShareCtaStyles}>
            Share your support
        </Link>
    );
};

const iconStyles = css`
    &:hover {
        fill: #04ffff;
    }
`;

export const SocialShareIcons: React.FC = () => {
    return (
        <div>
            <div css={linksWrapper}>
                <a href={links.facebook} target="_blank" rel="noopener noreferrer">
                    <svg
                        width="36"
                        height="37"
                        viewBox="0 0 36 37"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle css={iconStyles} cx="18" cy="18.4402" r="18" fill="#FFE500" />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M16.3469 14.4028V16.6755H14V19.1846H16.3469V26.6755H19.1734V19.1846H21.4861L22 16.6755H19.1734V14.6755C19.1734 13.5664 19.7902 13.1846 20.5953 13.1846H22L21.9143 10.8028C21.212 10.7301 20.6638 10.6755 19.8587 10.6755C17.8544 10.6755 16.3469 12.0028 16.3469 14.4028Z"
                            fill="#052962"
                        />
                    </svg>
                </a>
                <a href={links.twitter} target="_blank" rel="noopener noreferrer">
                    <svg
                        width="36"
                        height="37"
                        viewBox="0 0 36 37"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle css={iconStyles} cx="18" cy="18.4402" r="18" fill="#FFE500" />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M26.7059 14.2068C26.0696 14.4803 25.5059 14.6444 24.7968 14.7356C25.5423 14.3162 26.0332 13.6963 26.2696 12.9123C25.6332 13.2223 24.8878 13.6416 24.1787 13.6963C23.5787 13.0946 22.7787 12.6753 21.7605 12.6753C19.9787 12.6753 18.4878 14.1704 18.4878 15.9572C18.4878 16.1578 18.5059 16.5042 18.5787 16.7047C15.7968 16.5589 13.5241 15.2826 11.7968 13.2587C11.5605 13.751 11.3605 14.3345 11.3605 14.9179C11.3605 16.0119 11.9423 17.1241 12.8332 17.6529C12.5423 17.7076 11.615 17.4158 11.3241 17.27C11.3241 18.9656 12.5059 20.1872 13.9787 20.5336C13.415 20.6795 12.9787 20.716 12.4878 20.5883C12.9423 21.9011 14.0878 22.8492 15.5423 22.8492C14.4514 23.7791 13.015 24.2714 11.4878 24.2896C11.215 24.2349 10.9241 24.2896 10.7059 24.2349C12.1059 25.1648 13.9241 25.6753 15.7423 25.6753C21.7605 25.6753 25.0878 20.6795 25.0878 16.3401C25.0878 16.2125 25.0514 16.0484 25.0514 15.9207C25.7059 15.4284 26.2696 14.845 26.7059 14.2068Z"
                            fill="#052962"
                        />
                    </svg>
                </a>
                <a href={links.email} target="_blank" rel="noopener noreferrer">
                    <svg
                        width="36"
                        height="37"
                        viewBox="0 0 36 37"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle css={iconStyles} cx="18" cy="18.4402" r="18" fill="#FFE500" />
                        <path
                            d="M25.632 13.864L18.8533 19.2628H17.6174L10.8387 13.864L11.5582 13.0863H24.9125L25.632 13.864Z"
                            fill="#052962"
                            stroke="#052962"
                            strokeWidth="0.823529"
                        />
                        <path
                            d="M10.2354 22.5837V15.6746L17.4734 20.7655H18.9973L26.2354 15.6746V22.5837L25.0925 23.6746H11.3782L10.2354 22.5837Z"
                            fill="#052962"
                        />
                    </svg>
                </a>
            </div>
        </div>
    );
};
