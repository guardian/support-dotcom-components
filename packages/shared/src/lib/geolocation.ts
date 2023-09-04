export type CountryGroupId =
    | 'GBPCountries'
    | 'UnitedStates'
    | 'AUDCountries'
    | 'EURCountries'
    | 'International'
    | 'NZDCountries'
    | 'Canada';

// Used to internationalise 'Support the Guardian' links
export type SupportRegionId = 'UK' | 'US' | 'AU' | 'EU' | 'INT' | 'NZ' | 'CA';

type IsoCurrency = 'GBP' | 'USD' | 'AUD' | 'EUR' | 'NZD' | 'CAD';

type CountryGroup = {
    name: string;
    currency: IsoCurrency;
    countries: string[];
    supportRegionId: SupportRegionId;
};

type CountryGroups = Record<CountryGroupId, CountryGroup>;

const countryGroups: CountryGroups = {
    GBPCountries: {
        name: 'United Kingdom',
        currency: 'GBP',
        countries: ['GB', 'FK', 'GI', 'GG', 'IM', 'JE', 'SH'],
        supportRegionId: 'UK',
    },
    UnitedStates: {
        name: 'United States',
        currency: 'USD',
        countries: ['US'],
        supportRegionId: 'US',
    },
    AUDCountries: {
        name: 'Australia',
        currency: 'AUD',
        countries: ['AU', 'KI', 'NR', 'NF', 'TV'],
        supportRegionId: 'AU',
    },
    EURCountries: {
        name: 'Europe',
        currency: 'EUR',
        countries: [
            'AD',
            'AL',
            'AT',
            'BA',
            'BE',
            'BG',
            'BL',
            'CH',
            'CY',
            'CZ',
            'DE',
            'DK',
            'EE',
            'ES',
            'FI',
            'FO',
            'FR',
            'GF',
            'GL',
            'GP',
            'GR',
            'HR',
            'HU',
            'IE',
            'IT',
            'LI',
            'LT',
            'LU',
            'LV',
            'MC',
            'ME',
            'MF',
            'IS',
            'MQ',
            'MT',
            'NL',
            'NO',
            'PF',
            'PL',
            'PM',
            'PT',
            'RE',
            'RO',
            'RS',
            'SE',
            'SI',
            'SJ',
            'SK',
            'SM',
            'TF',
            'TR',
            'WF',
            'YT',
            'VA',
            'AX',
            'AZ',
            'AM',
            'GE',
            'BY',
            'MD',
            'UA',
            'MK',
        ],
        supportRegionId: 'EU',
    },
    International: {
        name: 'International',
        currency: 'USD',
        countries: [
            'AE',
            'AF',
            'AG',
            'AI',
            'AO',
            'AQ',
            'AR',
            'AS',
            'AW',
            'BB',
            'BD',
            'BF',
            'BH',
            'BI',
            'BJ',
            'BM',
            'BN',
            'BO',
            'BQ',
            'BR',
            'BS',
            'BT',
            'BV',
            'BW',
            'BZ',
            'CC',
            'CD',
            'CF',
            'CG',
            'CI',
            'CL',
            'CM',
            'CN',
            'CO',
            'CR',
            'CU',
            'CV',
            'CW',
            'CX',
            'DJ',
            'DM',
            'DO',
            'DZ',
            'EC',
            'EG',
            'EH',
            'ER',
            'ET',
            'FJ',
            'FM',
            'GA',
            'GD',
            'GH',
            'GM',
            'GN',
            'GQ',
            'GS',
            'GT',
            'GU',
            'GW',
            'GY',
            'HK',
            'HM',
            'HN',
            'HT',
            'ID',
            'IL',
            'IN',
            'IO',
            'IQ',
            'IR',
            'JM',
            'JO',
            'JP',
            'KE',
            'KG',
            'KH',
            'KM',
            'KN',
            'KP',
            'KR',
            'KW',
            'KY',
            'KZ',
            'LA',
            'LB',
            'LC',
            'LK',
            'LR',
            'LS',
            'LY',
            'MA',
            'MG',
            'MH',
            'ML',
            'MM',
            'MN',
            'MO',
            'MP',
            'MR',
            'MS',
            'MU',
            'MV',
            'MW',
            'MX',
            'MY',
            'MZ',
            'NA',
            'NC',
            'NE',
            'NG',
            'NI',
            'NP',
            'NU',
            'OM',
            'PA',
            'PE',
            'PG',
            'PH',
            'PK',
            'PN',
            'PR',
            'PS',
            'PW',
            'PY',
            'QA',
            'RU',
            'RW',
            'SA',
            'SB',
            'SC',
            'SD',
            'SG',
            'SL',
            'SN',
            'SO',
            'SR',
            'SS',
            'ST',
            'SV',
            'SX',
            'SY',
            'SZ',
            'TC',
            'TD',
            'TG',
            'TH',
            'TJ',
            'TK',
            'TL',
            'TM',
            'TN',
            'TO',
            'TT',
            'TW',
            'TZ',
            'UG',
            'UM',
            'UY',
            'UZ',
            'VC',
            'VE',
            'VG',
            'VI',
            'VN',
            'VU',
            'WS',
            'YE',
            'ZA',
            'ZM',
            'ZW',
        ],
        supportRegionId: 'INT',
    },
    NZDCountries: {
        name: 'New Zealand',
        currency: 'NZD',
        countries: ['NZ', 'CK'],
        supportRegionId: 'NZ',
    },
    Canada: {
        name: 'Canada',
        currency: 'CAD',
        countries: ['CA'],
        supportRegionId: 'CA',
    },
};

