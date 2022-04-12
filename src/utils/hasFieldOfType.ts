import JsType, { TypeOfJsType } from '../types/common/JsType';
import ObjectKey from '../types/common/ObjectKey';

const hasFieldOfType = <O, K extends ObjectKey, T extends JsType>(
    object: O,
    fieldName: K,
    fieldType: T
): object is O & { [fieldName in K]: TypeOfJsType<T> } => {
    return fieldName in object && typeof (object as any)[fieldName] === fieldType;
};

export default hasFieldOfType;
