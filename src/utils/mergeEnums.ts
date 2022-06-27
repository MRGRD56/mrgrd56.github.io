const mergeEnums = <T1, T2>(e1: T1, e2: T2) => {
    return { ...e1, ...e2 };
};

export type MergeEnums<T1, T2> = T1 | T2;

export default mergeEnums;
