import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import { props as baseProps } from './utils/storybook';
import { ContributionsEpicUnvalidated as ContributionsEpic } from './ContributionsEpic';
import { EpicProps } from '@sdc/shared/types';

describe('ContributionsEpic', () => {
    it('renders the epic', () => {
        const heading = 'Epic';
        const props: EpicProps = { ...baseProps, variant: { ...baseProps.variant, heading } };

        const { getByText } = render(<ContributionsEpic {...props} />);

        expect(getByText(heading)).toBeInTheDocument();
    });
});
