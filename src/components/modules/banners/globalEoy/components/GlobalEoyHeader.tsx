import React from 'react';
import { Hide } from '@guardian/src-layout';
import ContributionsTemplateHeader from '../../contributionsTemplate/ContributionsTemplateHeader';

const GlobalEoyHeader: React.FC = () => (
    <ContributionsTemplateHeader
        copy={
            <>
                <Hide above="tablet">Lorem ipsum dolor sit amet, consectetur</Hide>
                <Hide below="tablet">
                    America’s future:
                    <br />
                    what’s next?
                </Hide>
            </>
        }
    />
);

export default GlobalEoyHeader;
