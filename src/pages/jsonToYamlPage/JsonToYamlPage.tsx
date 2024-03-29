import React, { FunctionComponent } from 'react';
import TextBiConverterPageContainer, {
    TextBiConvert
} from '../../layouts/pages/textBiConverterPageContainer/TextBiConverterPageContainer';
import yaml from 'yaml';
import getLocalStorageKey from '../../utils/getLocalStorageKey';

const convert1to2: TextBiConvert = (source) => {
    const parsedJson = JSON.parse(source);
    return yaml.stringify(parsedJson);
};

const convert2to1: TextBiConvert = (source) => {
    const parsedYaml = yaml.parse(source);
    return JSON.stringify(parsedYaml, undefined, 4);
};

const JsonToYamlPage: FunctionComponent = () => {
    return (
        <TextBiConverterPageContainer
            source1={{ title: 'JSON', language: 'json' }}
            source2={{ title: 'YAML', language: 'yaml' }}
            convert1to2={convert1to2}
            convert2to1={convert2to1}
            swapStateStorageKey={getLocalStorageKey('json-to-yaml', 'isSwapped')}
        />
    );
};

export default JsonToYamlPage;
