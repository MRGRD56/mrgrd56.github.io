import React, { KeyboardEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import { Layer, Stage } from 'react-konva';
import styles from './SnakeGame.module.scss';
import SnakeGameAreaSettings from './types/SnakeGameAreaSettings';
import SnakePart from './types/SnakePart';
import SnakePartComponent from './components/snakePartComponent/SnakePartComponent';
import Snake from './types/Snake';
import SnakeDirection from './types/SnakeDirection';
import classNames from 'classnames';
import './SnakeGame.scss';
import Focused from '../../../../components/focused/Focused';

const snakeSpeed = 150;
const maxSnakeAreaSize = 500;

const getInitialSnake = (): Snake =>
    new Snake(
        [new SnakePart(6, 2), new SnakePart(5, 2), new SnakePart(4, 2), new SnakePart(3, 2), new SnakePart(2, 2)],
        SnakeDirection.RIGHT
    );

const settings = new SnakeGameAreaSettings(20);

const SnakeGame = () => {
    const [snake, setSnake] = useState<Snake>(getInitialSnake());
    const [areaWidth, setAreaWidth] = useState<number>(0);

    const containerRef = useRef<HTMLDivElement>(null);

    const handleKeyDown = useCallback<KeyboardEventHandler>((event) => {
        let newDirection: SnakeDirection;

        switch (event.key) {
            case 'w':
            case 'ArrowUp':
                newDirection = SnakeDirection.UP;
                break;
            case 'd':
            case 'ArrowRight':
                newDirection = SnakeDirection.RIGHT;
                break;
            case 's':
            case 'ArrowDown':
                newDirection = SnakeDirection.DOWN;
                break;
            case 'a':
            case 'ArrowLeft':
                newDirection = SnakeDirection.LEFT;
                break;
            default:
                return;
        }

        event.preventDefault();

        setSnake((snake) => snake.setDirection(newDirection));
    }, []);

    useEffect(() => {
        if (!containerRef.current) {
            return;
        }

        setAreaWidth(Math.min(containerRef.current.clientWidth - 16, maxSnakeAreaSize));
        containerRef.current.focus();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setSnake((snake) => snake.move(settings));
        }, snakeSpeed);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <Focused
            className={classNames(styles.container, 'focus-visible-unstyled', 'SnakeGame__container')}
            ref={containerRef}
            onKeyDown={handleKeyDown}
        >
            <Stage className={styles.canvasContainer} width={areaWidth} height={areaWidth}>
                <Layer>
                    {snake.parts.map((part, index) => (
                        <SnakePartComponent
                            key={index}
                            value={part}
                            settings={settings}
                            areaWidth={areaWidth}
                            fill="#2196f3"
                        />
                    ))}
                </Layer>
            </Stage>
        </Focused>
    );
};

export default SnakeGame;
