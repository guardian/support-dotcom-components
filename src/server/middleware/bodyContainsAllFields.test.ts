import type express from 'express';
import { bodyContainsAllFields } from './bodyContainsAllFields';

describe('bodyContainsAllFields', () => {
    const sendStatus = jest.fn();
    const res = { sendStatus } as unknown as express.Response;
    const next = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it.each([undefined, null, '', 'targeting', 0, 1, false, true, {}, []])(
        'responds with 400 for a body without the required fields: %p',
        (body) => {
            const req = { body } as express.Request;

            bodyContainsAllFields(['targeting'])(req, res, next);

            expect(sendStatus).toHaveBeenCalledWith(400);
            expect(next).not.toHaveBeenCalled();
        },
    );

    it('continues to the route handler when the required fields are present', () => {
        const req = { body: { targeting: { countryCode: 'GB' } } } as express.Request;

        bodyContainsAllFields(['targeting'])(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(sendStatus).not.toHaveBeenCalled();
    });

    it('responds with 400 when any required field is missing', () => {
        const req = { body: { targeting: {} } } as express.Request;

        bodyContainsAllFields(['targeting', 'tracking'])(req, res, next);

        expect(sendStatus).toHaveBeenCalledWith(400);
        expect(next).not.toHaveBeenCalled();
    });

    it('accepts required fields whose values are falsy', () => {
        const req = {
            body: { isSupporter: false, dailyArticleCount: 0, countryCode: '' },
        } as express.Request;

        bodyContainsAllFields(['isSupporter', 'dailyArticleCount', 'countryCode'])(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(sendStatus).not.toHaveBeenCalled();
    });
});
