import React, { CSSProperties, FunctionComponent, HTMLProps, useMemo } from 'react';
import { defaults } from 'lodash';

type CSS = CSSProperties;

interface BaseProps extends HTMLProps<HTMLDivElement> {
    justify?: CSS['justifyContent'];
    align?: CSS['alignItems'];
    alignContent?: CSS['alignContent'];
    flex?: CSS['flex'];
    gap?: CSS['gap'];
    maxWidth?: CSS['maxWidth'];
    maxHeight?: CSS['maxHeight'];
}

interface PropsWithDirection extends BaseProps {
    direction?: CSS['flexDirection'];
    row?: never;
    column?: never;
}

interface PropsWithRow extends BaseProps {
    direction?: never;
    row: true;
    column?: never;
}

interface PropsWithColumn extends BaseProps {
    direction?: never;
    row?: never;
    column: true;
}

type Props = PropsWithDirection | PropsWithRow | PropsWithColumn;

// type Props<T extends BaseProps> =
//     T extends PropsWithDirection ? Exclude<PropsWithDirection, 'row' | 'column'> :
//         T extends PropsWithRow ? PropsWithRow :
//             T extends PropsWithColumn ? PropsWithColumn
//                 : BaseProps;

const Flex: FunctionComponent<Props> = (props) => {
    const {
        row,
        column,
        direction,
        justify,
        align,
        alignContent,
        flex,
        gap,
        style,
        maxWidth,
        maxHeight,
        children,
        ...restProps
    } = props;

    const divStyle: CSS = useMemo(() => {
        return defaults(
            {
                display: 'flex',
                flexDirection: (() => {
                    switch (true) {
                        case row:
                            return 'row';
                        case column:
                            return 'column';
                        default:
                            return direction;
                    }
                })(),
                justifyContent: justify,
                alignItems: align,
                alignContent,
                flex,
                gap,
                maxWidth,
                maxHeight
            },
            style
        );
    }, [row, column, direction, justify, align, alignContent, flex, gap, style, maxWidth, maxHeight]);

    return (
        <div {...restProps} style={divStyle}>
            {children}
        </div>
    );
};

export default Flex;
