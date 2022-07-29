import React, { FunctionComponent } from 'react';
import TextBiConverterPageContainer, {
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
            source1={{ title: 'Text', language: 'plaintext' }}
            source2={{ title: 'Encoded URI', language: 'plaintext' }}
            convert1to2={convert1to2}
            convert2to1={convert2to1}
            swapStateStorageKey={getLocalStorageKey('url-encoder', 'isSwapped')}
        />
    );
};

export default UrlEncoderPage;
