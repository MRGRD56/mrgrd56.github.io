const joinObjects = <T, S>(items: T[], separator: S): Array<T | S> => {
    return items.reduce<Array<T | S>>((result, value, index) => {
        if (index !== 0) {
            result.push(separator);
        }

        result.push(value);
        return result;
    }, []);
};

export default joinObjects;
