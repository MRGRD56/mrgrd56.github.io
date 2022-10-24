import React, { FunctionComponent, useCallback, useMemo, useState } from 'react';
import Flex from '../../components/flex/Flex';
import PageContainer from '../../layouts/pages/pageContainer/PageContainer';
import styles from './Tinkoff5BukvSolverPage.module.scss';
import Tinkoff5BukvWord from './components/Tinkoff5BukvWord';
import { Point2D, T5bLetter, T5bLetterType, T5bWord } from './types';
import useArrayStateMutator from '../../hooks/useArrayStateMutator';
import point2d from './utils/point2d';
import T5bGame from './types/T5bGame';
import solveT5bGame from './utils/solveT5bGame';
import { useDebouncedMemo } from '../../hooks/debouncedMemo';
import { Button, Modal, Tag, Tooltip } from 'antd';
import { take } from 'lodash';
import { InfoCircleFilled } from '@ant-design/icons';
import useWriteableLocalstorageState from '../../hooks/useWriteableLocalstorageState';
import getLocalStorageKey from '../../utils/getLocalStorageKey';
import Paragraph from 'antd/lib/typography/Paragraph';
import Text from 'antd/lib/typography/Text';
import Tinkoff5BukvCell from './components/Tinkoff5BukvCell';
import { IS_MOBILE } from '../../utils/checkIsMobile';
import useAppTheme from '../../hooks/useAppTheme';
import { useAppSettingsState } from '../../hooks/useAppSettings';
import useChangeStateHandler from '../../hooks/useChangeStateHandler';
import AppTheme from '../../types/AppTheme';

const createLetter = (value?: string, type: T5bLetterType = T5bLetterType.ABSENT): T5bLetter => ({
    value,
    type
});

const createWord = (letters?: T5bLetter[]): T5bWord => {
    return {
        letters: letters ?? [createLetter(), createLetter(), createLetter(), createLetter(), createLetter()]
    };
};

const createWords = (): T5bWord[] => [
    createWord(),
    createWord(),
    createWord(),
    createWord(),
    createWord(),
    createWord()
];

const fillWord = (t5bWord: T5bWord, word: string, previous5bWord: T5bWord | undefined): T5bWord => {
    return {
        ...t5bWord,
        letters: t5bWord.letters.map((letter, index) => {
            return {
                ...letter,
                type: previous5bWord
                    ? previous5bWord.letters[index].type === T5bLetterType.FOUND
                        ? T5bLetterType.FOUND
                        : letter.type
                    : letter.type,
                value: word[index]
            };
        })
    };
};

