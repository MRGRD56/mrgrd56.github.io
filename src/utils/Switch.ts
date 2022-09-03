class Switch<T, V = never> {
    constructor(private readonly object: T) {}

    static of<T>(object: T) {
        return new Switch(object);
    }

    private readonly conditions = new Map<T, () => unknown>();
    private defaultValue: { current: () => unknown } | undefined = undefined;

    onCase<R>(possibleValue: T, result: () => R): Switch<T, V | R> {
        if (!this.conditions.has(possibleValue)) {
            this.conditions.set(possibleValue, result);
        }

        return this;
    }

    onCases<R>(possibleValues: T[], result: () => R): Switch<T, V | R> {
        possibleValues.forEach((value) => this.onCase(value, result));
        return this;
    }

    onDefault<R>(result: () => R): V | R {
        if (this.defaultValue === undefined) {
            this.defaultValue = { current: result };
        }

        return this.value();
    }

    value(): V {
        const conditionValues = Array.from(this.conditions.entries());
        for (const [condition, result] of conditionValues) {
            if (condition === this.object) {
                return result() as V;
            }
        }

        return this.defaultValue?.current() as V;
    }
}

export default Switch;