export type Region = keyof typeof countryGroups;

type CountryNameMap = Record<string, string>;

const countryNames: CountryNameMap = {
    AD: 'Andorra',
    AE: 'the UAE',
    AF: 'Afghanistan',
    AG: 'Antigua and Barbuda',
    AI: 'Anguilla',
    AL: 'Albania',
    AM: 'Armenia',
    AO: 'Angola',
    AR: 'Argentina',
    AS: 'the US',
    AT: 'Austria',
    AU: 'Australia',
    AW: 'Aruba',
    AX: 'Åland Islands',
    AZ: 'Azerbaijan',
    BA: 'Bosnia and Herzegovina',
    BB: 'Barbados',
    BD: 'Bangladesh',
    BE: 'Belgium',
    BF: 'Burkina Faso',
    BG: 'Bulgaria',
    BH: 'Bahrain',
    BI: 'Burundi',
    BJ: 'Benin',
    BL: 'Saint Barthélemy',
    BM: 'Bermuda',
    BN: 'Brunei Darussalam',
    BO: 'Bolivia',
    BQ: 'Bonaire, Sint Eustatius and Saba',
    BR: 'Brazil',
    BS: 'the Bahamas',
    BT: 'Bhutan',
    BV: 'Bouvet Island',
    BW: 'Botswana',
    BY: 'Belarus',
    BZ: 'Belize',
    CA: 'Canada',
    CD: 'the Democratic Republic of the Congo',
    CF: 'the Central Africa Republic',
    CG: 'the Congo',
    CH: 'Switzerland',
    CI: "Côte d'Ivoire",
    CK: 'the Cook Islands',
    CL: 'Chile',
    CM: 'Cameroon',
    CN: 'China',
    CO: 'Colombia',
    CR: 'Costa Rica',
    CU: 'Cuba',
    CV: 'Cabo Verde',
    CW: 'Curaçao',
    CX: 'Christmas Island',
    CY: 'Cyprus',
    CZ: 'the Czech Republic',
    DE: 'Germany',
    DJ: 'Djibouti',
    DK: 'Denmark',
    DM: 'Dominica',
    DO: 'the Dominican Republic',
    DZ: 'Algeria',
    EC: 'Ecuador',
    EE: 'Estonia',
    EG: 'Egypt',
    EH: 'the Western Sahara',
    ER: 'Eritrea',
    ES: 'Spain',
    ET: 'Ethiopia',
    FI: 'Finland',
    FJ: 'Fiji',
    FK: 'the UK',
    FO: 'the UK',
    FR: 'France',
    GA: 'Gabon',
    GB: 'the UK',
    GD: 'Grenada',
    GE: 'Georgia',
    GF: 'French Guiana',
    GG: 'Guernsey',
    GH: 'Ghana',
    GI: 'Gibraltar',
    GL: 'Greenland',
    GM: 'the Gambia',
    GN: 'Guinea',
    GP: 'Guadeloupe',
    GQ: 'Equatorial Guinea',
    GR: 'Greece',
    GT: 'Guatemala',
    GU: 'Guam',
    GW: 'Guinea-Bissau',
    GY: 'Guyana',
    HK: 'Hong Kong',
    HN: 'Honduras',
    HR: 'Croatia',
    HT: 'Haiti',
    HU: 'Hungary',
    ID: 'Indonesia',
    IE: 'Ireland',
    IM: 'the Isle of Man',
    IN: 'India',
    IQ: 'Iraq',
    IR: 'Iran',
    IS: 'Iceland',
    IT: 'Italy',
    JE: 'Jersey',
    JM: 'Jamaica',
    JO: 'Jordan',
    JP: 'Japan',
    KE: 'Kenya',
    KG: 'Kyrgyzstan',
    KH: 'Cambodia',
    KI: 'Kiribati',
    KN: 'Saint Kitts and Nevis',
    KP: 'Korea',
    KR: 'Korea',
    KW: 'Kuwait',
    KY: 'the Cayman Ialnds',
    KZ: 'Kazakhstan',
    LB: 'Lebanon',
    LC: 'Saint Lucia',
    LI: 'Liechtenstein',
    LK: 'Sri Lanka',
    LR: 'Liberia',
    LS: 'Lesotho',
    LT: 'Lithuania',
    LU: 'Luxembourg',
    LV: 'Latvia',
    LY: 'Libya',
    MA: 'Morocco',
    MC: 'Monaco',
    MD: 'Moldova',
    ME: 'Montenegro',
    MG: 'Madagascar',
    MK: 'the Republic of North Macedonia',
    ML: 'Mali',
    MM: 'Myanmar',
    MN: 'Mongolia',
    MO: 'Macao',
    MQ: 'Martinique',
    MR: 'Mauritania',
    MS: 'Montserrat',
    MT: 'Malta',
    MU: 'Mauritius',
    MV: 'Maldives',
    MW: 'Malawi',
    MX: 'Mexico',
    MY: 'Malaysia',
    MZ: 'Mozambique',
    NA: 'Namibia',
    NC: 'New Caledonia',
    NE: 'Niger',
    NF: 'Norfolk Island',
    NG: 'Nigeria',
    NI: 'Nicaragua',
    NL: 'the Netherlands',
    NO: 'Norway',
    NP: 'Nepal',
    NR: 'Nauru',
    NU: 'Niue',
    NZ: 'New Zealand',
    OM: 'Oman',
    PA: 'Panama',
    PE: 'Peru',
    PF: 'French Polynesia',
    PG: 'Papua New Guinea',
    PH: 'the Philippines',
    PK: 'Pakistan',
    PL: 'Poland',
    PM: 'Saint Pierre and Miquelon',
    PN: 'Pitcairn',
    PR: 'Puerto Rico',
    PT: 'Portugal',
    PW: 'Palau',
    PY: 'Paraguay',
    QA: 'Qatar',
    RE: 'Réunion',
    RO: 'Romania',
    RU: 'Russia',
    RW: 'Rwanda',
    SA: 'Saudi Arabia',
    SB: 'Solomon Islands',
    SC: 'Seychelles',
    SD: 'Sudan',
    SE: 'Sweden',
    SG: 'Singapore',
    SH: 'Saint Helena',
    SI: 'Slovenia',
    SJ: 'Svalbard and Jan Mayen',
    SK: 'Slovakia',
    SL: 'Sierra Leone',
    SM: 'San Marino',
    SN: 'Senegal',
    SO: 'Somalia',
    SR: 'Suriname',
    SS: 'South Sudan',
    ST: 'Sao Tome and Principe',
    SV: 'El Salvador',
    SY: 'Syrian Arab Republic',
    SZ: 'Eswatini',
    TD: 'Chad',
    TG: 'Togo',
    TH: 'Thailand',
    TJ: 'Tajikistan',
    TK: 'Tokelau',
    TL: 'Timor-Leste',
    TM: 'Turkmenistan',
    TN: 'Tunisia',
    TO: 'Tonga',
    TR: 'Turkey',
    TT: 'Trinidad and Tobago',
    TV: 'Tuvalu',
    TW: 'Taiwan',
    TZ: 'Tanzania ',
    UG: 'Uganda',
    US: 'the US',
    UY: 'Uruguay',
    UZ: 'Uzbekistan',
    VC: 'Saint Vincent and the Grenadines',
    VE: 'Venezuela',
    VG: 'the Virgin Islands',
    VI: 'the Virgin Islands',
    VN: 'Vietnam',
    VU: 'Vanuatu',
    WF: 'Wallis and Futuna',
    WS: 'Samoa',
    YE: 'Yemen',
    YT: 'Mayotte',
    ZA: 'South Africa',
    ZM: 'Zambia',
    ZW: 'Zimbabwe',
};

