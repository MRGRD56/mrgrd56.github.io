import React, { FunctionComponent } from 'react';
import TextBiConverterPageContainer, {
    EditorType,
    TextBiConvert
} from '../../layouts/pages/textBiConverterPageContainer/TextBiConverterPageContainer';
import { decode, encode } from 'html-entities';
import getLocalStorageKey from '../../utils/getLocalStorageKey';
import HtmlEntitiesConversionOptions from './types';
import HtmlEntitiesSettings from './components/htmlEntitiesSettings/HtmlEntitiesSettings';

const defaultOptions: HtmlEntitiesConversionOptions = {
    level: 'all',
    mode: 'specialChars',
    numeric: 'decimal',
    scope: 'body'
};

const convert1to2: TextBiConvert<HtmlEntitiesConversionOptions> = decode;

const convert2to1: TextBiConvert<HtmlEntitiesConversionOptions> = encode;

const HtmlEntitiesConverterPage: FunctionComponent = () => {
    return (
        <TextBiConverterPageContainer
            source1={{ title: 'HTML Entities', editorType: EditorType.MONACO, language: 'xml' }}
            source2={{ title: 'Text', editorType: EditorType.MONACO, language: 'xml' }}
            convert1to2={convert1to2}
            convert2to1={convert2to1}
            swapStateStorageKey={getLocalStorageKey('html-entities', 'isSwapped')}
            optionsStorageKey={getLocalStorageKey('html-entities', 'options')}
            defaultOptions={defaultOptions}
            renderOptionsPopover={HtmlEntitiesSettings}
        />
    );
};

export default HtmlEntitiesConverterPage;
