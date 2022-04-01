import React, { useMemo } from 'react';
import { Col, Row, Space } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import styles from './JsonStringifierPage.module.scss';
import useInputState from '../../hooks/useInputState';
import ExternalLink from '../../components/ExternalLink';
import Paragraph from 'antd/lib/typography/Paragraph';

const rows = 16;
const span = 12;

const JsonStringifierPage = () => {
    const [input, , setInputByEvent] = useInputState<string>();

    const output = useMemo<string>(() => {
        return JSON.stringify(input);
    }, [input]);

    return (
        <Space direction="vertical" className={styles.container}>
            <Space direction="horizontal" size="middle" className={styles.headingContainer}>
                <h1 className="mb-0">JSON Stringifier</h1>
                <ExternalLink href="https://mrgrd56.github.io/json-stringifier">Check out old version</ExternalLink>
            </Space>

            <Paragraph>
                Converts your input to a JSON string. May be useful if you want to put some text in a JSON as a value.
                <br />
                Just paste your text in the input field on the left.
            </Paragraph>

            <Row gutter={8}>
                <Col span={span}>
                    <TextArea
                        rows={rows}
                        placeholder="Source text"
                        className={styles.textarea}
                        onChange={setInputByEvent}
                        value={input}
                    />
                </Col>
                <Col span={span}>
                    <TextArea
                        rows={rows}
                        readOnly
                        placeholder="Result (JSON string)"
                        className={styles.textarea}
                        value={output}
                    />
                </Col>
            </Row>
        </Space>
    );
};

export default JsonStringifierPage;
