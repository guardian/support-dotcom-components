import React from 'react';
import { EpicSeparateArticleCountTestVariants } from '../../../tests/epicArticleCountTest';
import { ContributionsEpicComponent, EpicProps } from './ContributionsEpic';

export const ContributionsEpic: React.FC<EpicProps> = ContributionsEpicComponent(
    EpicSeparateArticleCountTestVariants.above,
);
