import { T5bLetterType } from '../types';

const nextTypes: Record<T5bLetterType, T5bLetterType> = {
    [T5bLetterType.MISSING]: T5bLetterType.MISPOSITIONED,
    [T5bLetterType.MISPOSITIONED]: T5bLetterType.PRESENT,
    [T5bLetterType.PRESENT]: T5bLetterType.MISSING
};

const getNextLetterType = (currentType: T5bLetterType) => {
    return nextTypes[currentType];
};

export default getNextLetterType;
