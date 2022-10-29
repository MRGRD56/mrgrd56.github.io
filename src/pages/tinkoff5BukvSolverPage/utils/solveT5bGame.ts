import tinkoff5bukvWords from '../assets/tinkoff5bukvWords';
import T5bGame from '../types/T5bGame';
import { difference } from 'lodash';

const solveT5bGame = (game: T5bGame): string[] => {
    const mispositionedLettersEntries = Object.entries(game.mispositionedLetters).map(
        (entry) => [entry[0], Array.from(entry[1])] as const
    );

    const foundLettersList = game.foundLetters.map((letter) => letter.letter);
    const absentLetters = difference(game.absentLetters, [
        ...foundLettersList,
        ...mispositionedLettersEntries.map(([letter]) => letter)
    ]);

    return tinkoff5bukvWords.filter((word) => {
        if (
            !game.foundLetters.every((letter) => {
                return word[letter.position] === letter.letter;
            })
        ) {
            return false;
        }

        if (
            !absentLetters.every((letter) => {
                return !word.includes(letter);
            })
        ) {
            return false;
        }

        if (
            !mispositionedLettersEntries.every(([letter, wrongPositions]) => {
                return wrongPositions.every((wrongPosition) => {
                    const letterIndex = word.indexOf(letter);
                    return letterIndex !== -1 && word[wrongPosition] !== letter;
                });
            })
        ) {
            return false;
        }

        return true;
    });
};

export default solveT5bGame;
