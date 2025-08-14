interface AuxiaAPIContextualAttributeString {
    key: string;
    stringValue: string;
}

interface AuxiaAPIContextualAttributeBoolean {
    key: string;
    boolValue: boolean;
}

interface AuxiaAPIContextualAttributeInteger {
    key: string;
    integerValue: number;
}

type AuxiaAPIGenericContexualAttribute =
    | AuxiaAPIContextualAttributeString
    | AuxiaAPIContextualAttributeBoolean
    | AuxiaAPIContextualAttributeInteger;

interface AuxiaAPISurface {
    surface: string;
    maximumTreatmentCount: number;
}

interface AuxiaProxyGetTreatmentsResponseData {
    responseId: string;
    userTreatment?: AuxiaAPIUserTreatment;
}

interface AuxiaAPILogTreatmentInteractionRequestPayload {
    projectId: string;
    userId: string;
    treatmentTrackingId: string;
    treatmentId: string;
    surface: string;
    interactionType: string;
    interactionTimeMicros: number;
    actionName: string;
}

export interface AuxiaAPIUserTreatment {
    treatmentId: string;
    treatmentTrackingId: string;
    rank: string;
    contentLanguageCode: string;
    treatmentContent: string;
    treatmentType: string;
    surface: string;
}

export interface AuxiaAPIGetTreatmentsRequestPayload {
    projectId: string;
    userId: string;
    contextualAttributes: AuxiaAPIGenericContexualAttribute[];
    surfaces: AuxiaAPISurface[];
    languageCode: string;
}

export interface AuxiaAPIGetTreatmentsResponseData {
    responseId: string;
    userTreatments: AuxiaAPIUserTreatment[];
}

export const buildGetTreatmentsRequestPayload = (
    projectId: string,
    browserId: string,
    isSupporter: boolean,
    dailyArticleCount: number,
    articleIdentifier: string,
    editionId: string,
    countryCode: string,
    hasConsented: boolean,
    shouldServeDismissible: boolean,
): AuxiaAPIGetTreatmentsRequestPayload => {
    // For the moment we are hard coding the data provided in contextualAttributes and surfaces.
    return {
        projectId: projectId,
        userId: browserId, // In our case the userId is the browserId.
        contextualAttributes: [
            {
                key: 'is_supporter',
                boolValue: isSupporter,
            },
            {
                key: 'daily_article_count',
                integerValue: dailyArticleCount,
            },
            {
                key: 'article_identifier',
                stringValue: articleIdentifier,
            },
            {
                key: 'edition',
                stringValue: editionId,
            },
            {
                key: 'country_key',
                stringValue: countryCode,
            },
            {
                key: 'has_consented',
                boolValue: hasConsented,
            },
            {
                key: 'should_not_serve_mandatory',
                boolValue: shouldServeDismissible,
            },
        ],
        surfaces: [
            {
                surface: 'ARTICLE_PAGE',
                maximumTreatmentCount: 1,
            },
        ],
        languageCode: 'en-GB',
    };
};

export const guDefaultDismissibleGateAsAnAuxiaAPIUserTreatment = (): AuxiaAPIUserTreatment => {
    // The contract we have with the client is that a gate is dismissible if the second_cta_name
    // is not empty. Otherwise the gate is Mandatory

    const title = "Sign in: it's quick and easy";
    const subtitle = 'It’s still free to read – this is not a paywall';
    const body =
        'We’re committed to keeping our quality reporting open. By registering and providing us with insight into your preferences, you’re helping us to engage with you more deeply, and that allows us to keep our journalism free for all.';
    const secondCtaName = 'I’ll do it later';
    const treatmentContent = {
        title,
        subtitle,
        body,
        first_cta_name: 'Create an account',
        first_cta_link: 'https://profile.theguardian.com/register?',
        second_cta_name: secondCtaName,
        second_cta_link: 'https://profile.theguardian.com/signin?',
    };
    const treatmentContentEncoded = JSON.stringify(treatmentContent);
    return {
        treatmentId: 'default-treatment-id',
        treatmentTrackingId: 'default-treatment-tracking-id',
        rank: '1',
        contentLanguageCode: 'en-GB',
        treatmentContent: treatmentContentEncoded,
        treatmentType: 'DISMISSABLE_SIGN_IN_GATE',
        surface: 'ARTICLE_PAGE',
    };
};

