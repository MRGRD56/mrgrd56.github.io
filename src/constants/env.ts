const getEnv = (variable: string) => process.env[variable];
const getReactAppEnv = (variable: string) => getEnv('REACT_APP_' + variable);

export const GITHUB_TOKEN = getEnv('GITHUB_TOKEN');
