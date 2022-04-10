import { Size } from '../types';

const getWindowSize = (): Size => {
    const { innerWidth, innerHeight } = window;

    return {
        width: innerWidth,
        height: innerHeight
    };
};

export default getWindowSize;