export const guDefaultMandatoryGateAsAnAuxiaAPIUserTreatment = (): AuxiaAPIUserTreatment => {
    // The contract we have with the client is that a gate is dismissible if the second_cta_name
    // is not empty. Otherwise the gate is Mandatory

    const title = "Sign in: it's quick and easy";
    const subtitle = 'It’s still free to read – this is not a paywall';
    const body =
        'We’re committed to keeping our quality reporting open. By registering and providing us with insight into your preferences, you’re helping us to engage with you more deeply, and that allows us to keep our journalism free for all.';
    const treatmentContent = {
        title,
        subtitle,
        body,
        first_cta_name: 'Create an account',
        first_cta_link: 'https://profile.theguardian.com/register?',
        second_cta_name: '', // empty string here makes the gate mandatory
        second_cta_link: '',
    };
    const treatmentContentEncoded = JSON.stringify(treatmentContent);
    return {
        treatmentId: 'default-treatment-id',
        treatmentTrackingId: 'default-treatment-tracking-id',
        rank: '1',
        contentLanguageCode: 'en-GB',
        treatmentContent: treatmentContentEncoded,
        treatmentType: 'DISMISSABLE_SIGN_IN_GATE',
        surface: 'ARTICLE_PAGE',
    };
};

export const guDefaultGateGetTreatmentsResponseData = (
    gateDismissCount: number,
    gateDisplayCount: number,
    countryCode: string,
): AuxiaAPIGetTreatmentsResponseData => {
    const responseId = ''; // This value is not important, it is not used by the client.

    // First we enforce the GU policy of not showing the gate if the user has dismissed it more than 5 times.
    // (We do not want users to have to dismiss the gate 6 times)

    if (gateDismissCount > 5) {
        return {
            responseId,
            userTreatments: [],
        };
    }

    // We are now clear to show the default gu gate.

    // (comment group: 04f093f0)

    // gateDisplayCount was introduced to enrich the behavior of the default gate.
    // That number represents the number of times the gate has been displayed, excluding the
    // current rendering. Therefore the first time the number is 0.

    // At the time these lines are written we want the experience for non consented users
    // in Ireland to be that the gates, as they display are (first line) corresponding
    // to values of gateDisplayCount (second line)
    //  -------------------------------------------------------------------------
    // | dismissible | dismissible | dismissible | mandatory (remains mandatory) |
    // |     0       |      1      |      2      |      3           etc          |
    //  -------------------------------------------------------------------------

    // For non consenting users outside ireland, the behavior remains the same

    if (countryCode !== 'IE') {
        const data: AuxiaAPIGetTreatmentsResponseData = {
            responseId,
            userTreatments: [guDefaultDismissibleGateAsAnAuxiaAPIUserTreatment()],
        };
        return data;
    }

    let data: AuxiaAPIGetTreatmentsResponseData;

    if (gateDisplayCount >= 3) {
        data = {
            responseId,
            userTreatments: [guDefaultMandatoryGateAsAnAuxiaAPIUserTreatment()],
        };
    } else {
        data = {
            responseId,
            userTreatments: [guDefaultDismissibleGateAsAnAuxiaAPIUserTreatment()],
        };
    }

    return data;
};

export const isValidContentType = (contentType: string): boolean => {
    const validTypes = ['Article'];
    return validTypes.includes(contentType);
};

export const isValidSection = (sectionId: string): boolean => {
    const invalidSections = [
        'about',
        'info',
        'membership',
        'help',
        'guardian-live-australia',
        'gnm-archive',
    ];
    return !invalidSections.includes(sectionId);
};

export const isValidTagIdCollection = (tagIds: string[]): boolean => {
    const invalidTagIds = ['info/newsletter-sign-up'];
    // Check that no tagId is in the invalidTagIds list.
    return !tagIds.some((tagId: string): boolean => invalidTagIds.includes(tagId));
};

export const buildAuxiaProxyGetTreatmentsResponseData = (
    auxiaData: AuxiaAPIGetTreatmentsResponseData,
): AuxiaProxyGetTreatmentsResponseData | undefined => {
    // Note the small difference between AuxiaAPIResponseData and AuxiaProxyResponseData
    // In the case of AuxiaProxyResponseData, we have an optional userTreatment field, instead of an array of userTreatments.
    // This is to reflect the what the client expect semantically.

    return {
        responseId: auxiaData.responseId,
        userTreatment: auxiaData.userTreatments[0],
    };
};

export const buildLogTreatmentInteractionRequestPayload = (
    projectId: string,
    browserId: string,
    treatmentTrackingId: string,
    treatmentId: string,
    surface: string,
    interactionType: string,
    interactionTimeMicros: number,
    actionName: string,
): AuxiaAPILogTreatmentInteractionRequestPayload => {
    return {
        projectId: projectId,
        userId: browserId, // In our case the userId is the browserId.
        treatmentTrackingId,
        treatmentId,
        surface,
        interactionType,
        interactionTimeMicros,
        actionName,
    };
};

