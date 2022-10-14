import { T5bLetter, T5bLetterType, T5bWord } from './index';

interface PositionedLetter {
    position: number;
    letter: string;
}

class T5bGame {
    readonly absentLetters: string[];
    readonly mispositionedLetters: Record<string, Set<number>>;
    readonly foundLetters: PositionedLetter[];

    constructor(words: T5bWord[]) {
        const normalizedWords: { letters: (T5bLetter | undefined)[] }[] = words.map((word) => {
            return {
                ...word,
                letters: word.letters.map((letter) => {
                    if (!letter.value) {
                        return undefined;
                    }

                    return {
                        ...letter,
                        value: letter.value?.toLowerCase()
                    };
                })
            };
        });

        this.absentLetters = normalizedWords
            .flatMap((word) => word.letters)
            .filter((letter) => letter?.type === T5bLetterType.ABSENT)
            .map((letter) => letter?.value as string);

        this.mispositionedLetters = {};
        normalizedWords.forEach((word) => {
            word.letters.forEach((letter, letterIndex) => {
                if (letter && letter.type === T5bLetterType.MISPOSITIONED) {
                    const letterValue = letter.value as string;
                    if (this.mispositionedLetters[letterValue]) {
                        this.mispositionedLetters[letterValue] = new Set([
                            ...Array.from(this.mispositionedLetters[letterValue]),
                            letterIndex
                        ]);
                    } else {
                        this.mispositionedLetters[letterValue] = new Set([letterIndex]);
                    }
                }
            });
        });

        this.foundLetters = [];
        normalizedWords.forEach((word) => {
            word.letters.forEach((letter, letterIndex) => {
                if (letter && letter.type === T5bLetterType.FOUND) {
                    this.foundLetters.push({
                        position: letterIndex,
                        letter: letter.value as string
                    });
                }
            });
        });

        console.log({ this: this });
    }
}

export default T5bGame;
