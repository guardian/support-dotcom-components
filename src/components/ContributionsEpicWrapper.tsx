import React from 'react';
import { EpicTargeting, Tag } from './ContributionsEpic';

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

type WorthwhileType = {
    sectionName: string;
    tags: Tag[];
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

const isEpicWorthwhile = ({ sectionName, tags }: WorthwhileType): boolean => {
    // TODO: implement exclusion rules
    return true;
};

export const ContributionsEpicWrapper: React.FC<Props> = ({ children, targeting }: Props) => {
    if (isCorrectContent(targeting) && isEpicSuitable(targeting) && isEpicWorthwhile(targeting)) {
        return children;
    }

    return null;
};
