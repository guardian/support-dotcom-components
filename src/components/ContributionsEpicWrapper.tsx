import React from 'react';
import { EpicTargeting } from './ContributionsEpic';

type Props = {
    children: any;
    targeting: EpicTargeting;
};

export const ContributionsEpicWrapper: React.FC<Props> = ({ children, targeting }: Props) => {
    console.log('Targeting: ');
    console.log(targeting);
    return <>{children}</>;
};
