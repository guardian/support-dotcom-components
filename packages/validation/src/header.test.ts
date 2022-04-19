import { headerPayloadSchema } from './header';
import { headerPayloadFactory } from './factories';

describe('headerPayloadSchema', () => {
    it('validates a valid payload', () => {
        const payload = headerPayloadFactory.build();

        const result = headerPayloadSchema.safeParse(payload);

        expect(result.success).toBeTruthy();
    });
});
