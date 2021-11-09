import { getContributionsEpic, validate } from './ContributionsEpic';
import { EpicProps } from '@sdc/shared/dist/types';
import { withParsedProps } from '../shared/ModuleWrapper';

export const ContributionsEpic: React.FC<EpicProps> = withParsedProps(
    getContributionsEpic(true),
    validate,
);
