import { Size } from '../types';
import { round } from 'lodash';

const getScreenSize = (): Size => {
    const { devicePixelRatio } = window;
    const { width, height } = window.screen;

    return {
        width: round(width * devicePixelRatio),
        height: round(height * devicePixelRatio)
    };
};

export default getScreenSize;
