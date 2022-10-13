export enum T5bLetterType {
    MISSING = 'MISSING',
    MISPOSITIONED = 'MISPOSITIONED',
    PRESENT = 'PRESENT'
}

export interface T5bLetter {
    value: string | undefined;
    type: T5bLetterType;
}

export interface T5bWord {
    letters: T5bLetter[];
}
