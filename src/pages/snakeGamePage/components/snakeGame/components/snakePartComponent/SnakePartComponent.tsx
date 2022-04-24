import React, { FunctionComponent } from 'react';
import SnakePart from '../../types/SnakePart';
import SnakeGameAreaSettings from '../../types/SnakeGameAreaSettings';
import { Rect } from 'react-konva';

interface Props {
    settings: SnakeGameAreaSettings;
    value: SnakePart;
    areaWidth: number;
    fill: string;
}

const SnakePartComponent: FunctionComponent<Props> = ({ value, settings, areaWidth, fill }) => {
    const { x, y, size } = value.getView(settings, areaWidth);

    return <Rect x={x} y={y} width={size} height={size} fill={fill} />;
};

export default React.memo(SnakePartComponent);
