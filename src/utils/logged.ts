/** @deprecated do not commit */
const logged = <T>(value: T, logFn: (message?: any, ...optionalParams: any[]) => void = console.log): T => {
    logFn(value);
    return value;
};

export default logged;
