import { UserCohort, Test, Variant, TestStatus } from './shared';
import { HeaderContent } from '../props';
import { CountryGroupId } from '../../lib';
import { PurchaseInfo } from '../targeting';

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
    purchaseInfo?: {
        userType: PurchaseInfo['userType'][];
        product: PurchaseInfo['product'][];
    };
    isSignedIn?: boolean;
    variants: HeaderVariant[];
}

export interface HeaderTestSelection {
    test: HeaderTest;
    variant: HeaderVariant;
    modulePathBuilder: (version?: string) => string;
    moduleName: string;
}
