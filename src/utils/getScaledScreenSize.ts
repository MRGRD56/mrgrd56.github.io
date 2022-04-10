import { Size } from '../types';
import { round } from 'lodash';

const getScaledScreenSize = (): Size => {
    const { devicePixelRatio } = window;
    const { width, height } = window.screen;

    return {
        width: round(width * devicePixelRatio),
        height: round(height * devicePixelRatio)
    };
};

export default getScaledScreenSize;
