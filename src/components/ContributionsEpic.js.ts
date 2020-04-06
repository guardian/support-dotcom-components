// The function returned here is going to be called on the platform and run
// client-side after the Epic has been injected in the DOM.
export const componentJs = function initAutomatJs(epicRoot: HTMLElement): void {
    // Helper function to validate email needs to be included in this
    // function body
    const isValidEmail = (email: string): boolean => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    // Check for existence of an Epic that needs initialising
    const epicReminder = epicRoot.querySelector<HTMLElement>(
        '[data-target="contributions-epic-reminder"]',
    );

    if (epicReminder) {
        // Toggle reminder form via keyboard on enter key up
        const epicReminderToggle = epicReminder.querySelector<HTMLButtonElement>(
            '[data-target="toggle"]',
        );
        if (epicReminderToggle) {
            epicReminderToggle.addEventListener('keyup', (event: KeyboardEvent): void => {
                if (event.keyCode === 13) {
                    epicReminderToggle.click();
                }
            });
        }
        const epicReminderForm = epicReminder.querySelector<HTMLButtonElement>(
            '[data-target="form"]',
        );
        if (epicReminderForm) {
            epicReminderForm.addEventListener('submit', (event: Event): void => {
                event.preventDefault();
                const epicReminderInput = epicReminder.querySelector<HTMLInputElement>(
                    '[data-target="input"]',
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
                        reminderDate: epicReminderForm.getAttribute('data-reminder-date'),
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
                        .finally(() => epicReminder.classList.remove('submitting'));
                }
            });
        }
    }
};
