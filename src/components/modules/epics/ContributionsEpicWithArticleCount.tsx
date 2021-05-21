import React from 'react';
import { EpicArticleCountOptOutTestVariants } from '../../../tests/epics/articleCountOptOut';
import { getContributionsEpicComponent } from './ContributionsEpic';
import { EpicProps } from '../../../types/EpicTypes';

export const ContributionsEpic: React.FC<EpicProps> = getContributionsEpicComponent(
    EpicArticleCountOptOutTestVariants.new,
);
