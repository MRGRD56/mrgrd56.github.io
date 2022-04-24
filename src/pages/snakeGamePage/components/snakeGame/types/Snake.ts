import SnakePart from './SnakePart';
import SnakeDirection, { directions } from './SnakeDirection';
import Point2D from './Point2D';
import SnakeGameAreaSettings from './SnakeGameAreaSettings';

class Snake {
    public constructor(public readonly parts: SnakePart[] = [], public readonly direction: SnakeDirection) {
        this.directionCoords = directions[direction];
    }

    private readonly directionCoords: Point2D;

    public setDirection(value: SnakeDirection): Snake {
        // const isTopToBottom = this.direction === SnakeDirection.TOP && value === SnakeDirection.BOTTOM;
        // const isRightToLeft = this.direction === SnakeDirection.RIGHT && value === SnakeDirection.LEFT;
        // const isBottomToTop = this.direction === SnakeDirection.BOTTOM && value === SnakeDirection.TOP;
        // const isLeftToRight = this.direction === SnakeDirection.LEFT && value === SnakeDirection.RIGHT;

        const newDirection = directions[value];

        if (this.directionCoords.x + newDirection.x === 0 && this.directionCoords.y + newDirection.y === 0) {
            return this;
        }

        return new Snake(this.parts, value);
    }

    public move({ rowCells }: SnakeGameAreaSettings): Snake {
        const newParts: SnakePart[] = this.parts.map((value, index) => {
            if (index === 0) {
                const possibleValue = value.add(this.directionCoords);
                const { x, y } = possibleValue;

                if (this.direction === SnakeDirection.LEFT && x < 0) {
                    return new SnakePart(rowCells - 1, y);
                }

                if (this.direction === SnakeDirection.RIGHT && x >= rowCells) {
                    return new SnakePart(0, y);
                }

                if (this.direction === SnakeDirection.UP && y < 0) {
                    return new SnakePart(x, rowCells - 1);
                }

                if (this.direction === SnakeDirection.DOWN && y >= rowCells) {
                    return new SnakePart(x, 0);
                }

                return possibleValue;
            }

            const previous = this.parts[index - 1];
            return previous.clone();
        });

        return new Snake(newParts, this.direction);
    }
}

export default Snake;
