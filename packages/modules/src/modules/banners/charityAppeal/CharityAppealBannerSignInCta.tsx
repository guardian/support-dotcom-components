import React from 'react';
import { css } from '@emotion/react';
import { neutral, space } from '@guardian/src-foundations';
import { Link } from '@guardian/src-link';

const dfltTextColor = neutral[100];

// TODO: replace with correct UTM parameters
const signInUrl =
    'https://profile.theguardian.com/signin??utm_source=gdnwb&utm_medium=banner&utm_campaign=SigninContributionsBanner_Existing&CMP_TU=mrtn&CMP_BUNIT=subs';

const boldText = css`
    font-family: inherit;
    font-size: inherit;
    font-weight: 700;
`;

const signInCta = css`
    border-top: 1px solid ${dfltTextColor};
    margin: ${space[4]}px 0 0;
`;

const linkInCta = css`
    font-weight: bold;
    color: ${neutral[46]};
`;

type BannerSignInCtaProps = {
    onSignInClick?: () => void;
};

export const CharityAppealBannerSignInCta: React.FC<BannerSignInCtaProps> = ({ onSignInClick }) => {
    return (
        <p css={[signInCta, boldText]}>
            Already a supporter?{' '}
            <Link
                onClick={onSignInClick}
                href={signInUrl}
                priority="secondary"
                cssOverrides={boldText}
                css={linkInCta}
            >
                Sign in
            </Link>{' '}
            and we promise to ask you less.
        </p>
    );
};
