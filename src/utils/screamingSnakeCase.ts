import { snakeCase } from 'lodash';

const screamingSnakeCase = (string: string) => {
    return snakeCase(string).toLocaleUpperCase();
};

export default screamingSnakeCase;