export type CountryCodes = keyof typeof countryNames;

const extendedCurrencySymbol = {
    GBPCountries: '£',
    UnitedStates: '$',
    AUDCountries: '$',
    Canada: 'CA$',
    EURCountries: '€',
    NZDCountries: 'NZ$',
    International: '$',
};

export const countryCodeToCountryGroupId = (countryCode?: string): CountryGroupId => {
    const availableCountryGroupIds = Object.keys(countryGroups) as CountryGroupId[];

    const foundCountryGroupId = availableCountryGroupIds.find(countryGroupId =>
        countryGroups[countryGroupId].countries.includes(countryCode ?? ''),
    );

    return foundCountryGroupId || 'International';
};

export const inCountryGroups = (
    countryCode?: string,
    countryGroups: CountryGroupId[] = [],
): boolean => {
    // Always True if no locations set for the test
    if (countryGroups.length === 0) {
        return true;
    }

    // Always False if user location unknown but test has locations set
    if (!countryCode) {
        return false;
    }

    return countryGroups.includes(countryCodeToCountryGroupId(countryCode.toUpperCase()));
};

export const inCountryCodeArray = (
    countryCode?: string,
    countryCodeLocations?: CountryCodes[],
): boolean => {
    // Always True if no country codes set for the test
    if (!countryCodeLocations) {
        return true;
    }

    // Always True if no country codes set for the test
    if (countryCodeLocations.length === 0) {
        return true;
    }

    // Always False if user location unknown
    if (!countryCode) {
        return false;
    }

    return countryCodeLocations.includes(countryCode.toUpperCase());
};

