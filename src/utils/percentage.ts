import { round } from 'lodash';

const percentage = (value: number, total: number, precision = 2): number => {
    return round((value / total) * 100, precision);
};

export default percentage;
