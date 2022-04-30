import React, { ClipboardEventHandler, useCallback, useEffect, useState } from 'react';
import PageContainer from '../../components/pageContainer/PageContainer';
import { Col, Image, notification, Row, Space, Spin, Upload } from 'antd';
import './QrScannerPage.scss';
import { RcFile, UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import dummyAntdUploadRequest from '../../utils/dummyAntdUploadRequest';
import readFileAsBase64 from '../../utils/readFileAsBase64';
import TextArea from 'antd/lib/input/TextArea';
import QrScanner from 'qr-scanner';
import { isNil, isString } from 'lodash';
import call from '../../utils/call';
import Text from 'antd/lib/typography/Text';
import ImgCrop from 'antd-img-crop';
import CopyButton from '../../components/copyButton/CopyButton';
import ExternalLink from '../../components/ExternalLink';

interface QrImage {
    blob: Blob;
    base64: string;
}

const getQrImage = async (blob: Blob): Promise<QrImage> => {
    const base64 = await readFileAsBase64(blob);
    return { blob, base64 };
};

const beforeUpload = (file: RcFile) => {
    return /^image\/.+$/.test(file.type);
};

const titleExtra = (
    <Text type="secondary">
        uses <ExternalLink href="https://www.npmjs.com/package/qr-scanner">qr-scanner</ExternalLink>
    </Text>
);

const QrScannerPage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isRecognition, setIsRecognition] = useState<boolean>(false);
    const [qrImage, setQrImage] = useState<QrImage>();
    const [qrContent, setQrContent] = useState<string>('');

    useEffect(() => {
        call(async () => {
            if (isNil(qrImage)) {
                setQrContent('');
                return;
            }

            try {
                setIsRecognition(true);
                const content: QrScanner.ScanResult | string = await QrScanner.scanImage(qrImage.blob, {});
                const contentText = isString(content) ? content : content.data;
                setQrContent(contentText);
            } catch (error) {
                notification.error({
                    message: String(error)
                });
                setQrContent('');
            } finally {
                setIsRecognition(false);
            }
        });
    }, [qrImage]);

    const handleQrImageChange = useCallback(async (value: UploadChangeParam<UploadFile<unknown>>) => {
        if (value.file.status === 'uploading') {
            setIsLoading(true);
            return;
        }

        const blob = value.file.originFileObj;

        if (blob) {
            setQrImage(await getQrImage(blob));
        }

        setIsLoading(false);
    }, []);

    const handlePaste = useCallback<ClipboardEventHandler>(async (event) => {
        setQrImage(await getQrImage(event.clipboardData.files[0]));
    }, []);

    return (
        <PageContainer title="QR Code Scanner" onPaste={handlePaste} titleExtra={titleExtra}>
            <Row>
                <Col className="w-100">
                    <Row>
                        <Space>
                            {qrImage && (
                                <div className="QrScannerPage_image-thumb">
                                    <Image src={qrImage.base64} width={128} height={128} />
                                </div>
                            )}
                            <ImgCrop rotate maxZoom={30}>
                                <Upload
                                    className="QrScannerPage_image-upload"
                                    listType="picture-card"
                                    showUploadList={false}
                                    beforeUpload={beforeUpload}
                                    onChange={handleQrImageChange}
                                    accept="image/*, *"
                                    customRequest={dummyAntdUploadRequest}
                                >
                                    <Space direction="vertical">
                                        {isLoading ? <LoadingOutlined /> : <PlusOutlined />}
                                        <div>
                                            Upload <br />
                                            <Text type="secondary">or Ctrl+V</Text>
                                        </div>
                                    </Space>
                                </Upload>
                            </ImgCrop>
                        </Space>
                    </Row>
                    <Col xs={24} lg={12}>
                        <Spin spinning={isRecognition}>
                            <TextArea value={qrContent} readOnly rows={6} />
                        </Spin>
                        <CopyButton value={qrContent} className="mt-1" />
                    </Col>
                </Col>
            </Row>
        </PageContainer>
    );
};

export default QrScannerPage;