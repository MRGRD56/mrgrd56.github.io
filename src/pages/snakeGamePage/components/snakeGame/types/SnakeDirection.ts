import Point2D from './Point2D';

enum SnakeDirection {
    UP,
    RIGHT,
    DOWN,
    LEFT
}

export const directions: Readonly<Record<SnakeDirection, Point2D>> = {
    [SnakeDirection.UP]: new Point2D(0, -1),
    [SnakeDirection.RIGHT]: new Point2D(1, 0),
    [SnakeDirection.DOWN]: new Point2D(0, 1),
    [SnakeDirection.LEFT]: new Point2D(-1, 0)
};

export default SnakeDirection;
