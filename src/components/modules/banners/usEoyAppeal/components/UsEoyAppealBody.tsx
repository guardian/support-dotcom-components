import React from 'react';
import { Hide } from '@guardian/src-layout';
import ContributionsTemplateBody from '../../contributionsTemplate/ContributionsTemplateBody';

interface UsEoyAppealBodyProps {
    isSupporter: boolean;
}

const UsEoyAppealBody: React.FC<UsEoyAppealBodyProps> = ({ isSupporter }: UsEoyAppealBodyProps) => (
    <ContributionsTemplateBody
        copy={
            <>
                <Hide above="tablet">
                    …the need for robust, fact-based journalism that highlights injustice and offers
                    solutions is as great as ever.
                </Hide>
                <Hide below="tablet">
                    {isSupporter ? (
                        <>
                            Trump’s presidency is ending, but America’s systemic challenges remain.
                            From a broken healthcare system to corrosive racial inequality, from
                            rapacious corporations to a climate crisis, the need for robust,
                            fact-based reporting that highlights injustice and offers solutions is
                            as great as ever. We value your ongoing support and hope you’ll consider
                            a year-end gift.
                        </>
                    ) : (
                        <>
                            Trump’s presidency is ending, but America’s systemic challenges remain.
                            From a broken healthcare system to corrosive racial inequality, from
                            rapacious corporations to a climate crisis, the need for robust,
                            fact-based reporting that highlights injustice and offers solutions is
                            as great as ever. We hope you’ll consider a year-end gift.
                        </>
                    )}
                </Hide>
            </>
        }
    />
);

export default UsEoyAppealBody;
