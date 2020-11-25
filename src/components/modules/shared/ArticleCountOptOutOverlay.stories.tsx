import React, { ReactElement } from 'react';
import {
    ArticleCountOptOutOverlay,
    ArticleCountOptOutOverlayProps,
} from './ArticleCountOptOutOverlay';
import { StorybookWrapper } from '../../../utils/StorybookWrapper';

export default {
    component: ArticleCountOptOutOverlay,
    title: 'Components/ArticleCountOptOutOverlay',
};

const props: ArticleCountOptOutOverlayProps = {
    type: 'banner',
    hasOptedOut: false,
    onClose: (): void => console.log('close'),
    onOptOut: (): void => console.log('close'),
};

export const Epic = (): ReactElement => {
    const epicProps: ArticleCountOptOutOverlayProps = {
        ...props,
        type: 'epic',
    };

    return (
        <StorybookWrapper>
            <ArticleCountOptOutOverlay {...epicProps} />
        </StorybookWrapper>
    );
};

export const Banner = (): ReactElement => {
    const epicProps: ArticleCountOptOutOverlayProps = {
        ...props,
        type: 'banner',
    };

    return (
        <StorybookWrapper>
            <ArticleCountOptOutOverlay {...epicProps} />
        </StorybookWrapper>
    );
};

export const UsEoyAppealBanner = (): ReactElement => {
    const epicProps: ArticleCountOptOutOverlayProps = {
        ...props,
        type: 'us-eoy-banner',
    };

    return (
        <StorybookWrapper>
            <ArticleCountOptOutOverlay {...epicProps} />
        </StorybookWrapper>
    );
};
