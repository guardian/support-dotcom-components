import type { NextFunction, Request, Response } from 'express';
import { interactionRateLimiter } from './interactionRateLimiter';

interface MockResponse {
    headers: Map<string, string>;
    headersSent: boolean;
    statusCode: number;
    writableEnded: boolean;
    setHeader: (name: string, value: string | number) => MockResponse;
    append: (name: string, value: string) => MockResponse;
    status: (statusCode: number) => MockResponse;
    send: (body: unknown) => MockResponse;
}

const createMockResponse = (): MockResponse => ({
    headers: new Map(),
    headersSent: false,
    statusCode: 200,
    writableEnded: false,
    setHeader(name, value) {
        this.headers.set(name, String(value));
        return this;
    },
    append(name, value) {
        const existing = this.headers.get(name);
        this.headers.set(name, existing ? `${existing}, ${value}` : value);
        return this;
    },
    status(statusCode) {
        this.statusCode = statusCode;
        return this;
    },
    send() {
        this.writableEnded = true;
        return this;
    },
});

describe('interactionRateLimiter', () => {
    it('limits each client to 60 requests per minute', async () => {
        const makeRequest = async (ip: string) => {
            const request = {
                app: { get: () => false },
                headers: {},
                ip,
            } as unknown as Request;
            const response = createMockResponse();
            const next = jest.fn() as unknown as NextFunction;

            await interactionRateLimiter(request, response as unknown as Response, next);

            return { response, next };
        };

        for (let requestNumber = 0; requestNumber < 60; requestNumber++) {
            const { response, next } = await makeRequest('203.0.113.10');
            expect(response.statusCode).toBe(200);
            expect(next).toHaveBeenCalledTimes(1);
        }

        const limitedRequest = await makeRequest('203.0.113.10');
        expect(limitedRequest.response.statusCode).toBe(429);
        expect(limitedRequest.next).not.toHaveBeenCalled();

        const otherClientRequest = await makeRequest('203.0.113.11');
        expect(otherClientRequest.response.statusCode).toBe(200);
        expect(otherClientRequest.next).toHaveBeenCalledTimes(1);
    });
});
