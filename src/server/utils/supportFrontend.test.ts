import { fetchSupportFrontendData } from './supportFrontend';

describe('fetchSupportFrontendData', () => {
    const originalFetch = global.fetch;

    beforeAll(() => {
        global.fetch = jest.fn();
    });

    afterAll(() => {
        global.fetch = originalFetch;
    });
    it('should throw an error if no endpoint is provided', async () => {
        await expect(fetchSupportFrontendData('')).rejects.toThrow('No endpoint value supplied');
    });
    it('should throw an error if fetch response is not ok', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            status: 404,
        });
        await expect(fetchSupportFrontendData('test-endpoint')).rejects.toThrow(
            'HTTP error! Status: 404',
        );
    });

    it('should return response text if fetch is successful', async () => {
        const mockText = 'response data';
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            text: jest.fn().mockResolvedValueOnce(mockText),
        });
        const data = await fetchSupportFrontendData('test-endpoint');
        expect(data).toBe(mockText);
    });

    it('should throw an error if fetch fails', async () => {
        const mockError = new Error('Network error');
        (global.fetch as jest.Mock).mockRejectedValueOnce(mockError);
        await expect(fetchSupportFrontendData('test-endpoint')).rejects.toThrow(
            'Data fetch error: Error: Network error',
        );
    });
});
