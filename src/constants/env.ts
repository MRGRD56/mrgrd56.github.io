const getEnv = (variable: string) => process.env[variable];
const getReactAppEnv = (variable: string) => getEnv('REACT_APP_' + variable);

export const GITHUB_TOKEN = getReactAppEnv('GITHUB_TOKEN');
export const GITHUB_USER = getReactAppEnv('GITHUB_USER') ?? 'MRGRD56';
