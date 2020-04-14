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
    const isValidEmail = function(email: string): boolean {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    // Check for existence of an Epic that needs initialising
    const epicReminder = epicRoot.querySelector<HTMLElement>(
        '[data-target="contributions-epic-with-reminder"]',
    );

    if (epicReminder) {
        // Toggle reminder form via keyboard on enter key up
        const epicReminderToggle = epicReminder.querySelector<HTMLLabelElement>(
            '[data-target="toggle"]',
        );
        if (epicReminderToggle) {
            // Callback for Reminder CTA clicks
            if (typeof onReminderOpen === 'function') {
                epicReminderToggle.addEventListener('click', function(): void {
                    const epicReminderCheckbox = epicReminder.querySelector<HTMLInputElement>(
                        '[data-target="checkbox"]',
                    );
                    if (epicReminderCheckbox && epicReminderCheckbox.checked === false) {
                        const buttonCopy = epicReminderCheckbox.getAttribute('data-button-copy');
                        const buttonCopyAsString = buttonCopy
                            ? buttonCopy.toLowerCase().replace(/\s/g, '-')
                            : '';
                        onReminderOpen({
                            buttonCopyAsString,
                        } as AutomatJsCallback);
                    }
                });
            }
            // Enable keyboard toggling
            const remindButton = epicRoot.querySelector<HTMLElement>('[data-target="remind"]');
            if (remindButton) {
                remindButton.addEventListener('click', function(): void {
                    console.log('Test');
                    epicReminderToggle.click();
                });
            }
            epicReminderToggle.addEventListener('keyup', function(event: KeyboardEvent): void {
                if (event.keyCode === 13) {
                    epicReminderToggle.click();
                }
            });
        }
        const epicReminderWrapper = epicReminder.querySelector<HTMLButtonElement>(
            '[data-target="wrapper"]',
        );
        const epicReminderForm = epicReminder.querySelector<HTMLButtonElement>(
            '[data-target="form"]',
        );
        if (epicReminderWrapper && epicReminderForm) {
            epicReminderForm.addEventListener('submit', function(event: Event): void {
                event.preventDefault();
                const epicReminderInput = epicReminderWrapper.querySelector<HTMLInputElement>(
                    '[data-target="input"]',
                );
                if (epicReminderInput) {
                    const inputValue = epicReminderInput.value.trim();
                    if (!inputValue || !isValidEmail(inputValue)) {
                        // Update form state: invalid
                        epicReminderWrapper.classList.add('invalid');
                        return;
                    }
                    // Update form state: submitting
                    epicReminderWrapper.classList.add('submitting');
                    epicReminderWrapper.classList.remove('invalid');
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
                        .then(function(response) {
                            if (!response.ok) {
                                throw Error(response.statusText);
                            }
                            return response;
                        })
                        .then(function(response) {
                            return response.json();
                        })
                        .then(function(json) {
                            if (json !== 'OK') {
                                throw Error('Server error');
                            }
                            // Update form state: success
                            epicReminderWrapper.classList.add('success');
                        })
                        .catch(function(error) {
                            console.log('Error creating reminder: ', error);
                            // Update form state: error
                            epicReminderWrapper.classList.add('error');
                        })
                        .finally(function() {
                            epicReminderWrapper.classList.remove('submitting');
                        });
                }
            });
        }
    }
};
