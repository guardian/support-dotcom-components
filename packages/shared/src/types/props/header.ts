import { Tracking } from './shared';
import { OphanComponentEvent } from '../ophan';
import { HeaderContent } from '../tests';

export interface HeaderProps {
    content: HeaderContent;
    tracking: Tracking;
    mobileContent?: HeaderContent;
    countryCode?: string;
    submitComponentEvent?: (componentEvent: OphanComponentEvent) => void;
    numArticles?: number;
}
