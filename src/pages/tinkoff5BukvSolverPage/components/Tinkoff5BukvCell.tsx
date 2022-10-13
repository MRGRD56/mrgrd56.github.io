import React, { FC, useCallback, useEffect, useRef } from 'react';
import { T5bLetter, T5bLetterType } from '../types';
import styles from '../Tinkoff5BukvSolverPage.module.scss';
import classNames from 'classnames';
import getNextLetterType from '../utils/getNextLetterType';

interface Props {
    letter: T5bLetter;
    onChange: (letter: T5bLetter) => void;
    active: boolean;
    onActivate: () => void;
    onActivateNext: () => void;
    onActivatePrevious: () => void;
}

const Tinkoff5BukvCell: FC<Props> = ({ letter, onChange, active, onActivate, onActivateNext, onActivatePrevious }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const typeClassName = {
        [T5bLetterType.MISSING]: styles.typeMissing,
        [T5bLetterType.MISPOSITIONED]: styles.typeMispositioned,
        [T5bLetterType.PRESENT]: styles.typePresent
    }[letter.type];

    const handleCellClick = useCallback(
        (event: React.MouseEvent) => {
            event.stopPropagation();

            if (!active) {
                onActivate();
                return;
            }

            onChange({
                ...letter,
                type: getNextLetterType(letter.type)
            });
        },
        [active, onActivate, onChange, letter]
    );

    const handleCellInnerClick = useCallback((event: React.MouseEvent) => {
        event.stopPropagation();
    }, []);

    const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
        const nativeEvent = event.nativeEvent as InputEvent;

        console.log({ event });

        event.preventDefault();

        const insertedLetter = nativeEvent.data;

        if (
            !insertedLetter ||
            !/[абвгдеёжзийклмнопрстуфхцчшщъыьэюя]/i.test(insertedLetter) ||
            insertedLetter.length > 1
        ) {
            return;
        }

        const letters = insertedLetter.replace(/ё/gi, 'Е').toUpperCase();

        if (!letters) {
            return;
        }

        const lastLetter = letters[letters.length - 1];
        event.currentTarget.value = lastLetter;

        console.log('INPUT', { event, letters, lastLetter });

        onChange({
            ...letter,
            value: lastLetter
        });
        if (lastLetter) {
            onActivateNext();
        }
    };

    const handleBeforeInput = (event: React.FormEvent<HTMLInputElement>) => {
        const nativeEvent = event.nativeEvent as InputEvent;

        console.log('BEFORE', nativeEvent);

        if (!nativeEvent.data || !/[абвгдеёжзийклмнопрстуфхцчшщъыьэюя]/i.test(nativeEvent.data)) {
            console.log('PREVENT');
            event.preventDefault();
            return;
        }

        event.currentTarget.value = '';
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        console.log(event);
        if (event.key === 'Backspace' || event.key === 'Delete') {
            event.currentTarget.value = '';
            onChange({
                ...letter,
                value: undefined
            });

            if (event.key === 'Backspace') {
                onActivatePrevious();
            }
        }
    };

    useEffect(() => {
        if (active) {
            inputRef.current?.focus();
        }
    }, [active]);

    return (
        <label className={styles.cellLabel} onClick={handleCellClick}>
            <div className={classNames(styles.cell, typeClassName, active && styles.cellActive)}>
                {letter.value?.trim() || <>&nbsp;</>}
            </div>
            <input
                ref={inputRef}
                type="url"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                unselectable="on"
                pattern="[АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя]"
                className={styles.cellInput}
                onClick={handleCellInnerClick}
                onBeforeInput={handleBeforeInput}
                onInputCapture={handleInput}
                onKeyDown={handleKeyDown}
            />
        </label>
    );
};

export default Tinkoff5BukvCell;
