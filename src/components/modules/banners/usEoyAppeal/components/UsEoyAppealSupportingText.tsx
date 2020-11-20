import React from 'react';
import ContributionsTemplateSupportingText from '../../contributionsTemplate/ContributionsTemplateSupportingText';

interface UsEoyAppealSupportingTextProps {
    goalReached: boolean;
}

const UsEoyAppealSupportingText: React.FC<UsEoyAppealSupportingTextProps> = ({
    goalReached,
}: UsEoyAppealSupportingTextProps) => (
    <ContributionsTemplateSupportingText
        copy={<>{goalReached ? "We've met our goal - Thank you!" : 'Help us reach our goal'}</>}
    />
);

export default UsEoyAppealSupportingText;
