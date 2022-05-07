import React, { FunctionComponent, useCallback, useMemo, useRef } from 'react';
import PageContainer from '../../layouts/pages/pageContainer/PageContainer';
import { Col, Input, InputNumber, Switch, Tabs } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import useInputState from '../../hooks/useInputState';
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';
import SvgImage from '../../components/svgImage/SvgImage';
import styles from './QrGeneratorPage.module.scss';
import classNames from 'classnames';
import Text from 'antd/lib/typography/Text';
import ExternalLink from '../../components/ExternalLink';
import getNpmPackageLink from '../../utils/getNpmPackageLink';
import { useLocalstorageState } from 'rooks';
import useChangeStateHandler from '../../hooks/useChangeStateHandler';
import getLocalStorageKey from '../../utils/getLocalStorageKey';
import CanvasImage from '../../components/canvasImage/CanvasImage';

const titleExtra = (
    <Text type="secondary">
        uses <ExternalLink href={getNpmPackageLink('qrcode.react')}>qrcode.react</ExternalLink>
    </Text>
);

interface QrOptions {
    size: number;
    fgColor: string;
    bgColor: string;
    doIncludeMargin: boolean;
}

const qrOptionsDefault: QrOptions = {
    size: 220,
    fgColor: '#000000',
    bgColor: '#ffffff',
    doIncludeMargin: true
};

enum QrOutputFormat {
    SVG_IMAGE = 'SVG_IMAGE',
    PNG_IMAGE = 'PNG_IMAGE'
}

const QrGeneratorPage: FunctionComponent = () => {
    const qrCodeWrapperRef = useRef<HTMLDivElement>(null);

    const [text, , setTextByEvent] = useInputState<string>('');
    const [qrOptions, setQrOptions] = useLocalstorageState<QrOptions>(
        getLocalStorageKey('qr-generator', 'qrOptions'),
        qrOptionsDefault
    );
    const [outputFormat, setOutputFormat] = useLocalstorageState<QrOutputFormat>(
        getLocalStorageKey('qr-generator', 'outputFormat'),
        QrOutputFormat.SVG_IMAGE
    );

    const handleQrOptionChange = useChangeStateHandler(setQrOptions);

    const handleOutputFormatChange = useCallback((key: string) => {
        setOutputFormat(key as QrOutputFormat);
    }, []);

    const qrProps = useMemo(
        () => ({
            value: text,
            size: qrOptions.size,
            fgColor: qrOptions.fgColor,
            bgColor: qrOptions.bgColor,
            includeMargin: qrOptions.doIncludeMargin,
            level: undefined
        }),
        [text, qrOptions]
    );

    return (
        <PageContainer title="QR Generator" titleExtra={titleExtra}>
            <Col xs={24} lg={12}>
                <TextArea value={text} onChange={setTextByEvent} placeholder="Input text" rows={3} allowClear />
                <label className={classNames(styles.formItem, 'mt-2')}>
                    <div>Size</div>
                    <InputNumber
                        value={qrOptions.size}
                        onChange={handleQrOptionChange('size')}
                        className={styles.numericInput}
                    />
                </label>
                <label className={styles.formItem}>
                    <div>Foreground</div>
                    <Input
                        value={qrOptions.fgColor}
                        onChange={handleQrOptionChange('fgColor')}
                        className="font-monospace"
                    />
                </label>
                <label className={styles.formItem}>
                    <div>Background</div>
                    <Input
                        value={qrOptions.bgColor}
                        onChange={handleQrOptionChange('bgColor')}
                        className="font-monospace"
                    />
                </label>
                <label className={classNames(styles.formItem, styles.switchFormItem)}>
                    <Switch checked={qrOptions.doIncludeMargin} onChange={handleQrOptionChange('doIncludeMargin')} />
                    <div>Margin</div>
                </label>
                <div ref={qrCodeWrapperRef} className={styles.qrCodeWrapper}>
                    <Tabs activeKey={outputFormat} onChange={handleOutputFormatChange}>
                        <Tabs.TabPane tab="SVG" key={QrOutputFormat.SVG_IMAGE}>
                            <SvgImage>
                                <QRCodeSVG {...qrProps} />
                            </SvgImage>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="PNG" key={QrOutputFormat.PNG_IMAGE}>
                            <CanvasImage>
                                <QRCodeCanvas {...qrProps} />
                            </CanvasImage>
                        </Tabs.TabPane>
                    </Tabs>
                </div>
            </Col>
        </PageContainer>
    );
};

export default QrGeneratorPage;
