import { camelCase } from 'lodash';
import capitalizeFirst from './capitalizeFirst';

const pascalCase = (string: string) => {
    return capitalizeFirst(camelCase(string));
};

export default pascalCase;
