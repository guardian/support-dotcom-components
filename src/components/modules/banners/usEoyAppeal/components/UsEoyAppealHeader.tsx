import React from 'react';
import { css } from '@emotion/core';
import { between } from '@guardian/src-foundations/mq';
import { Hide } from '@guardian/src-layout';
import ContributionsTemplateHeader from '../../contributionsTemplate/ContributionsTemplateHeader';
import { selectItem } from '../helpers/xmasUpdates';

const jan1To3Styles = css`
    ${between.desktop.and.leftCol} {
        font-size: 38px;
    }
`;

interface UsEoyAppealHeaderProps {
    isSupporter: boolean;
}
const UsEoyAppealHeader: React.FC<UsEoyAppealHeaderProps> = ({
    isSupporter,
}: UsEoyAppealHeaderProps) => {
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
                <span css={jan1To3Styles}>
                    {isSupporter ? 'As America begins a new chapter …' : 'As the new year begins …'}
                </span>
            </Hide>
        </>
    );

    const AfterJan3Copy: React.FC = () => (
        <>
            <Hide above="tablet">Thank you for helping us reach our goal!</Hide>
            <Hide below="tablet">Thank you for helping us beat our goal!</Hide>
        </>
    );

    const Copy = selectItem(BeforeDec29Copy, Dec29To31Copy, Jan1To3Copy, AfterJan3Copy);

    return <ContributionsTemplateHeader copy={<Copy />} />;
};

export default UsEoyAppealHeader;
