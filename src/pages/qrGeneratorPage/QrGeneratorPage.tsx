import React, { FunctionComponent, useRef, useState } from 'react';
import PageContainer from '../../components/pageContainer/PageContainer';
import { Col, Input, InputNumber } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import useInputState from '../../hooks/useInputState';
import { QRCodeSVG } from 'qrcode.react';
import SvgImage from '../../components/svgImage/SvgImage';
import styles from './QrGeneratorPage.module.scss';
import classNames from 'classnames';

const QrGeneratorPage: FunctionComponent = () => {
    const qrCodeWrapperRef = useRef<HTMLDivElement>(null);

    const [text, , setTextByEvent] = useInputState<string>('');
    const [size, setSize] = useState<number>(220);
    const [fgColor, , setFgColorByEvent] = useInputState<string>('#000000');
    const [bgColor, , setBgColorByEvent] = useInputState<string>('#ffffff');

    return (
        <PageContainer title="QR Generator">
            <Col xs={24} lg={12}>
                <TextArea value={text} onChange={setTextByEvent} placeholder="Input text" rows={3} allowClear />
                <label className={classNames(styles.formItem, 'mt-2')}>
                    <div>Size</div>
                    <InputNumber value={size} onChange={setSize} className={styles.numericInput} />
                </label>
                <label className={styles.formItem}>
                    <div>Foreground</div>
                    <Input value={fgColor} onChange={setFgColorByEvent} className="font-monospace" />
                </label>
                <label className={styles.formItem}>
                    <div>Background</div>
                    <Input value={bgColor} onChange={setBgColorByEvent} className="font-monospace" />
                </label>
                <div ref={qrCodeWrapperRef}>
                    <SvgImage>
                        <QRCodeSVG
                            value={text}
                            size={size}
                            fgColor={fgColor}
                            bgColor={bgColor}
                            includeMargin={false}
                            level={undefined}
                        />
                    </SvgImage>
                </div>
            </Col>
        </PageContainer>
    );
};

export default QrGeneratorPage;
