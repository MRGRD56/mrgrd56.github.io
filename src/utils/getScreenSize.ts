import { Size } from '../types';
import { pick } from 'lodash';

const getScreenSize = (): Size => pick(window.screen, ['width', 'height']);

export default getScreenSize;
