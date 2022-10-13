import React, { FunctionComponent, useCallback, useState } from 'react';
import Flex from '../../components/flex/Flex';
import PageContainer from '../../layouts/pages/pageContainer/PageContainer';
import styles from './Tinkoff5BukvSolverPage.module.scss';
import Tinkoff5BukvWord from './components/Tinkoff5BukvWord';
import { T5bLetter, T5bLetterType, T5bWord } from './types';
import useArrayStateMutator from '../../hooks/useArrayStateMutator';

const createLetter = (): T5bLetter => ({
    value: undefined,
    type: T5bLetterType.MISSING
});

const createWord = (): T5bWord => ({
    letters: [createLetter(), createLetter(), createLetter(), createLetter(), createLetter()]
});

const createWords = (): T5bWord[] => [
    createWord(),
    createWord(),
    createWord(),
    createWord(),
    createWord(),
    createWord()
];

const Tinkoff5BukvSolverPage: FunctionComponent = () => {
    const [words, setWords] = useState<T5bWord[]>(createWords());
    const { fpChangeByIndex: handleWordChange } = useArrayStateMutator(setWords);

    const [activeCellIndex, setActiveCellIndex] = useState<[number, number]>();

    const handleActiveLetterIndexChange = useCallback(
        (wordIndex: number | undefined) => (letterIndex: number | undefined) => {
            if (wordIndex === undefined || letterIndex === undefined) {
                setActiveCellIndex(undefined);
                return;
            }

            setActiveCellIndex([wordIndex, letterIndex]);
        },
        []
    );

    const handleOutsideFieldClick = useCallback(() => {
        setActiveCellIndex(undefined);
    }, []);

    const handleChangeActiveCell = useCallback(
        (delta: [number, number], isHorizontalOnly: boolean) => {
            if (!activeCellIndex) {
                return;
            }

            delta = [Math.sign(delta[0]), Math.sign(delta[1])];

            if (delta[0] - delta[1] === 0) {
                return;
            }

            setActiveCellIndex((index) => {
                if (!index) {
                    return index;
                }

                const indexY = index[0];
                const indexX = index[1];

                const deltaY = delta[0];
                const deltaX = delta[1];

                const currentWord = words[activeCellIndex[0]];

                const maxY = words.length - 1;
                const maxX = currentWord.letters.length - 1;

                //TODO
            });
        },
        [words, activeCellIndex]
    );

    const handleActivateNextCell = useCallback(() => {
        if (!activeCellIndex) {
            return;
        }

        const currentWord = words[activeCellIndex[0]];

        const isNextWord = activeCellIndex[1] >= currentWord.letters.length - 1;

        if (!isNextWord) {
            setActiveCellIndex((index) => index && [index[0], index[1] + 1]);
            return;
        }

        const isNextFirstWord = activeCellIndex[0] >= words.length - 1;

        if (isNextFirstWord) {
            // setActiveCellIndex(index => index && [0, 0]);
        } else {
            setActiveCellIndex((index) => index && [index[0] + 1, 0]);
        }
    }, [words, activeCellIndex]);

    const handleActivatePreviousCell = useCallback(() => {
        if (!activeCellIndex) {
            return;
        }

        const isCurrentWord = activeCellIndex[1] > 0;

        if (isCurrentWord) {
            setActiveCellIndex((index) => index && [index[0], index[1] - 1]);
        }
    }, [words, activeCellIndex]);

    return (
        <PageContainer title="Tinkoff 5bukv Solver" className={styles.container} onClick={handleOutsideFieldClick}>
            <Flex gap={10} col wrap="nowrap" className={styles.field}>
                {words.map((word, index) => {
                    const activeLetterIndex =
                        activeCellIndex === undefined
                            ? undefined
                            : activeCellIndex[0] === index
                            ? activeCellIndex[1]
                            : undefined;

                    return (
                        <Tinkoff5BukvWord
                            key={index}
                            word={word}
                            onChange={handleWordChange(index)}
                            activeLetterIndex={activeLetterIndex}
                            onActiveLetterIndexChange={handleActiveLetterIndexChange(index)}
                            onActivateNextCell={handleActivateNextCell}
                            onActivatePreviousCell={handleActivatePreviousCell}
                        />
                    );
                })}
            </Flex>
        </PageContainer>
    );
};

export default Tinkoff5BukvSolverPage;
