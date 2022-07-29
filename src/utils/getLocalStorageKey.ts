const getLocalStorageKey = (scope: string, name: string): string => {
    return `mrgrd56:${scope}/${name}`;
};

export const NULL_LOCALSTORAGE_KEY = getLocalStorageKey('global', 'null');

export default getLocalStorageKey;
