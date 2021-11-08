import { getContributionsEpic } from './ContributionsEpic';
import { EpicProps } from '@sdc/shared/dist/types';

export const ContributionsEpic: React.FC<EpicProps> = getContributionsEpic(true);
