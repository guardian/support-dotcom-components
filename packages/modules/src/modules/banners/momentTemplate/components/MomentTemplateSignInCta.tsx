import React from 'react';
import { css } from '@emotion/react';
import { space } from '@guardian/src-foundations';
import { Link } from '@guardian/src-link';

/*
Existing SignIn URLs

ContributionsWithSignIn
'https://profile.theguardian.com/signin??utm_source=gdnwb&utm_medium=banner&utm_campaign=SigninContributionsBanner_Existing&CMP_TU=mrtn&CMP_BUNIT=subs'

DigitalSubscriptionsBanner
'https://profile.theguardian.com/signin?utm_source=gdnwb&utm_medium=banner&utm_campaign=SubsBanner_Existing&CMP_TU=mrtn&CMP_BUNIT=subs'

GuardianWeeklyBanner
'https://profile.theguardian.com/signin?utm_source=gdnwb&utm_medium=banner&utm_campaign=SubsBanner_gWeekly&CMP_TU=mrtn&CMP_BUNIT=subs'

... Which gives us a more general sign-in URL of
`https://profile.theguardian.com/signin?utm_source=gdnwb&utm_medium=banner&utm_campaign=${BANNER_TEMPLATE_AND_OR_POSSIBLY_CAMPAIGN_STRING}&CMP_TU=mrtn&CMP_BUNIT=subs`
*/
// const signInUrl =
//     'https://profile.theguardian.com/signin?utm_source=gdnwb&utm_medium=banner&utm_campaign=SigninContributionsBanner_Existing&CMP_TU=mrtn&CMP_BUNIT=subs';

const boldText = css`
    font-family: inherit;
    font-size: inherit;
    font-weight: 700;
`;

const signInCta = css`
    margin: ${space[4]}px 0;
`;

type MomentTemplateSignInCtaProps = {
    onSignInClick?: () => void;
    signInUrlTrackingValue: string;
};

export const MomentTemplateSignInCta: React.FC<MomentTemplateSignInCtaProps> = ({
    onSignInClick,
    signInUrlTrackingValue,
}) => {
    const signInUrl = `https://profile.theguardian.com/signin?utm_source=gdnwb&utm_medium=banner&utm_campaign=${signInUrlTrackingValue}&CMP_TU=mrtn&CMP_BUNIT=subs`;

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
