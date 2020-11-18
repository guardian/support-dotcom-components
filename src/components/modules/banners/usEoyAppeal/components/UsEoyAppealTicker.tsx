import React from 'react';
import { lifestyle } from '@guardian/src-foundations/palette';
import { TickerSettings } from '../../../../../lib/variants';
import ContributionsTemplateTicker from '../../contributionsTemplate/ContributionsTemplateTicker';

interface UsEoyAppealTickerProps {
    tickerSettings: TickerSettings;
}

const UsEoyAppealTicker: React.FC<UsEoyAppealTickerProps> = ({
    tickerSettings,
}: UsEoyAppealTickerProps) => (
    <ContributionsTemplateTicker settings={tickerSettings} accentColour={lifestyle[300]} />
);

export default UsEoyAppealTicker;
