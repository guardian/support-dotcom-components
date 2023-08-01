import React from 'react';
import { DigitalSubscriptionsBanner } from './DigitalSubscriptionsBanner';
import { BannerContent, BannerProps, SecondaryCtaType, Tracking } from '@sdc/shared/types';
import { StoryFn } from '@storybook/react';
import { BannerWrapper } from '../../../utils/StorybookWrapper';

export default {
    component: DigitalSubscriptionsBanner,
    title: 'Banners/Subscriptions/DigitalSubscriptionsBanner',
    parameters: {
        chromatic: {
            delay: 300,
        },
    },
};

const tracking: Tracking = {
    ophanPageId: 'kbluzw2csbf83eaberrr',
    platformId: 'GUARDIAN_WEB',
    clientName: 'dcr',
    referrerUrl: 'http://localhost:3030/Article',
    abTestName: 'DigitalSubscriptionsBanner',
    abTestVariant: 'control',
    campaignCode: '',
    componentType: 'ACQUISITIONS_SUBSCRIPTIONS_BANNER',
    products: ['DIGITAL_SUBSCRIPTION'],
};

const Template: StoryFn<BannerProps> = (props: BannerProps) => (
    <BannerWrapper>
        <DigitalSubscriptionsBanner {...props} />
    </BannerWrapper>
);

export const DefaultStory = Template.bind({});

const content: BannerContent = {
    heading:
        "You've read %%ARTICLE_COUNT%% articles in the last year. Buy digiSubs: %%PRICE_DIGISUB_MONTHLY%%.",
    messageText:
        "And you're not alone. Millions have turned to the Guardian for vital, independent journalism in the last year. Reader funding powers our reporting. It protects our independence and ensures we can remain open for all. With <strong>a digital subscription starting from %%PRICE_DIGISUB_MONTHLY%% a month</strong>, you can enjoy the richest, ad-free Guardian experience via our award-winning apps.",
    paragraphs: [
        "And you're not alone. Millions have turned to the Guardian for vital, independent journalism in the last year. Reader funding powers our reporting. It protects our independence and ensures we can remain open for all.",
        'With <strong>a digital subscription starting from %%PRICE_DIGISUB_MONTHLY%% a month</strong>, you can enjoy the richest, ad-free Guardian experience via our award-winning apps.',
    ],
};

const mobileContent: BannerContent = {
    heading: "We're powered by you",
    messageText:
        'Reader funding powers our reporting. It protects our independence and ensures we can remain open for all. With <strong>a digital subscription starting from %%PRICE_DIGISUB_ANNUAL%% a year</strong>, you can enjoy the richest, ad-free Guardian experience via our award-winning apps.',
    paragraphs: [
        'Reader funding powers our reporting. It protects our independence and ensures we can remain open for all. With <strong>a digital subscription starting from %%PRICE_DIGISUB_ANNUAL%% a year</strong>, you can enjoy the richest, ad-free Guardian experience via our award-winning apps.',
    ],
    secondaryCta: {
        type: SecondaryCtaType.Custom,
        cta: {
            text: 'Hide this',
            baseUrl: '',
        },
    },
};

DefaultStory.args = {
    bannerChannel: 'subscriptions',
    content,
    mobileContent,
    isSupporter: false,
    tracking,
    countryCode: 'GB',
    prices: {
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
    },
};

DefaultStory.storyName = 'Default Story';
