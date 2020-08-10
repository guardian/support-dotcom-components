export const logTargeting = (message: string): void => {
    if (process.env.log_targeting === 'true') {
        console.log(message);
    }
};
