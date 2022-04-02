import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import styles from './JsonStringifierPage.module.scss';
import useInputState from '../../hooks/useInputState';
import ExternalLink from '../../components/ExternalLink';
import PageContainer from '../../components/pageHeader/PageContainer';

const rows = 16;
const span = 12;

const computeResult = (input: string | undefined) => JSON.stringify(input);
const computeResultAsync = async (input: string | undefined) => computeResult(input);

const JsonStringifierPage = () => {
    const [input, , setInputByEvent] = useInputState<string>();
    const [output, setOutput] = useState<string>();

    useEffect(() => {
        computeResultAsync(input).then((output) => {
            setOutput(output);
        });
    }, [input]);

    return (
        <PageContainer
            title="JSON Stringifier"
            description={
                <>
                    Converts your input to a JSON string. May be useful if you want to put some text in a JSON as a
                    value.
                    <br />
                    Just paste your text in the input field on the left.
                </>
            }
            titleExtra={
                <ExternalLink href="https://mrgrd56.github.io/json-stringifier">Check out old version</ExternalLink>
            }
        >
            <Row gutter={8}>
                <Col span={span}>
                    <TextArea
                        rows={rows}
                        placeholder="Source text"
                        className={styles.textarea}
                        onChange={setInputByEvent}
                        value={input}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                    />
                </Col>
                <Col span={span}>
                    <TextArea
                        rows={rows}
                        readOnly
                        placeholder="Result (JSON string)"
                        className={styles.textarea}
                        value={output}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                    />
                </Col>
            </Row>
        </PageContainer>
    );
};

export default JsonStringifierPage;
