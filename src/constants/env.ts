import RouterType from '../types/RouterType';

const getEnv = (variable: string) => process.env[variable];
const getReactAppEnv = (variable: string) => getEnv('REACT_APP_' + variable);

export const PUBLIC_URL = getEnv('PUBLIC_URL');
export const GITHUB_TOKEN = getReactAppEnv('GITHUB_TOKEN');
export const GITHUB_USER = getReactAppEnv('GITHUB_USER') ?? 'MRGRD56';
export const ROUTER_TYPE = (getReactAppEnv('ROUTER_TYPE') ?? 'HashRouter') as RouterType;
