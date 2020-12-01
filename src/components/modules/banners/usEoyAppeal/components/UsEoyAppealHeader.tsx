import React from 'react';
import { Hide } from '@guardian/src-layout';
import ContributionsTemplateHeader from '../../contributionsTemplate/ContributionsTemplateHeader';

const UsEoyAppealVisual: React.FC = () => (
    <ContributionsTemplateHeader
        copy={
            <>
                <Hide above="tablet">Help us report on a new chapter for America</Hide>
                <Hide below="tablet">
                    America’s future:
                    <br />
                    what’s next?
                </Hide>
            </>
        }
    />
);

export default UsEoyAppealVisual;
