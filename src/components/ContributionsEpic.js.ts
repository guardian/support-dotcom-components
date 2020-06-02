import { transform } from '@babel/standalone';
import { isProd } from '../lib/env';

interface InitAutomatJsConfig {
    epicRoot: HTMLElement | ShadowRoot;
    onReminderOpen?: Function;
}

interface AutomatJsCallback {
    buttonCopyAsString: string;
}

// The function returned here is going to be called on the platform and run
// client-side after the Epic has been injected in the DOM.
export const componentJs = function initAutomatJs({
    epicRoot,
    onReminderOpen,
}: InitAutomatJsConfig): void {
    // Return early if no epicRoot is set
    if (!epicRoot) {
        console.error('An epicRoot must be set when calling initAutomatJs()');
        return;
    }
    // Helper function to validate email needs to be included in this
    // function body
    const isValidEmail = (email: string): boolean => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    // Define Epic root element
    // All DOM operations are relative to this element.
    const contributionsEpic = epicRoot.querySelector<HTMLElement>(
        '[data-target="contributions-epic"]',
    );

    if (contributionsEpic) {
        // Define Epic Reminder root element
        const epicReminder = contributionsEpic.querySelector<HTMLElement>(
            '[data-target="epic-reminder"]',
        );

        // Buttons pane
        const epicButtons = contributionsEpic.querySelector<HTMLElement>(
            '[data-target="epic-buttons"]',
        );

        // Open button
        const epicOpen = contributionsEpic.querySelector<HTMLElement>('[data-target="epic-open"]');

        // Close button
        const epicClose = contributionsEpic.querySelector<HTMLElement>(
            '[data-target="epic-close"]',
        );

        // Reminder form
        const epicForm = contributionsEpic.querySelector<HTMLButtonElement>(
            '[data-target="epic-form"]',
        );

        // Implement toggling
        if (epicReminder && epicOpen && epicClose && epicButtons) {
            const applyOpenReminderStyles = (): void => {
                epicButtons.classList.add('hidden');
                epicReminder.classList.add('visible');
            };
            const applyCloseReminderStyles = (): void => {
                epicButtons.classList.remove('hidden');
                epicReminder.classList.remove('visible');
            };

            epicOpen.addEventListener('click', (): void => {
                applyOpenReminderStyles();
                if (typeof onReminderOpen === 'function') {
                    const buttonCopy = epicReminder.getAttribute('data-button-copy');
                    const buttonCopyAsString = buttonCopy
                        ? buttonCopy.toLowerCase().replace(/\s/g, '-')
                        : '';
                    onReminderOpen({
                        buttonCopyAsString,
                    } as AutomatJsCallback);
                }
            });
            epicClose.addEventListener('click', applyCloseReminderStyles);
            epicClose.addEventListener('keyup', (event: KeyboardEvent): void => {
                if (event.keyCode === 13) {
                    applyCloseReminderStyles();
                }
            });

            if (epicForm) {
                epicForm.addEventListener('submit', (event: Event): void => {
                    event.preventDefault();
                    const epicReminderInput = epicReminder.querySelector<HTMLInputElement>(
                        '[data-target="epic-input"]',
                    );
                    if (epicReminderInput) {
                        const inputValue = epicReminderInput.value.trim();
                        if (!inputValue || !isValidEmail(inputValue)) {
                            // Update form state: invalid
                            epicReminder.classList.add('invalid');
                            return;
                        }
                        // Update form state: submitting
                        epicReminder.classList.add('submitting');
                        epicReminder.classList.remove('invalid');
                        const formValues = {
                            email: inputValue,
                            reminderDate: epicForm.getAttribute('data-reminder-date'),
                            isPreContribution: true,
                        };
                        // Submit form
                        fetch('%%CONTRIBUTIONS_REMINDER_URL%%', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(formValues),
                        })
                            .then(response => {
                                if (!response.ok) {
                                    throw Error(response.statusText);
                                }
                                return response;
                            })
                            .then(response => response.json())
                            .then(json => {
                                if (json !== 'OK') {
                                    throw Error('Server error');
                                }
                                // Update form state: success
                                epicReminder.classList.add('success');
                            })
                            .catch(error => {
                                console.log('Error creating reminder: ', error);
                                // Update form state: error
                                epicReminder.classList.add('error');
                            })
                            .finally((): void => {
                                epicReminder.classList.remove('submitting');
                            });
                    }
                });
            }
        }
    }
};

export const reminderJs = (): string => {
    const contributionsReminderUrl = isProd
        ? 'https://contribution-reminders.support.guardianapis.com/remind-me'
        : 'https://contribution-reminders-code.support.guardianapis.com/remind-me';

    const js = componentJs.toString();
    const transpiled =
        transform(js, {
            presets: ['env'],
        }).code || '';

    return transpiled
        .replace('"use strict";', '')
        .replace(/%%CONTRIBUTIONS_REMINDER_URL%%/g, contributionsReminderUrl);
};
