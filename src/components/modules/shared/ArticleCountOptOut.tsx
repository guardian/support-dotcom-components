import React, { useState } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { space } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { addCookie } from '../../../lib/cookies';

import { ArticleCountOptOutOverlay } from './ArticleCountOptOutOverlay';
import { OphanComponentEvent, OphanComponentType } from '../../../types/OphanTypes';
import {
    ophanComponentEventOptOutClose,
    ophanComponentEventOptOutConfirm,
    ophanComponentEventOptOutOpen,
} from './helpers/ophan';

const ARTICLE_COUNT_OPT_OUT_COOKIE = {
    name: 'gu_article_count_opt_out',
    daysToLive: 90,
};

const DAILY_ARTICLE_COUNT_STORAGE_KEY = 'gu.history.dailyArticleCount';
const WEEKLY_ARTICLE_COUNT_STORAGE_KEY = 'gu.history.weeklyArticleCount';

export type ArticleCountOptOutType = 'epic' | 'banner' | 'global-eoy-banner';
const isBanner = (type: ArticleCountOptOutType): boolean =>
    type === 'banner' || type === 'global-eoy-banner';

const optOutContainer = (type: ArticleCountOptOutType): SerializedStyles => css`
    display: inline-block;

    ${from.tablet} {
        ${!isBanner(type) ? 'position: relative;' : ''}
`;

const articleCountButton = css`
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    border-bottom: 1px solid;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    font-style: inherit;
    color: inherit;
    &:focus {
        outline: none !important;
    }
`;

const overlayContainer = (type: ArticleCountOptOutType): SerializedStyles => css`
    position: absolute;
    z-index: 100;
    ${isBanner(type)
        ? css`
              top: 0px;
              left: 0px;
          `
        : css`
              left: ${space[4]}px;
              right: ${space[4]}px;
              ${isBanner(type) ? 'bottom: 21px;' : ''}
          `}
    display: block;

    ${from.tablet} {
        ${isBanner(type)
            ? css`
                  top: 10px;
                  left: 10px;
                  width: 450px;
              `
            : css`
                  width: 400px;
                  left: 0;
              `}
    }
`;

export interface OphanTracking {
    componentType: OphanComponentType;
    submitComponentEvent: (componentEvent: OphanComponentEvent) => void;
}

export interface ArticleCountOptOutProps {
    numArticles: number;
    nextWord: string | null;
    type: ArticleCountOptOutType;
    tracking?: OphanTracking;
}

export const ArticleCountOptOut: React.FC<ArticleCountOptOutProps> = ({
    numArticles,
    nextWord,
    type,
    tracking,
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
        tracking &&
            tracking.submitComponentEvent(ophanComponentEventOptOutConfirm(tracking.componentType));
    };

    const onOpen = (): void => {
        setIsOpen(true);
        tracking &&
            tracking.submitComponentEvent(ophanComponentEventOptOutOpen(tracking.componentType));
    };

    const onClose = (): void => {
        setIsOpen(false);
        tracking &&
            tracking.submitComponentEvent(ophanComponentEventOptOutClose(tracking.componentType));
    };

    const onToggle = (): void => (isOpen ? onClose() : onOpen());

    return (
        <div css={optOutContainer(type)}>
            <button css={articleCountButton} onClick={onToggle}>
                {`${numArticles}${nextWord ? nextWord : ''}`}
            </button>
            {isOpen && (
                <div css={overlayContainer(type)}>
                    <ArticleCountOptOutOverlay
                        type={type}
                        hasOptedOut={hasOptedOut}
                        onOptOut={onOptOut}
                        onClose={onClose}
                    />
                </div>
            )}
        </div>
    );
};
