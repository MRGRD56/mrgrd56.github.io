import React, { FunctionComponent } from 'react';
import ContentTransformer from '../contentTransformer/ContentTransformer';
import serializeXmlNode from '../../utils/serializeXmlNode';

const transform = (element: Element) => {
    const svgString = serializeXmlNode(element);
    const svgBase64 = window.btoa(svgString);
    const src = 'data:image/svg+xml;base64,' + svgBase64;

    return <img src={src} />;
};

const SvgImage: FunctionComponent = ({ children }) => {
    return <ContentTransformer transform={transform}>{children}</ContentTransformer>;
};

export default SvgImage;
