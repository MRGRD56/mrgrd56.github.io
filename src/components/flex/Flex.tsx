import React, { CSSProperties, FunctionComponent, HTMLProps, useMemo } from 'react';
import { defaults } from 'lodash';

type CSS = CSSProperties;

interface BaseProps extends Omit<HTMLProps<HTMLDivElement>, 'height' | 'width' | 'wrap'> {
    justify?: CSS['justifyContent'];
    align?: CSS['alignItems'];
    alignContent?: CSS['alignContent'];
    flex?: CSS['flex'];
    gap?: CSS['gap'];
    maxWidth?: CSS['maxWidth'];
    maxHeight?: CSS['maxHeight'];
    width?: CSS['width'];
    height?: CSS['height'];
    minWidth?: CSS['minWidth'];
    minHeight?: CSS['minHeight'];
    alignSelf?: CSS['alignSelf'];
    wrap?: CSS['flexWrap'];
}

interface PropsWithDirection extends BaseProps {
    direction?: CSS['flexDirection'];
    row?: never;
    col?: never;
}

interface PropsWithRow extends BaseProps {
    direction?: never;
    row: true;
    col?: never;
}

interface PropsWithColumn extends BaseProps {
    direction?: never;
    row?: never;
    col: true;
}

export type FlexProps = PropsWithDirection | PropsWithRow | PropsWithColumn;

// type Props<T extends BaseProps> =
//     T extends PropsWithDirection ? Exclude<PropsWithDirection, 'row' | 'column'> :
//         T extends PropsWithRow ? PropsWithRow :
//             T extends PropsWithColumn ? PropsWithColumn
//                 : BaseProps;

const Flex: FunctionComponent<FlexProps> = (props) => {
    const {
        row,
        col,
        direction,
        justify,
        align,
        alignContent,
        flex,
        gap,
        style,
        maxWidth,
        maxHeight,
        width,
        height,
        minWidth,
        minHeight,
        alignSelf,
        wrap,
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
                        case col:
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
                maxHeight,
                width,
                height,
                minWidth,
                minHeight,
                alignSelf,
                wrap
            },
            style
        );
    }, [
        row,
        col,
        direction,
        justify,
        align,
        alignContent,
        flex,
        gap,
        style,
        maxWidth,
        maxHeight,
        width,
        height,
        minWidth,
        minHeight,
        alignSelf,
        wrap
    ]);

    return (
        <div {...restProps} style={divStyle}>
            {children}
        </div>
    );
};

export default Flex;
