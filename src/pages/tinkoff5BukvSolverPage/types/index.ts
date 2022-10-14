export enum T5bLetterType {
    ABSENT = 'ABSENT',
    MISPOSITIONED = 'MISPOSITIONED',
    FOUND = 'FOUND'
}

export interface T5bLetter {
    value: string | undefined;
    type: T5bLetterType;
}

export interface T5bWord {
    letters: T5bLetter[];
}

export interface Point2D {
    x: number;
    y: number;
}