export const articleIdentifierIsAllowed = (articleIdentifier: string): boolean => {
    // This function was introduced to handle the specific request of not showing a gate for
    // this url: https://www.theguardian.com/tips
    // articleIdentifier are given to the end point under the following format:
    // - 'www.theguardian.com/money/2017/mar/10/ministers-to-criminalise-use-of-ticket-tout-harvesting-software'
    // - 'www.theguardian.com/tips'

    // For the moment we are only going to check for that one string, we will refactor
    // if more come in in the future

    const denyPrefixes = [
        'www.theguardian.com/tips',
        'www.theguardian.com/help/ng-interactive/2017/mar/17/contact-the-guardian-securely',
    ];

    return !denyPrefixes.some((denyIdentifer) => articleIdentifier.startsWith(denyIdentifer));
};

export const mvtIdIsAuxiaAudienceShare = (mvtId: number): boolean => {
    /*
        In May 2025, we decided that we would decommission the old / previous definition
        of the Auxia share of the audience, which was done using a client side defined AB test,
        by which the "first" 35% of the audience is sent to Auxia, and the rest (65%) split between
        "SignInGateMainVariant" and "SignInGateMainControl"
        (
            https://github.com/guardian/dotcom-rendering/blob/d6e44406cffb362c99d5734f6e82f6e664682da8/dotcom-rendering/src/experiments/tests/auxia-sign-in-gate.ts
        )

        ... and move to those shares being controlled by SDC and in particular SDC's default gate
        taking over the old gate hard coded into DCR.

        To maintain invariance of how the cohorts are defined, SDC, must be able to convert a
        mvtId into a share of audience. Passing the mvtId to the GetTreatment call was done in these two PRs:

        https://github.com/guardian/dotcom-rendering/pull/13938
        https://github.com/guardian/dotcom-rendering/pull/13941

        In particular we must be able to take a mvtId and simply return
        a boolean indicating whether or not it is in the first 35% of the audience. This is what this function
        does.

        This is the function that needs to be modified when we want to increase the share of the
        audience given to the Auxia experiment in the future.
    */

    // The MVT calculator is very useful: https://ab-tests.netlify.app

    // The Auxia experiment is 35% audience with 0% offset.

    // The value numbers we are interested in are between 1 and 350_000 [1]
    // (essentially the first 35% of the total of 1_000_000 possible values for mvtId)

    // [1] Interestingly, 0 is not considered a valid mvtId number.

    return mvtId > 0 && mvtId <= 350_000;
};

export const callGetTreatments = async (
    apiKey: string,
    projectId: string,
    browserId: string | undefined,
    isSupporter: boolean,
    dailyArticleCount: number,
    articleIdentifier: string,
    editionId: string,
    countryCode: string,
    hasConsented: boolean,
    shouldServeDismissible: boolean,
): Promise<AuxiaAPIGetTreatmentsResponseData | undefined> => {
    // We now have clearance to call the Auxia API.

    // If the browser id could not be recovered client side, then we do not call auxia
    if (browserId === undefined) {
        return;
    }

    const url = 'https://apis.auxia.io/v1/GetTreatments';

    const headers = {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
    };

    const payload = buildGetTreatmentsRequestPayload(
        projectId,
        browserId,
        isSupporter,
        dailyArticleCount,
        articleIdentifier,
        editionId,
        countryCode,
        hasConsented,
        shouldServeDismissible,
    );

    const params = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload),
    };

    try {
        const response = await fetch(url, params);
        const responseBody = (await response.json()) as {
            userTreatments: AuxiaAPIUserTreatment[] | undefined;
        };

        // nb: In some circumstances, for instance if the payload although having the right
        // schema, is going to fail Auxia's validation then the response body may not contain
        // the userTreatments field. In this case we return undefined.
        if (responseBody['userTreatments'] === undefined) {
            return Promise.resolve(undefined);
        }
        const data = responseBody as AuxiaAPIGetTreatmentsResponseData;
        return Promise.resolve(data);
    } catch (error) {
        return Promise.resolve(undefined);
    }
};

export const callLogTreatmentInteration = async (
    apiKey: string,
    projectId: string,
    browserId: string | undefined,
    treatmentTrackingId: string,
    treatmentId: string,
    surface: string,
    interactionType: string,
    interactionTimeMicros: number,
    actionName: string,
): Promise<void> => {
    // If the browser id could not be recovered client side, then we do not call auxia
    if (browserId === undefined) {
        return;
    }

    const url = 'https://apis.auxia.io/v1/LogTreatmentInteraction';

    const headers = {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
    };

    const payload = buildLogTreatmentInteractionRequestPayload(
        projectId,
        browserId,
        treatmentTrackingId,
        treatmentId,
        surface,
        interactionType,
        interactionTimeMicros,
        actionName,
    );

    const params = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload),
    };

    await fetch(url, params);

    // We are not consuming an answer from the server, so we are not returning anything.
};
