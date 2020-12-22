import React from 'react';
import { Hide } from '@guardian/src-layout';
import ContributionsTemplateHeader from '../../contributionsTemplate/ContributionsTemplateHeader';
import { selectComponent } from '../helpers/xmasUpdates';

const UsEoyAppealHeader: React.FC = () => {
    const isSupporter = false;

    const BeforeDec29Copy: React.FC = () => (
        <>
            <Hide above="tablet">Help us report on a new chapter for America</Hide>
            <Hide below="tablet">
                America’s future:
                <br />
                what’s next?
            </Hide>
        </>
    );

    const Dec29To31Copy: React.FC = () => (
        <>
            <Hide above="tablet">
                {isSupporter
                    ? 'Thank you for supporting the Guardian in 2020'
                    : 'Time is running out to support the Guardian in 2020'}
            </Hide>
            <Hide below="tablet">As the clock ticks toward the new year …</Hide>
        </>
    );

    const Jan1To3Copy: React.FC = () => (
        <>
            <Hide above="tablet">Thank you for helping us reach our goal!</Hide>
            <Hide below="tablet">
                {isSupporter ? 'As America begins a new chapter …' : 'As the new year begins …'}
            </Hide>
        </>
    );

    const AfterJan3Copy: React.FC = () => (
        <>
            <Hide above="tablet">Thank you for helping us reach our goal!</Hide>
            <Hide below="tablet">Thank you for helping us beat our goal!</Hide>
        </>
    );

    const Copy = selectComponent(BeforeDec29Copy, Dec29To31Copy, Jan1To3Copy, AfterJan3Copy);

    return <ContributionsTemplateHeader copy={<Copy />} />;
};

export default UsEoyAppealHeader;
