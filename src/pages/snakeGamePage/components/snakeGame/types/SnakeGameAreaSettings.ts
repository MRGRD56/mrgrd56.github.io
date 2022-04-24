class SnakeGameAreaSettings {
    constructor(public readonly rowCells: number) {}

    public getCellSize(areaWidth: number): number {
        return areaWidth / this.rowCells;
    }
}

export default SnakeGameAreaSettings;