const Tinkoff5BukvSolverPage: FunctionComponent = () => {
    const { isDarkMode } = useAppTheme();
    const { setAppSettings } = useAppSettingsState();
    const changeSettings = useChangeStateHandler(setAppSettings);

    const [words, setWords] = useState<T5bWord[]>(createWords());
    const { fpChangeByIndex: handleWordChange } = useArrayStateMutator(setWords);

    const [activeCell, setActiveCell] = useState<Point2D>();

    const [solutionLimit, setSolutionLimit] = useState<number>(100);

    const [isInfoTooltipDefaultVisible, setIsInfoTooltipDefaultVisible] = useWriteableLocalstorageState(
        getLocalStorageKey('tinkoff-5bukv-solver', 'isInfoTooltipDefaultVisible'),
        true
    );

    const [isInfoTooltipVisible, setIsInfoTooltipVisible] = useState<boolean>(isInfoTooltipDefaultVisible);
    const [isInfoModalVisible, setIsInfoModalVisible] = useState<boolean>();

    const entireSolution = useDebouncedMemo(
        () => {
            const game = new T5bGame(words);
            return solveT5bGame(game);
        },
        [words],
        50
    );

    const solution = useMemo(() => {
        return (
            entireSolution && {
                count: entireSolution.length,
                words: take(entireSolution, solutionLimit)
            }
        );
    }, [entireSolution, solutionLimit]);

    const handleActiveLetterIndexChange = useCallback(
        (wordIndex: number | undefined) => (letterIndex: number | undefined) => {
            if (wordIndex === undefined || letterIndex === undefined) {
                setActiveCell(undefined);
                return;
            }

            setActiveCell(point2d(letterIndex, wordIndex));
        },
        []
    );

    const handleOutsideFieldClick = useCallback(() => {
        setActiveCell(undefined);
    }, []);

    const handleChangeActiveCell = useCallback(
        (delta: Point2D, isHorizontalOnly?: boolean, isNoEdgesOverflow?: boolean) => {
            if (!activeCell) {
                return;
            }

            delta = point2d(Math.sign(delta.x), Math.sign(delta.y));

            if (delta.x - delta.y === 0) {
                return;
            }

            setActiveCell((index) => {
                if (!index) {
                    return index;
                }

                const indexY = index.y;
                const indexX = index.x;

                const deltaY = delta.y;
                const deltaX = delta.x;

                const currentWord = words[activeCell.y];

                const maxY = words.length - 1;
                const maxX = currentWord.letters.length - 1;

                const getMovedY = (deltaY: number, isNoOverflow?: boolean) => {
                    if (isHorizontalOnly) {
                        return indexY;
                    }

                    if (deltaY === 1 && indexY >= maxY) {
                        return isNoOverflow ? indexY : 0;
                    }
                    if (deltaY === -1 && indexY <= 0) {
                        return isNoOverflow ? indexY : maxY;
                    }
                    return indexY + deltaY;
                };

                if (deltaY) {
                    return point2d(indexX, getMovedY(deltaY));
                }

                const getMovedX = (overflowX: number, isNoOverflow: boolean) => {
                    if (overflowX === 1) {
                        return isNoOverflow ? indexX : 0;
                    }
                    if (overflowX === -1) {
                        return isNoOverflow ? indexX : maxX;
                    }
                    return indexX + deltaX;
                };

                const overflowX = deltaX === -1 && indexX <= 0 ? -1 : deltaX === 1 && indexX >= maxX ? 1 : 0;

                const movedY = getMovedY(overflowX, isNoEdgesOverflow);
                const isNoOverflowY = isNoEdgesOverflow === true && movedY === indexY;

                return point2d(getMovedX(overflowX, isNoOverflowY), movedY);
            });
        },
        [words, activeCell]
    );

    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLElement>) => {
            switch (event.key) {
                case 'ArrowUp':
                    handleChangeActiveCell(point2d(0, -1));
                    break;
                case 'ArrowDown':
                    handleChangeActiveCell(point2d(0, 1));
                    break;
                case 'ArrowLeft':
                    handleChangeActiveCell(point2d(-1, 0));
                    break;
                case 'ArrowRight':
                    handleChangeActiveCell(point2d(1, 0));
                    break;
            }
        },
        [handleChangeActiveCell]
    );

    const handleSolutionWordClick = (word: string) => () => {
        const wordToFillIndex = words.findIndex((word) => word.letters.every((letter) => !letter.value));
        if (wordToFillIndex === -1) {
            return;
        }

        const wordToFill = words[wordToFillIndex];
        const filledWord = fillWord(wordToFill, word.toUpperCase(), words[wordToFillIndex - 1]);
        handleWordChange(wordToFillIndex)(filledWord);
    };

    const handleSolutionShowMore = () => {
        setSolutionLimit((limit) => limit + 100);
    };

    const handleInfoTooltipVisibleChange = useCallback(
        (isVisible: boolean) => {
            if (!isVisible || !isInfoModalVisible) {
                setIsInfoTooltipVisible(isVisible);
            }

            if (!isVisible) {
                setIsInfoTooltipDefaultVisible(false);
            }
        },
        [isInfoModalVisible]
    );

    const handleInfoButtonClick = () => {
        setIsInfoTooltipVisible(false);
        setIsInfoModalVisible(true);
        setIsInfoTooltipDefaultVisible(false);
    };

    const handleInfoModalClose = useCallback(() => {
        setIsInfoModalVisible(false);
    }, []);

    return (
        <>
            <PageContainer
                title={
                    <Flex row gap={6} align="center">
                        <div>Tinkoff 5bukv Solver</div>
                        <Tooltip
                            title="Нажмите, чтобы узнать, как использовать сервис"
                            defaultVisible={isInfoTooltipDefaultVisible}
                            visible={isInfoTooltipVisible}
                            onVisibleChange={handleInfoTooltipVisibleChange}
                        >
                            <Button
                                icon={<InfoCircleFilled />}
                                size="small"
                                type="text"
                                onClick={handleInfoButtonClick}
                            />
                        </Tooltip>
                    </Flex>
                }
                className={styles.container}
                onClick={handleOutsideFieldClick}
                onKeyDown={handleKeyDown}
                withComments
            >
                <Flex col>
                    <Flex gap={10} col wrap="nowrap" className={styles.field}>
                        {words.map((word, index) => {
                            const activeLetterIndex =
                                activeCell === undefined
                                    ? undefined
                                    : activeCell.y === index
                                    ? activeCell.x
                                    : undefined;

                            return (
                                <Tinkoff5BukvWord
                                    key={index}
                                    word={word}
                                    onChange={handleWordChange(index)}
                                    activeLetterIndex={activeLetterIndex}
                                    onActiveLetterIndexChange={handleActiveLetterIndexChange(index)}
                                    onChangeActiveCell={handleChangeActiveCell}
                                />
                            );
                        })}
                    </Flex>

                    {solution && (
                        <Flex col gap={8} className={styles.solutionContainer}>
                            <h3 className={styles.solutionCounter}>Слов найдено: {solution.count}</h3>

                            <Flex row wrap="wrap" className={styles.solutionWordsContainer}>
                                {solution.words.map((word, index) => (
                                    <Tag
                                        key={`${word}/${index}`}
                                        className={styles.solutionWord}
                                        onClick={handleSolutionWordClick(word)}
                                    >
                                        {word}
                                    </Tag>
                                ))}
                                {solution.count > solution.words.length && (
                                    <Tag className={styles.solutionWord} onClick={handleSolutionShowMore}>
                                        ...
                                    </Tag>
                                )}
                            </Flex>
                        </Flex>
                    )}
                </Flex>
            </PageContainer>

            <Modal
                title="Как использовать решатель"
                visible={isInfoModalVisible}
                onCancel={handleInfoModalClose}
                onOk={handleInfoModalClose}
                centered
                footer={[
                    <Button key="ok" type="primary" onClick={handleInfoModalClose}>
                        Понятно
                    </Button>
                ]}
            >
                <Paragraph>
                    Данный сервис предназначен для поиска подходящих слов для игры "5&nbsp;букв" от Тинькофф.
                </Paragraph>
                <Paragraph>
                    Сверху находится поле для слов, аналогичное такому в самой игре. Оно предназначено для ввода слов и
                    задания цветов буквам, как в приложении.
                </Paragraph>
                <Paragraph>Есть два способа ввода слов:</Paragraph>
                <Paragraph>
                    <ol>
                        <li>Нажать на одну из букв (например, самую первую) и ввести на клавиатуре нужное слово;</li>
                        <li>Нажать на один из подходящих вариантов слов, перечисленных внизу страницы.</li>
                    </ol>
                </Paragraph>
                <Paragraph>
                    Затем нужно задать цвет букв, аналогичный тому, что отображается при вводе этого слова в самой игре.
                    Сделать это можно несколькими способами:
                </Paragraph>
                <Paragraph>
                    <ol>
                        <li>
                            Нажать на клетку (букву), чтобы она стала выделенной, затем нажимать на эту букву до тех
                            пор, пока не будет выбран нужный цвет;
                        </li>
                        <li>
                            <Tooltip title="Только для мобильных устройств" placement="right">
                                📱
                            </Tooltip>{' '}
                            Нажать и удерживать букву, цвет будет изменён;
                        </li>
                        <li>
                            <Tooltip title="Только для ПК" placement="right">
                                💻
                            </Tooltip>{' '}
                            Нажимать на букву правой кнопкой мыши, цвет также будет изменяться;
                        </li>
                        <li>
                            <Tooltip title="Только для ПК" placement="right">
                                💻
                            </Tooltip>{' '}
                            Нажать на букву, чтобы она стала выделена, затем нажать на клавиатуре ПК клавишу{' '}
                            <Text keyboard>Пробел</Text>.
                        </li>
                    </ol>
                </Paragraph>
                <Paragraph className="d-flex flex-column mb-0">
                    <div className="mb-1">
                        Порядок изменения цвета букв такой ({IS_MOBILE ? <>нажмите</> : <>наведите</>} для описания):
                    </div>
                    <Flex row gap={8} wrap="wrap" className={styles.infoModalExampleLettersContainer}>
                        <Tooltip title="Буква отсутствует в слове">
                            <div>
                                <Tinkoff5BukvCell
                                    letter={createLetter('А', T5bLetterType.ABSENT)}
                                    className={styles.infoModalExampleLetter}
                                    readOnly
                                />
                            </div>
                        </Tooltip>
                        <Tooltip title="Буква присутствует в слове, но находится на другой позиции">
                            <div>
                                <Tinkoff5BukvCell
                                    letter={createLetter('А', T5bLetterType.MISPOSITIONED)}
                                    className={styles.infoModalExampleLetter}
                                    readOnly
                                />
                            </div>
                        </Tooltip>
                        <Tooltip title="Буква в слове находится на этом месте">
                            <div>
                                <Tinkoff5BukvCell
                                    letter={createLetter('А', T5bLetterType.FOUND)}
                                    className={styles.infoModalExampleLetter}
                                    readOnly
                                />
                            </div>
                        </Tooltip>
                    </Flex>
                </Paragraph>
                {!isDarkMode && (
                    <Paragraph className="mt-3">
                        Рекомендуется использовать тёмную тему при использовании сервиса.{' '}
                        <a onClick={() => changeSettings('theme')(AppTheme.DARK)}>Нажмите</a>, чтобы переключить.
                    </Paragraph>
                )}
            </Modal>
        </>
    );
};

export default Tinkoff5BukvSolverPage;
