const getLocalStorageKey = (scope: string, name: string): string => {
    return `mrgrd56:${scope}/${name}`;
};

export default getLocalStorageKey;
