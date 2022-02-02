import { withParsedProps } from '../shared/ModuleWrapper';
import { getContributionsEpic, InEpicPaymentVariant, validate } from './ContributionsEpic';

const ContributionsEpic = getContributionsEpic(InEpicPaymentVariant.Variant);
const validatedEpic = withParsedProps(ContributionsEpic, validate);
const unValidatedEpic = ContributionsEpic;
export { validatedEpic as ContributionsEpic, unValidatedEpic as ContributionsEpicUnvalidated };
