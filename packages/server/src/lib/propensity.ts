import { createClient } from 'redis';

export async function getUserPropensity(browserId: string): Promise<number | null> {
    const client = createClient();
    await client.connect();
    const value = await client.get(`gw:${browserId}`);
    console.log({ value });
    await client.quit();

    return value ? parseFloat(value) : null;
}
