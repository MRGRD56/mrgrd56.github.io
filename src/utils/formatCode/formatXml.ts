import CodeFormatter from './types/CodeFormatter';

const XML_MIME = 'application/xml';

const domParser = new DOMParser();
const xmlSerializer = new XMLSerializer();

const stylesheet = domParser.parseFromString(
    [
        '<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform">',
        '  <xsl:strip-space elements="*"/>',
        '  <xsl:template match="para[content-style][not(text())]">', // change to just text() to strip space in text nodes
        '    <xsl:value-of select="normalize-space(.)"/>',
        '  </xsl:template>',
        '  <xsl:template match="node()|@*">',
        '    <xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy>',
        '  </xsl:template>',
        '  <xsl:output indent="yes"/>',
        '</xsl:stylesheet>'
    ].join('\n'),
    'application/xml'
);

const formatXml: CodeFormatter = (source) => {
    const sourceDocument = domParser.parseFromString(source, XML_MIME);
    const xsltProcessor = new XSLTProcessor();
    xsltProcessor.importStylesheet(stylesheet);
    const resultDocument = xsltProcessor.transformToDocument(sourceDocument);
    return xmlSerializer.serializeToString(resultDocument);
};

export default formatXml;
