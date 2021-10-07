import React from 'react';
import { css } from '@emotion/react';
import { neutral, space } from '@guardian/src-foundations';
import { Link } from '@guardian/src-link';

const signInUrl =
    'https://profile.theguardian.com/signin?utm_source=gdnwb&utm_medium=banner&utm_campaign=SubsBanner_Existing&CMP_TU=mrtn&CMP_BUNIT=subs';

const boldText = css`
    font-weight: 700;
`;

const signInCta = css`
    border-top: 1px solid ${neutral[0]};
    margin: ${space[4]}px 0 0;
`;

export const ContributionsBannerSignInCta: React.FC = () => {
    return (
        <p css={[signInCta, boldText]}>
            Already a supporter?{' '}
            <Link href={signInUrl} priority="secondary" cssOverrides={boldText}>
                Sign in
            </Link>{' '}
            and we promise to ask you less.
        </p>
    );
};
