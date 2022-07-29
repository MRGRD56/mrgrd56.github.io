import { FunctionComponent } from 'react';

// type ExtractPropsType<T> =
//     T extends keyof JSX.IntrinsicElements | JSXElementConstructor<unknown>
//         ? ComponentProps<T>
//         : unknown;

/**
 * @deprecated unstable
 */
function isFunctionComponent<T extends FunctionComponent<any> = FunctionComponent<any>>(value: unknown): value is T {
    return (
        typeof value === 'function' &&
        (String(value).includes('return React.createElement') || String(value).includes('return /*#__PURE__*/'))
    );
}

export default isFunctionComponent;
