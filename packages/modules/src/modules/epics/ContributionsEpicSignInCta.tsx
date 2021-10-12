import React from 'react';
import { css } from '@emotion/react';
import { Link } from '@guardian/src-link';
import { body } from '@guardian/src-foundations/typography';
import { neutral } from '@guardian/src-foundations';

const signInLink = css`
    margin: 0;
    border-top: 1px solid ${neutral[0]};
`;

const signInLinkText = css`
    ${body.medium({ fontWeight: 'bold' })};
`;

// TODO: replace with correct UTM parameters
const signInUrl =
    'https://profile.theguardian.com/signin?utm_source=gdnwb&utm_medium=banner&utm_campaign=SubsBanner_Existing&CMP_TU=mrtn&CMP_BUNIT=subs';

export const ContributionsEpicSignInCta: React.FC = () => {
    return (
        <p css={[signInLink, signInLinkText]}>
            Already a supporter?{' '}
            <Link href={signInUrl} priority="secondary" cssOverrides={signInLinkText}>
                Sign in
            </Link>{' '}
            and we promise to ask you less.
        </p>
    );
};
