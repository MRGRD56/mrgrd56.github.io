import React from 'react';
import TextBiConverterPageContainer, {
    EditorType
} from '../../layouts/pages/textBiConverterPageContainer/TextBiConverterPageContainer';
import { isString } from 'lodash';
import ExternalLink from '../../components/ExternalLink';

const convert1to2 = (input: string) => {
    return JSON.stringify(input.replaceAll('\r\n', '\n'));
};
const convert2to1 = (input: string) => {
    const parsed = JSON.parse(input);
    if (!isString(parsed)) {
        throw new Error('The JSON must represent a string');
    }

    return parsed;
};

const JsonStringifierPage = () => {
    return (
        <TextBiConverterPageContainer
            source1={{ title: 'Plain text', editorType: EditorType.MONACO, quickSuggestions: false }}
            source2={{
                title: 'JSON string',
                editorType: EditorType.MONACO,
                quickSuggestions: false,
                language: 'json',
                wrapLines: true
            }}
            convert1to2={convert1to2}
            convert2to1={convert2to1}
            description={
                <>
                    <h3 className="mb-1">JSON Stringifier</h3>
                    <div className="mb-1">
                        Converts your input to a JSON string. May be useful if you want to put some text in a JSON as a
                        value
                    </div>
                    <ExternalLink href="https://mrgrd56.github.io/json-stringifier">Check out old version</ExternalLink>
                </>
            }
        />
    );
};

export default JsonStringifierPage;
