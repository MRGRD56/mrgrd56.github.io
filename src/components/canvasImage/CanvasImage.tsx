import React, { FunctionComponent, ReactNode } from 'react';
import ContentTransformer from '../contentTransformer/ContentTransformer';

const transform = (element: Element): ReactNode => {
    if (!(element instanceof HTMLCanvasElement)) {
        throw new Error('element is not a canvas');
    }

    const { width, height } = window.getComputedStyle(element);

    return <img src={element.toDataURL()} width={Number.parseInt(width)} height={Number.parseInt(height)} />;
};

const CanvasImage: FunctionComponent = ({ children }) => {
    return <ContentTransformer transform={transform}>{children}</ContentTransformer>;
};

export default CanvasImage;
