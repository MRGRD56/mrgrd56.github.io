import { JsonArray, JsonObject, JsonType } from '../types/json';
import { chain, isArray, isBoolean, isNil, isObject, isString, mapValues } from 'lodash';

const parseJsonObject = (object: unknown): JsonType => {
    if (isObject(object)) {
        if (isArray(object)) {
            return new JsonArray(chain(object).map(parseJsonObject).uniq().value()); //TODO remove `uniq` here?
        }

        return new JsonObject(
            mapValues(object, (value) => {
                return parseJsonObject(value);
            }) as Record<string, JsonType>
        );
    }

    if (isNil(object)) {
        return 'null';
    }

    if (typeof object === 'number' || typeof object === 'bigint') {
        return 'number';
    }

    if (isString(object)) {
        return 'string';
    }

    if (isBoolean(object)) {
        return 'boolean';
    }

    console.error({ object });
    throw new Error('Unable to parse JSON object');
};

export default parseJsonObject;
