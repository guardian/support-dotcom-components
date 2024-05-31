import React from 'react';
import { css } from '@emotion/react';
import { neutral, space } from '@guardian/source/foundations';
import { Link } from '@guardian/source/react-components';
import type { ReactComponent } from '../../../types';

// TODO: replace with correct UTM parameters
const signInUrl =
    'https://profile.theguardian.com/signin??utm_source=gdnwb&utm_medium=banner&utm_campaign=SigninContributionsBanner_Existing&CMP_TU=mrtn&CMP_BUNIT=subs';

const boldText = css`
    font-family: inherit;
    font-size: inherit;
    font-weight: 700;
`;

const signInCta = css`
    border-top: 1px solid ${neutral[0]};
    margin: ${space[4]}px 0 0;
`;

type BannerSignInCtaProps = {
    onSignInClick?: () => void;
};

export const ContributionsBannerSignInCta: ReactComponent<BannerSignInCtaProps> = ({
    onSignInClick,
}) => {
    return (
        <p css={[signInCta, boldText]}>
            Already a supporter?{' '}
            <Link
                onClick={onSignInClick}
                href={signInUrl}
                priority="secondary"
                cssOverrides={boldText}
            >
                Sign in
            </Link>{' '}
            and we promise to ask you less.
        </p>
    );
};
