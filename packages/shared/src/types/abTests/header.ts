import { UserCohort, Test, Variant, TestStatus } from './shared';
import { HeaderContent } from '../props';
import { CountryGroupId } from '../../lib';
import { PurchaseInfoTest } from '../abTests';

export interface HeaderVariant extends Variant {
    name: string;
    content: HeaderContent;
    mobileContent?: HeaderContent;
    modulePathBuilder?: (version?: string) => string;
    moduleName?: string;
}

export interface HeaderTest extends Test<HeaderVariant> {
    name: string;
    status: TestStatus;
    locations: CountryGroupId[];
    userCohort: UserCohort;
    purchaseInfo?: PurchaseInfoTest;
    variants: HeaderVariant[];
}

export interface HeaderTestSelection {
    test: HeaderTest;
    variant: HeaderVariant;
    modulePathBuilder: (version?: string) => string;
    moduleName: string;
}
