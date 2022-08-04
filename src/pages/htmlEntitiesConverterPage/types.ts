import { DecodeOptions, EncodeOptions } from 'html-entities';

type HtmlEntitiesConversionOptions = Required<DecodeOptions & EncodeOptions>;

export default HtmlEntitiesConversionOptions;
