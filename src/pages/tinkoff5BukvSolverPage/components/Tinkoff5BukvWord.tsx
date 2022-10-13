import React, { FC, useCallback } from 'react';
import { T5bLetter, T5bWord } from '../types';
import Tinkoff5BukvCell from './Tinkoff5BukvCell';
import Flex from '../../../components/flex/Flex';

interface Props {
    word: T5bWord;
    onChange: (letters: T5bWord) => void;
    activeLetterIndex: number | undefined;
    onActiveLetterIndexChange: (letterIndex: number | undefined) => void;
    onActivateNextCell: () => void;
    onActivatePreviousCell: () => void;
}

const Tinkoff5BukvWord: FC<Props> = ({
    word,
    onChange,
    activeLetterIndex,
    onActiveLetterIndexChange,
    onActivateNextCell,
    onActivatePreviousCell
}) => {
    const handleLetterChange = useCallback(
        (changedIndex: number) => (changedLetter: T5bLetter) => {
            onChange({
                ...word,
                letters: word.letters.map((letter, index) => {
                    if (index !== changedIndex) {
                        return letter;
                    }

                    return changedLetter;
                })
            });
        },
        [word, onChange]
    );

    const handleLetterActivate = useCallback(
        (index: number) => () => {
            onActiveLetterIndexChange(index);
        },
        [onChange]
    );

    return (
        <Flex gap={10} row wrap="nowrap">
            {word.letters.map((letter, index) => (
                <Tinkoff5BukvCell
                    key={index}
                    letter={letter}
                    onChange={handleLetterChange(index)}
                    active={activeLetterIndex !== undefined && activeLetterIndex === index}
                    onActivate={handleLetterActivate(index)}
                    onActivateNext={onActivateNextCell}
                    onActivatePrevious={onActivatePreviousCell}
                />
            ))}
        </Flex>
    );
};

export default Tinkoff5BukvWord;
