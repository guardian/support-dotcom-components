import React from 'react';
import { EpicTargeting } from './ContributionsEpic';

type Props = {
    children: any;
    targeting: EpicTargeting;
};

type ContentType = {
    contentType: string;
};

type SuitableType = {
    shouldHideReaderRevenue: boolean;
    isMinuteArticle: boolean;
    isPaidContent: boolean;
};

// Determine if it's the right type of content to be considered for an epic
const isCorrectContent = ({ contentType }: ContentType): boolean => {
    const acceptedTypes = ['Article'];
    return acceptedTypes.includes(contentType);
};

// Determine if the content is suitable for an epic
const isEpicSuitable = ({
    shouldHideReaderRevenue,
    isMinuteArticle,
    isPaidContent,
}: SuitableType): boolean => {
    const isNotSuitable = [shouldHideReaderRevenue, isMinuteArticle, isPaidContent].some(
        condition => condition,
    );
    return !isNotSuitable;
};

export const ContributionsEpicWrapper: React.FC<Props> = ({ children, targeting }: Props) => {
    if (isCorrectContent(targeting) && isEpicSuitable(targeting)) {
        return children;
    }

    return null;
};
