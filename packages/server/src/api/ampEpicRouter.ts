import express, { Router } from 'express';
import { getAmpExperimentData } from '../tests/amp/ampEpicSelection';
import cors from 'cors';
import {
    ChoiceCardAmounts,
    OneOffSignupRequest,
    OphanComponentEvent,
} from '@sdc/shared/dist/types';
import fetch from 'node-fetch';
import {
    buildAmpEpicCampaignCode,
    buildReminderFields,
    countryCodeToCountryGroupId,
    getLocalCurrencySymbol,
} from '@sdc/shared/dist/lib';
import { getAmpVariantAssignments } from '../lib/ampVariantAssignments';
import { ampEpic } from '../tests/amp/ampEpic';
import { isProd } from '../lib/env';
import { ValueReloader } from '../utils/valueReloader';
import { TickerDataReloader } from '../lib/fetchTickerData';
import { AmpEpicTest } from '../tests/amp/ampEpicModels';

export const setOneOffReminderEndpoint = (): string =>
    isProd
        ? 'https://support.theguardian.com/reminders/create/one-off'
        : 'https://support.code.dev-theguardian.com/reminders/create/one-off';

// TODO - pass in dependencies instead of using cacheAsync
export const buildAmpEpicRouter = (
    choiceCardAmounts: ValueReloader<ChoiceCardAmounts>,
    tickerData: TickerDataReloader,
    tests: ValueReloader<AmpEpicTest[]>,
): Router => {
    const router = Router();

    router.get(
        '/experiments_data',
        async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            try {
                const response = await getAmpExperimentData(tests.get());

                res.setHeader('Cache-Control', 'private, no-store');
                res.setHeader('Surrogate-Control', 'max-age=0');
                res.json(response);
            } catch (error) {
                next(error);
            }
        },
    );

    router.post(
        '/set_reminder',
        cors({
            origin: [
                'https://amp-theguardian-com.cdn.ampproject.org',
                'https://amp.theguardian.com',
                'http://localhost:3030',
                'https://amp.code.dev-theguardian.com',
            ],
            credentials: true,
            allowedHeaders: ['x-gu-geoip-country-code'],
        }),
        async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            try {
                const { email, reminderDate } = req.body;
                const countryCode = req.header('X-GU-GeoIP-Country-Code');
                const reminderSignupData: OneOffSignupRequest = {
                    email: email,
                    reminderPeriod: reminderDate,
                    reminderPlatform: 'AMP',
                    reminderComponent: 'EPIC',
                    reminderStage: 'PRE',
                    country: countryCode,
                };
                const setReminderResponse = await fetch(setOneOffReminderEndpoint(), {
                    body: JSON.stringify(reminderSignupData),
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                res.setHeader('Origin', req.header('Origin') || '*');
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Cache-Control', 'private, no-store');
                res.setHeader('Surrogate-Control', 'max-age=0');

                res.json(setReminderResponse.status);
            } catch (error) {
                next(error);
            }
        },
    );

    router.get(
        '/epic',
        cors({
            origin: [
                'https://amp-theguardian-com.cdn.ampproject.org',
                'https://amp.theguardian.com',
                'http://localhost:3030',
                'https://amp.code.dev-theguardian.com',
            ],
            credentials: true,
            allowedHeaders: ['x-gu-geoip-country-code'],
        }),
        async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            try {
                // We use the fastly geo header for determining the correct currency symbol
                const countryCode = req.header('X-GU-GeoIP-Country-Code') || 'GB';
                const countryGroupId = countryCodeToCountryGroupId(countryCode);
                const choiceCardAmountsSettings = choiceCardAmounts.get();
                const ampVariantAssignments = getAmpVariantAssignments(req);
                const epic = await ampEpic(
                    tests.get(),
                    ampVariantAssignments,
                    tickerData,
                    countryCode,
                );
                const defaultChoiceCardFrequency = epic.defaultChoiceCardFrequency || 'MONTHLY';
                const acquisitionData = {
                    source: 'GOOGLE_AMP',
                    componentType: 'ACQUISITIONS_EPIC',
                    componentId: epic.cta.componentId,
                    campaignCode: epic.cta.campaignCode,
                    abTest: {
                        name: epic.testName,
                        variant: epic.variantName,
                    },
                    referrerUrl: req.query.webUrl,
                };
                const ampState = {
                    ctaUrl: `${epic.cta.url}?INTCMP=${
                        epic.cta.campaignCode
                    }&acquisitionData=${JSON.stringify(acquisitionData)}`,
                    reminder: {
                        ...buildReminderFields(),
                        hideButtons: false,
                        hideReminderWrapper: true,
                        hideSuccessMessage: true,
                        hideFailureMessage: true,
                        hideReminderCta: false,
                        hideReminderForm: false,
                    },
                    choiceCards: epic.showChoiceCards
                        ? {
                              choiceCardSelection: {
                                  frequency: defaultChoiceCardFrequency,
                                  amount:
                                      choiceCardAmountsSettings[countryGroupId]['control'][
                                          defaultChoiceCardFrequency
                                      ].amounts[1],
                              },
                              amounts: {
                                  ONE_OFF: choiceCardAmountsSettings[countryGroupId]['control'][
                                      'ONE_OFF'
                                  ].amounts.slice(0, 2),
                                  MONTHLY: choiceCardAmountsSettings[countryGroupId]['control'][
                                      'MONTHLY'
                                  ].amounts.slice(0, 2),
                                  ANNUAL: choiceCardAmountsSettings[countryGroupId]['control'][
                                      'ANNUAL'
                                  ].amounts.slice(0, 2),
                              },
                              choiceCardLabelSuffix: {
                                  ONE_OFF: '',
                                  MONTHLY: ' per month',
                                  ANNUAL: ' per year',
                              },
                              classNames: {
                                  choiceCard: 'epicChoiceCard',
                                  choiceCardSelected: 'epicChoiceCard epicChoiceCardSelected',
                              },
                              currencySymbol: getLocalCurrencySymbol(countryCode),
                          }
                        : false,
                };

                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Cache-Control', 'private, no-store');
                res.setHeader('Surrogate-Control', 'max-age=0');

                res.json({ ...epic, ...ampState });
            } catch (error) {
                next(error);
            }
        },
    );

    router.get(
        '/epic_view', // IMPORTANT: do not change this route!
        cors({
            origin: [
                'https://amp-theguardian-com.cdn.ampproject.org',
                'https://amp.theguardian.com',
                'http://localhost:3030',
                'https://amp.code.dev-theguardian.com',
            ],
            credentials: true,
            allowedHeaders: ['x-gu-geoip-country-code'],
        }),
        async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            try {
                res.setHeader('Cache-Control', 'private, no-store');
                res.setHeader('Surrogate-Control', 'max-age=0');

                const countryCode = req.header('X-GU-GeoIP-Country-Code');
                const ampVariantAssignments = getAmpVariantAssignments(req);
                const epic = await ampEpic(
                    tests.get(),
                    ampVariantAssignments,
                    tickerData,
                    countryCode,
                );
                const campaignCode = buildAmpEpicCampaignCode(epic.testName, epic.variantName);
                const { viewId, ampViewId, browserIdCookie, browserId } = req.query;

                const browserIdQuery =
                    browserIdCookie && browserId ? `&${browserIdCookie}=${browserId}` : '';

                const ophanComponentEvent: OphanComponentEvent = {
                    component: {
                        componentType: 'ACQUISITIONS_EPIC',
                        products: ['CONTRIBUTION', 'MEMBERSHIP_SUPPORTER'],
                        campaignCode: campaignCode,
                        id: campaignCode,
                    },
                    abTest: {
                        name: epic.testName,
                        variant: epic.variantName,
                    },
                    action: 'VIEW',
                };

                const ophanUrl = `https://ophan.theguardian.com/img/2?viewId=${viewId}&ampViewId=${ampViewId}${browserIdQuery}&componentEvent=${encodeURI(
                    JSON.stringify(ophanComponentEvent),
                )}`;

                fetch(ophanUrl).then(ophanResponse => {
                    res.json({
                        ophanUrl: ophanUrl,
                        ophanResponseStatus: ophanResponse.status,
                    });
                });
            } catch (error) {
                next(error);
            }
        },
    );

    return router;
};