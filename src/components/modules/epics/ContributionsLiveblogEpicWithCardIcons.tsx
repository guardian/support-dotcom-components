import { EpicProps } from './ContributionsEpic';
import { LiveblogEpicCardIconsTestVariants } from '../../../tests/liveblogEpicCardIconsTest';
import { ContributionsLiveblogEpicComponent } from './ContributionsLiveblogEpic';

export const ContributionsLiveblogEpic: React.FC<EpicProps> = ContributionsLiveblogEpicComponent(
    LiveblogEpicCardIconsTestVariants.variant,
);
