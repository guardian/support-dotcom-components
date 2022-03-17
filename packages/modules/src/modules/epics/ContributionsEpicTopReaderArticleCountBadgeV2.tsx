import { withParsedProps } from '../shared/ModuleWrapper';
import { getEpic, TopReaderArticleCountBadgeVariant, validate } from './ContributionsEpic';

const ContributionsEpic = getEpic(TopReaderArticleCountBadgeVariant.V2_CONGRATS_LEAD);

const validatedEpic = withParsedProps(ContributionsEpic, validate);
const unValidatedEpic = ContributionsEpic;
export { validatedEpic as ContributionsEpic, unValidatedEpic as ContributionsEpicUnvalidated };
