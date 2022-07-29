import React, { FunctionComponent } from 'react';
import TextBiConverterPageContainer, {
    TextBiConvert
} from '../../layouts/pages/textBiConverterPageContainer/TextBiConverterPageContainer';
import { Base64 } from 'js-base64';
import getLocalStorageKey from '../../utils/getLocalStorageKey';

const convert1to2: TextBiConvert = (source) => {
    return Base64.encode(source);
};

const convert2to1: TextBiConvert = (source) => {
    return Base64.decode(source);
};

const Base64Page: FunctionComponent = () => {
    return (
        <TextBiConverterPageContainer
            source1={{ title: 'Text', language: 'plaintext' }}
            source2={{ title: 'Base64', language: 'plaintext' }}
            convert1to2={convert1to2}
            convert2to1={convert2to1}
            swapStateStorageKey={getLocalStorageKey('base64', 'isSwapped')}
        />
    );
};

export default Base64Page;
