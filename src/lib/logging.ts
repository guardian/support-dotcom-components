export const logTargeting = (message: string): void => {
    if (process.env.LOG_TARGETING === 'true') {
        console.log(message);
    }
};
