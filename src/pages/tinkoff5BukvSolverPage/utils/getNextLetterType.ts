import { T5bLetterType } from '../types';

const nextTypes: Record<T5bLetterType, T5bLetterType> = {
    [T5bLetterType.ABSENT]: T5bLetterType.MISPOSITIONED,
    [T5bLetterType.MISPOSITIONED]: T5bLetterType.FOUND,
    [T5bLetterType.FOUND]: T5bLetterType.ABSENT
};

const getNextLetterType = (currentType: T5bLetterType) => {
    return nextTypes[currentType];
};

export default getNextLetterType;
