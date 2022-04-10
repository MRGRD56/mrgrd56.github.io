const transform = <V, R>(value: V, transformation: (value: V) => R) => {
    return transformation(value);
};

export default transform;
