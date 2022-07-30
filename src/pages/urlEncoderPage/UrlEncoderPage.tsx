import React, { FunctionComponent } from 'react';
import TextBiConverterPageContainer, {
    EditorType,
    TextBiConvert
} from '../../layouts/pages/textBiConverterPageContainer/TextBiConverterPageContainer';
import getLocalStorageKey from '../../utils/getLocalStorageKey';

const convert1to2: TextBiConvert = (source) => {
    return window.encodeURI(source);
};

const convert2to1: TextBiConvert = (source) => {
    return window.decodeURI(source);
};

const UrlEncoderPage: FunctionComponent = () => {
    return (
        <TextBiConverterPageContainer
            source1={{ title: 'Text', editorType: EditorType.PLAIN }}
            source2={{ title: 'Encoded URI', editorType: EditorType.PLAIN }}
            convert1to2={convert1to2}
            convert2to1={convert2to1}
            swapStateStorageKey={getLocalStorageKey('url-encoder', 'isSwapped')}
        />
    );
};

export default UrlEncoderPage;
