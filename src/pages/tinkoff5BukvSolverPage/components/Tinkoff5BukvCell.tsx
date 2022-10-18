import React, { CSSProperties, FC, useCallback, useEffect, useRef } from 'react';
import { Point2D, T5bLetter, T5bLetterType } from '../types';
import styles from '../Tinkoff5BukvSolverPage.module.scss';
import classNames from 'classnames';
import getNextLetterType from '../utils/getNextLetterType';
import point2d from '../utils/point2d';

interface Props {
    letter: T5bLetter;
    onChange?: (letter: T5bLetter) => void;
    active?: boolean;
    onActivate?: () => void;
    onChangeActiveCell?: (delta: Point2D, isHorizontalOnly?: boolean, isNoEdgesOverflow?: boolean) => void;
    className?: string;
    style?: CSSProperties;
    cardClassName?: string;
    cardStyle?: CSSProperties;
}

const Tinkoff5BukvCell: FC<Props> = ({
    letter,
    onChange,
    active,
    onActivate,
    onChangeActiveCell,
    className,
    style,
    cardClassName,
    cardStyle
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const typeClassName = {
        [T5bLetterType.ABSENT]: styles.typeMissing,
        [T5bLetterType.MISPOSITIONED]: styles.typeMispositioned,
        [T5bLetterType.FOUND]: styles.typePresent
    }[letter.type];

    const handleCellClick = useCallback(
        (event: React.MouseEvent) => {
            event.stopPropagation();

            if (!active) {
                onActivate?.();
                return;
            }

            onChange?.({
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

        onChange?.({
            ...letter,
            value: lastLetter
        });
        if (lastLetter) {
            onChangeActiveCell?.(point2d(1, 0), false, true);
        }
    };

    const handleBeforeInput = (event: React.FormEvent<HTMLInputElement>) => {
        const nativeEvent = event.nativeEvent as InputEvent;

        const eventData = nativeEvent.data ?? (nativeEvent as unknown as KeyboardEvent).key;

        if (!eventData || !/[абвгдеёжзийклмнопрстуфхцчшщъыьэюя]/i.test(eventData)) {
            event.preventDefault();
            return;
        }

        event.currentTarget.value = '';
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === ' ' || event.code === 'Space') {
            onChange?.({
                ...letter,
                type: getNextLetterType(letter.type)
            });
            return;
        }

        if (event.key === 'Backspace' || event.key === 'Delete') {
            event.currentTarget.value = '';
            onChange?.({
                ...letter,
                value: undefined
            });

            if (event.key === 'Backspace') {
                onChangeActiveCell?.(point2d(-1, 0), false, true);
            } else {
                onChangeActiveCell?.(point2d(1, 0), true, true);
            }
        }
    };

    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();

        onChange?.({
            ...letter,
            type: getNextLetterType(letter.type)
        });
    };

    useEffect(() => {
        if (active) {
            inputRef.current?.focus();
        }
    }, [active]);

    return (
        <label className={classNames(styles.cellLabel, className)} onClick={handleCellClick} style={style}>
            <div
                className={classNames(styles.cell, typeClassName, active && styles.cellActive, cardClassName)}
                onContextMenu={handleContextMenu}
                style={cardStyle}
            >
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
