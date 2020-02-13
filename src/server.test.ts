jest.mock('./api/contributionsApi', () => {
    return {
        fetchDefaultEpicContent: jest.fn().mockImplementation(() =>
            Promise.resolve({
                heading: 'Heading',
                paragraphs: ['Paragraph'],
                highlighted: ['Highlight'],
            }),
        ),
    };
});

import request from 'supertest';
import { app } from './server';
import testData from './components/ContributionsEpic.testData';

describe('POST /epic', () => {
    it('should return an epic when targeting is positive', async () => {
        const { tracking, localisation, targeting } = testData;

        const res = await request(app)
            .post('/epic')
            .send({
                tracking,
                localisation,
                targeting,
            });

        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty('html');
        expect(res.body.data).toHaveProperty('css');
    });

    it('should return an epic when targeting is positive and country code is null', async () => {
        const { tracking, targeting } = testData;

        const res = await request(app)
            .post('/epic')
            .send({
                tracking,
                localisation: {
                    countryCode: null,
                },
                targeting,
            });

        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty('html');
        expect(res.body.data).toHaveProperty('css');
    });

    it('returns a 400 when an invalid payload is sent', async () => {
        const res = await request(app)
            .post('/epic')
            .send({});

        expect(res.status).toEqual(400);
        expect(res.body).toHaveProperty('error');
    });
});
