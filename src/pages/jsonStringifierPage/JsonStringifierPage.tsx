import React from 'react';
import TextBiConverterPageContainer, {
    EditorType
} from '../../layouts/pages/textBiConverterPageContainer/TextBiConverterPageContainer';

// const rows = 16;
// const span = 12;

const computeResult = (input: string | undefined) => JSON.stringify(input);
// const computeResultAsync = async (input: string | undefined) => computeResult(input);

const JsonStringifierPage = () => {
    // const [input, , setInputByEvent] = useInputState<string>();
    // const [output, setOutput] = useState<string>();

    // useEffect(() => {
    //     computeResultAsync(input).then((output) => {
    //         setOutput(output);
    //     });
    // }, [input]);

    return (
        <TextBiConverterPageContainer
            source1={{ title: 'Text', editorType: EditorType.PLAIN }}
            source2={{ title: 'JSON string', editorType: EditorType.MONACO, language: 'json', wrapLines: true }}
            convert1to2={computeResult}
            description={
                <>
                    Converts your input to a JSON string. May be useful if you want to put some text in a JSON as a
                    value.
                    <br />
                    Just paste your text in the input field on the left.
                </>
            }
        />
    );

    // return (
    //     <PageContainer
    //         title="JSON Stringifier"
    //         description={
    //             <>
    //                 Converts your input to a JSON string. May be useful if you want to put some text in a JSON as a
    //                 value.
    //                 <br />
    //                 Just paste your text in the input field on the left.
    //             </>
    //         }
    //         titleExtra={
    //             <ExternalLink href="https://mrgrd56.github.io/json-stringifier">Check out old version</ExternalLink>
    //         }
    //     >
    //         <Row gutter={8}>
    //             <Col span={span}>
    //                 <TextArea
    //                     rows={rows}
    //                     placeholder="Source text"
    //                     className={styles.textarea}
    //                     onChange={setInputByEvent}
    //                     value={input}
    //                     autoComplete="off"
    //                     autoCorrect="off"
    //                     autoCapitalize="off"
    //                     spellCheck="false"
    //                 />
    //             </Col>
    //             <Col span={span}>
    //                 <TextArea
    //                     rows={rows}
    //                     readOnly
    //                     placeholder="Result (JSON string)"
    //                     className={styles.textarea}
    //                     value={output}
    //                     autoComplete="off"
    //                     autoCorrect="off"
    //                     autoCapitalize="off"
    //                     spellCheck="false"
    //                 />
    //             </Col>
    //         </Row>
    //     </PageContainer>
    // );
};

export default JsonStringifierPage;
