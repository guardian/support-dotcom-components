import { Stage } from '@sdc/shared/types';

// Default to PROD to avoid risk of showing test data to users
export const isProd = (stage?: Stage): boolean => !(stage === 'CODE' || stage === 'DEV');
