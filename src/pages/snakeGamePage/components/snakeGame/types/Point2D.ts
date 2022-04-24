class Point2D {
    public constructor(public readonly x: number, public readonly y: number) {}

    public add(that: Point2D): Point2D {
        return new Point2D(this.x + that.x, this.y + that.y);
    }

    public clone(): Point2D {
        return new Point2D(this.x, this.y);
    }
}

export default Point2D;
