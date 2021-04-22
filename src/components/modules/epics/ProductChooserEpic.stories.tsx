import React from 'react';
import { Story, Meta } from '@storybook/react';
import { EpicProps } from './ContributionsEpic';
import { props, variant } from './utils/storybook';
import { from } from '@guardian/src-foundations/mq';
import { css } from '@emotion/core';
import { palette } from '@guardian/src-foundations';
import { ContributionsEpic } from './ProductChooserEpic';
import { productChooser } from '../../../tests/ProductChooserEpicTest';

const contributionsProps: EpicProps = {
    ...props,
    numArticles: 50,
    countryCode: 'GB',
    variant: {
        ...variant,
        adventure: productChooser || {},
    },
};

const containerStyles = css`
    margin: 3em auto;
    padding: 0 10px;
    max-width: 620px;

    ${from.mobileLandscape} {
        padding: 0 20px;
    }
`;

const backgroundStyles = css`
    background-color: ${palette.neutral[97]};
`;

export const EpicDecorator = (Story: Story): JSX.Element => (
    <div css={containerStyles}>
        <div css={backgroundStyles}>
            <Story />
        </div>
    </div>
);

// this gets it into storybook

export default {
    component: ContributionsEpic,
    title: 'Epics/ProductChooserEpic',
    args: contributionsProps,
    decorators: [EpicDecorator],
    excludeStories: /.*Decorator$/,
} as Meta;

const Template: Story<EpicProps> = (props: EpicProps) => <ContributionsEpic {...props} />;

export const Default = Template.bind({});
