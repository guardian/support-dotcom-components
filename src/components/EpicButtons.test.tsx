/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { factories } from '../factories';

import { EpicButtons } from './EpicButtons';

describe('EpicButtons', () => {
    it('Renders the primary button', () => {
        const variant = factories.variant.build({
            cta: {
                text: 'Button text!',
            },
        });
        const tracking = factories.tracking.build();

        render(<EpicButtons variant={variant} tracking={tracking} />);

        expect(screen.getByText('Button text!')).toBeInTheDocument();
    });

    it('Renders nothing when no primary CTA', () => {
        const variant = factories.variant.build({
            cta: undefined,
            secondaryCta: {
                text: 'Secondary button!',
                baseUrl: 'https://support.theguardian.com/support',
            },
        });
        const tracking = factories.tracking.build();

        const { queryByTestId } = render(<EpicButtons variant={variant} tracking={tracking} />);

        expect(queryByTestId('epic-buttons')).toBeNull();
    });

    it('Does not render the reminder button when secondary CTA present', () => {
        const variant = factories.variant.build({
            cta: {
                text: 'Button text!',
                baseUrl: 'https://support.theguardian.com/support',
            },
            secondaryCta: {
                text: 'Secondary button!',
                baseUrl: 'https://support.theguardian.com/support',
            },
            showReminderFields: {
                reminderCTA: 'Reminder button!',
                reminderDateAsString: 'June',
                reminderDate: '2020-06-01T09:30:00',
            },
        });
        const tracking = factories.tracking.build();

        const { queryByText } = render(<EpicButtons variant={variant} tracking={tracking} />);

        expect(screen.getByText('Secondary button!')).toBeInTheDocument();
        expect(queryByText('Reminder button!')).toBeNull();
    });

    it('Renders the reminder button when secondary CTA is not present', () => {
        const variant = factories.variant.build({
            cta: {
                text: 'Button text!',
                baseUrl: 'https://support.theguardian.com/support',
            },
            secondaryCta: undefined,
            showReminderFields: {
                reminderCTA: 'Reminder button!',
                reminderDateAsString: 'June',
                reminderDate: '2020-06-01T09:30:00',
            },
        });
        const tracking = factories.tracking.build();

        render(<EpicButtons variant={variant} tracking={tracking} />);

        expect(screen.getByText('Reminder button!')).toBeInTheDocument();
    });
});
