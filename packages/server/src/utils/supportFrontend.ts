export const fetchSupportFrontendData = (endpoint: string): Promise<string> => {
    return new Promise(resolve => {
        // We need to do a fetch here from the URL created from the endpoint
        // - Looks like the endpoint is open, no auth required

        // Doing this to trick TS - we will be using the endpoint to build the fetch
        console.log(endpoint);

        // For dev, resolve the raw /prices data as a JSON string
        resolve(
            JSON.stringify({
                GBPCountries: {
                    GuardianWeekly: {
                        Monthly: {
                            price: '0.00',
                        },
                        Annual: {
                            price: '0.00',
                        },
                    },
                    Digisub: {
                        Monthly: {
                            price: '0.00',
                        },
                        Annual: {
                            price: '0.00',
                        },
                    },
                },
                UnitedStates: {
                    GuardianWeekly: {
                        Monthly: {
                            price: '0.00',
                        },
                        Annual: {
                            price: '0.00',
                        },
                    },
                    Digisub: {
                        Monthly: {
                            price: '0.00',
                        },
                        Annual: {
                            price: '0.00',
                        },
                    },
                },
                EURCountries: {
                    GuardianWeekly: {
                        Monthly: {
                            price: '0.00',
                        },
                        Annual: {
                            price: '0.00',
                        },
                    },
                    Digisub: {
                        Monthly: {
                            price: '0.00',
                        },
                        Annual: {
                            price: '0.00',
                        },
                    },
                },
                AUDCountries: {
                    GuardianWeekly: {
                        Monthly: {
                            price: '0.00',
                        },
                        Annual: {
                            price: '0.00',
                        },
                    },
                    Digisub: {
                        Monthly: {
                            price: '0.00',
                        },
                        Annual: {
                            price: '0.00',
                        },
                    },
                },
                International: {
                    GuardianWeekly: {
                        Monthly: {
                            price: '0.00',
                        },
                        Annual: {
                            price: '0.00',
                        },
                    },
                    Digisub: {
                        Monthly: {
                            price: '0.00',
                        },
                        Annual: {
                            price: '0.00',
                        },
                    },
                },
                NZDCountries: {
                    GuardianWeekly: {
                        Monthly: {
                            price: '0.00',
                        },
                        Annual: {
                            price: '0.00',
                        },
                    },
                    Digisub: {
                        Monthly: {
                            price: '0.00',
                        },
                        Annual: {
                            price: '0.00',
                        },
                    },
                },
                Canada: {
                    GuardianWeekly: {
                        Monthly: {
                            price: '0.00',
                        },
                        Annual: {
                            price: '0.00',
                        },
                    },
                    Digisub: {
                        Monthly: {
                            price: '0.00',
                        },
                        Annual: {
                            price: '0.00',
                        },
                    },
                },
            }),
        );
    });
};
