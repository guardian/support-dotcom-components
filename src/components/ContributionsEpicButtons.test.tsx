/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import testData from './ContributionsEpic.testData';

import { ContributionsEpicButtons } from './ContributionsEpicButtons';

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

        render(
            <ContributionsEpicButtons
                variant={variant}
                tracking={tracking}
                onOpenReminderClick={(): void => console.log('Reminder was clicked')}
            />,
        );

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

        const { queryByTestId } = render(
            <ContributionsEpicButtons
                variant={variant}
                tracking={tracking}
                onOpenReminderClick={(): void => console.log('Reminder was clicked')}
            />,
        );

        expect(queryByTestId('epic-buttons')).toBeNull();
    });

    it('Does not render the reminder button when secondary CTA present', () => {
        const variant = {
            ...testData.content,
            name: 'Example',
            showTicker: false,
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
        };
        const tracking = testData.tracking;

        const { queryByText } = render(
            <ContributionsEpicButtons
                variant={variant}
                tracking={tracking}
                onOpenReminderClick={(): void => console.log('Reminder was clicked')}
            />,
        );

        expect(screen.getByText('Secondary button!')).toBeInTheDocument();
        expect(queryByText('Reminder button!')).toBeNull();
    });

    it('Renders the reminder button when secondary CTA is not present', () => {
        const variant = {
            ...testData.content,
            name: 'Example',
            showTicker: false,
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
        };
        const tracking = testData.tracking;

        render(
            <ContributionsEpicButtons
                variant={variant}
                tracking={tracking}
                onOpenReminderClick={(): void => console.log('Reminder was clicked')}
            />,
        );

        expect(screen.getByText('Reminder button!')).toBeInTheDocument();
    });
});
