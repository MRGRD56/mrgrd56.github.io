import React, { FunctionComponent } from 'react';
import { Canvg } from 'canvg';
import serializeXmlNode from '../../utils/serializeXmlNode';
import CanvasRenderer from '../canvasRenderer/CanvasRenderer';

const handleContentChange = (element: Element, canvas: HTMLCanvasElement) => {
    const svgString = serializeXmlNode(element);

    const canvasContext = canvas.getContext('2d');

    if (!canvasContext) {
        throw new Error('no canvas context');
    }

    const canvg = Canvg.fromString(canvasContext, svgString);
    canvg.start();

    return () => {
        canvg.stop();
    };
};

const SvgCanvas: FunctionComponent = ({ children }) => {
    return <CanvasRenderer onContentChange={handleContentChange}>{children}</CanvasRenderer>;
};

export default SvgCanvas;
