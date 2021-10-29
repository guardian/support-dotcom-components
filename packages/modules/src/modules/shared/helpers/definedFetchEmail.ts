export const defineFetchEmail = (
    email: string | undefined,
    fetchEmail: (() => Promise<string | null>) | undefined,
): (() => Promise<string | null>) => {
    if (email && !fetchEmail) {
        return () => Promise.resolve(email);
    } else if (fetchEmail) {
        return fetchEmail;
    } else {
        return () => Promise.resolve(null);
    }
};
