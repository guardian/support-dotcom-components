import React from 'react';
import { brand } from '@guardian/src-foundations/palette';
import { TickerSettings } from '../../../../../lib/variants';
import ContributionsTemplateTicker from '../../contributionsTemplate/ContributionsTemplateTicker';

interface UsEoyAppealTickerProps {
    tickerSettings: TickerSettings;
}

const UsEoyAppealTicker: React.FC<UsEoyAppealTickerProps> = ({
    tickerSettings,
}: UsEoyAppealTickerProps) => (
    <ContributionsTemplateTicker settings={tickerSettings} accentColour={brand[400]} />
);

export default UsEoyAppealTicker;
