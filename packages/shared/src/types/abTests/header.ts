import { testSchema, userCohortSchema, purchaseInfoTestSchema } from './shared';
import { headerContentSchema } from '../props';
import { countryGroupIdSchema } from '../../lib';
import * as z from 'zod';

/**
 * Models and schemas for data from the database
 */
const headerVariantDBSchema = z.object({
    name: z.string(),
    content: headerContentSchema,
    mobileContent: headerContentSchema.optional(),
});
export type HeaderVariantDB = z.infer<typeof headerVariantDBSchema>;

export const headerTestDBSchema = testSchema.extend({
    locations: z.array(countryGroupIdSchema),
    userCohort: userCohortSchema,
    purchaseInfo: purchaseInfoTestSchema.optional(),
    variants: z.array(headerVariantDBSchema),
});
export type HeaderTestDB = z.infer<typeof headerTestDBSchema>;

/**
 * Models with additional properties determined by the server
 */
export interface HeaderVariant extends HeaderVariantDB {
    modulePathBuilder?: (version?: string) => string;
    moduleName?: string;
}

export interface HeaderTest extends HeaderTestDB {
    variants: HeaderVariant[];
}

export interface HeaderTestSelection {
    test: HeaderTest;
    variant: HeaderVariant;
    modulePathBuilder: (version?: string) => string;
    moduleName: string;
}
