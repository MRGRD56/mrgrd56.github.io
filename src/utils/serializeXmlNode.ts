const xmlSerializer = new XMLSerializer();

const serializeXmlNode = (node: Node): string => {
    return xmlSerializer.serializeToString(node);
};

export default serializeXmlNode;
