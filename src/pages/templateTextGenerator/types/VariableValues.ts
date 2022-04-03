import { isArray } from 'lodash';

export interface VariableValuesRaw {
    name: string;
    valuesJson: string;
}

export interface VariableValues {
    name: string;
    values: string[];
}

export const getVariableValues = ({ name, valuesJson }: VariableValuesRaw): VariableValues => {
    const valuesParsed = JSON.parse(valuesJson);
    const values = isArray(valuesParsed) ? valuesParsed : [valuesParsed];
    return { name, values };
};
