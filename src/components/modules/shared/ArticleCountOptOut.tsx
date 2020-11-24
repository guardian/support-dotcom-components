import React, { useState } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { space } from '@guardian/src-foundations';
import { lifestyle } from '@guardian/src-foundations/palette';
import { from } from '@guardian/src-foundations/mq';
import { addCookie } from '../../../lib/cookies';
import { ComponentType } from '../../../types/shared';

import { ArticleCountOptOutOverlay } from './ArticleCountOptOutOverlay';

const ARTICLE_COUNT_OPT_OUT_COOKIE = {
    name: 'gu_article_count_opt_out',
    daysToLive: 90,
};

const DAILY_ARTICLE_COUNT_STORAGE_KEY = 'gu.history.dailyArticleCount';
const WEEKLY_ARTICLE_COUNT_STORAGE_KEY = 'gu.history.weeklyArticleCount';

const optOutContainer = css`
    display: inline-block;

    ${from.tablet} {
        position: relative;
    }
`;

const articleCountButton = css`
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    text-decoration: underline;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    &:focus {
        outline: none !important;
    }
`;

const overlayContainer = (componentType: ComponentType): SerializedStyles => css`
    position: absolute;
    z-index: 100;
    left: ${space[4]}px;
    right: ${space[4]}px;
    ${componentType === 'banner' ? 'bottom: 21px;' : ''}

    ${from.tablet} {
        width: 325px;
        left: 0;
    }
`;

export interface ArticleCountOptOutProps {
    numArticles: number;
    nextWord: string | null;
    componentType: ComponentType;
}

export const ArticleCountOptOut: React.FC<ArticleCountOptOutProps> = ({
    numArticles,
    nextWord,
    componentType,
}: ArticleCountOptOutProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [hasOptedOut, setHasOptedOut] = useState(false);

    const addArticleCountOptOutCookie = (): void =>
        addCookie(
            ARTICLE_COUNT_OPT_OUT_COOKIE.name,
            new Date().getTime().toString(),
            ARTICLE_COUNT_OPT_OUT_COOKIE.daysToLive,
        );

    const removeArticleCountFromLocalStorage = (): void => {
        window.localStorage.removeItem(DAILY_ARTICLE_COUNT_STORAGE_KEY);
        window.localStorage.removeItem(WEEKLY_ARTICLE_COUNT_STORAGE_KEY);
    };

    const onOptOut = (): void => {
        addArticleCountOptOutCookie();
        removeArticleCountFromLocalStorage();
        setHasOptedOut(true);
    };

    const onClose = (): void => setIsOpen(false);

    return (
        <div css={optOutContainer}>
            <button css={articleCountButton} onClick={(): void => setIsOpen(!isOpen)}>
                {`${numArticles}${nextWord ? nextWord : ''}`}
            </button>
            {isOpen && (
                <div css={overlayContainer(componentType)}>
                    <ArticleCountOptOutOverlay
                        componentType={componentType}
                        hasOptedOut={hasOptedOut}
                        onOptOut={onOptOut}
                        onClose={onClose}
                    />
                </div>
            )}
        </div>
    );
};
