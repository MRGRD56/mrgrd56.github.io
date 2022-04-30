import FormattedLanguage from './types/FormattedLanguage';
import CodeFormatter from './types/CodeFormatter';
import formatXml from './formatXml';

const formatters: Readonly<Record<FormattedLanguage, CodeFormatter>> = {
    xml: formatXml
};

const formatCode = (language: FormattedLanguage, source: string): string => formatters[language](source);

export default formatCode;
