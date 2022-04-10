import { Size } from '../types';

const stringifySize = ({ width, height }: Size): string => `${width}x${height}`;

export default stringifySize;
