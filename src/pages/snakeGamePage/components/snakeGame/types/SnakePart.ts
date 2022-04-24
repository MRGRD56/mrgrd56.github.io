import SnakeGameAreaSettings from './SnakeGameAreaSettings';
import Point2D from './Point2D';

class SnakePart extends Point2D {
    public constructor(x: number, y: number) {
        super(x, y);
    }

    public add(that: Point2D): SnakePart {
        return new SnakePart(this.x + that.x, this.y + that.y);
    }

    public clone(): SnakePart {
        return new SnakePart(this.x, this.y);
    }

    public getView(settings: SnakeGameAreaSettings, areaWidth: number) {
        const size = settings.getCellSize(areaWidth);

        return {
            size,
            x: this.x * size,
            y: this.y * size
        };
    }
}

export default SnakePart;
