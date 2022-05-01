import { camelCase } from 'lodash';
import capitalizeFirst from './capitalizeFirst';

const pascalCase = (source: string) => {
    return capitalizeFirst(camelCase(source));
};

export default pascalCase;