const defaultCurrencySymbol = '£';

// There's an interesting issue here where the default currency symbol (£) is
// returned if we don't have a geolocation. But if we do have a geolocation, but
// fail to map back to a country group then we'll fall back to 'USD'.
// We're not sure whether this is intentional or not yet but porting as is for now
export const getLocalCurrencySymbol = (geolocation?: string): string => {
    if (geolocation) {
        const countryGroupId = countryCodeToCountryGroupId(geolocation) as CountryGroupId;
        return extendedCurrencySymbol[countryGroupId];
    }

    return defaultCurrencySymbol;
};

export const getCountryName = (geolocation?: string): string | undefined => {
    if (geolocation) {
        return countryNames[geolocation];
    }

    return undefined;
};

const countryCodeToSupportRegionId = (countryCode: string): SupportRegionId =>
    countryGroups[countryCodeToCountryGroupId(countryCode)]?.supportRegionId;

export const addRegionIdToSupportUrl = (originalUrl: string, countryCode?: string): string => {
    if (countryCode) {
        const supportRegionId = countryCodeToSupportRegionId(countryCode);
        if (supportRegionId) {
            return originalUrl.replace(
                /(support.theguardian.com)\/(contribute-in-epic|contribute|subscribe)/,
                (_, domain, path) => `${domain}/${supportRegionId.toLowerCase()}/${path}`,
            );
        }
    }

    return originalUrl;
};
