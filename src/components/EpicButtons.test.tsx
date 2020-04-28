/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import testData from './ContributionsEpic.testData';

import { EpicButtons } from './EpicButtons';

describe('EpicButtons', () => {
    it('Renders the primary button', () => {
        const variant = {
            ...testData.content,
            name: 'Example',
            showTicker: false,
            cta: {
                text: 'Button text!',
                baseUrl: 'https://support.theguardian.com/support',
            },
        };
        const tracking = testData.tracking;

        render(<EpicButtons variant={variant} tracking={tracking} />);

        expect(screen.getByText('Button text!')).toBeInTheDocument();
    });

    it('Renders nothing when no primary CTA', () => {
        const variant = {
            ...testData.content,
            name: 'Example',
            showTicker: false,
            cta: undefined,
        };
        const tracking = testData.tracking;

        const { queryByTestId } = render(<EpicButtons variant={variant} tracking={tracking} />);

        expect(queryByTestId('epic-buttons')).toBeNull();
    });
});
