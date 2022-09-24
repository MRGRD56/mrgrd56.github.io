import React, { Dispatch, FunctionComponent, ReactNode, SetStateAction, useCallback, useMemo, useState } from 'react';
import { Button, Image, Tabs, Upload } from 'antd';
import BiConverterPageContainer from '../biConverterPageContainer/BiConverterPageContainer';
import AppImgComparisonSlider from '../../../components/appImgComparisonSlider/AppImgComparisonSlider';
import { useDebouncedMemo } from '../../../hooks/debouncedMemo';
import useOptionalLocalstorageState from '../../../hooks/useOptionalLocalstorageState';
import { DownloadOutlined, SwapLeftOutlined, UploadOutlined } from '@ant-design/icons';
import TabChangeHandler from '../../../types/antd/TabChangeHandler';
import Text from 'antd/lib/typography/Text';
import Flex from '../../../components/flex/Flex';
import dummyAntdUploadRequest from '../../../utils/antd/dummyAntdUploadRequest';
import isImageFile from '../../../utils/antd/isImageFile';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import readFileAsDataUrl from '../../../utils/readFileAsDataUrl';
import dataUrlToBlob from '../../../utils/dataUrlToBlob';
import { isNil } from 'lodash';
import ImageInfo from './components/ImageInfo';
import styles from './ImageConverterPageContainer.module.scss';

enum ViewTab {
    COMPARE = 'COMPARE',
    ORIGINAL = 'ORIGINAL',
    RESULT = 'RESULT'
}

export interface ImageOptionsComponentProps<O> {
    options: O;
    onOptionsChange: Dispatch<SetStateAction<O>>;
}

export type ImageOptionsComponent<O> = FunctionComponent<ImageOptionsComponentProps<O>>;

export type ImageConvertWithOptions<O> = (sourceImage: string, options: O) => string | Promise<string>;
export type ImageConvertNoOptions = (sourceImage: string) => string | Promise<string>;

interface BaseProps<O> {
    sourceTitle?: string;
    resultTitle?: string;
    noImageInfo?: boolean;
    className?: string;
}

interface PropsWithOptions<O> extends BaseProps<O> {
    convert: ImageConvertWithOptions<O>;
    defaultOptions: O;
    optionsStorageKey: string;
    renderOptionsContainer: ImageOptionsComponent<O>;
}

interface PropsWithoutOptions extends BaseProps<undefined> {
    convert: ImageConvertNoOptions;
    defaultOptions?: never;
    optionsStorageKey?: never;
    renderOptionsContainer?: never;
}

type Props<O> = PropsWithOptions<O> | PropsWithoutOptions;

const ImageConverterPageContainer = <O,>(props: Props<O>) => {
    const {
        sourceTitle = 'Options',
        resultTitle = 'Preview',
        noImageInfo,
        convert,
        defaultOptions,
        optionsStorageKey,
        renderOptionsContainer,
        className
    } = props;

    const [options, setOptions] = useOptionalLocalstorageState<O>(optionsStorageKey, defaultOptions);
    const [viewTab, setViewTab] = useState<ViewTab>(ViewTab.COMPARE);

    const [isUploading, setIsUploading] = useState<boolean>(false);

    const [sourceImageSrc, setSourceImageSrc] = useState<string>();
    const resultImageSrc = useDebouncedMemo<string | undefined>(
        async () => {
            if (!sourceImageSrc) {
                return;
            }

            return convert(sourceImageSrc, options);
        },
        [sourceImageSrc, options, convert],
        100
    );

    const sourceImageBlob = useMemo(() => {
        return isNil(sourceImageSrc) ? undefined : dataUrlToBlob(sourceImageSrc);
    }, [sourceImageSrc]);

    const resultImageBlob = useMemo(() => {
        return isNil(resultImageSrc) ? undefined : dataUrlToBlob(resultImageSrc);
    }, [resultImageSrc]);

    const optionsContainer = useMemo<ReactNode | undefined>(() => {
        if (!renderOptionsContainer) {
            return;
        }

        const OptionsComponent = renderOptionsContainer;
        return <OptionsComponent options={options} onOptionsChange={setOptions} />;
    }, [renderOptionsContainer, options]);

    const handleUploadedImageChange = useCallback(async (value: UploadChangeParam<UploadFile<unknown>>) => {
        const { file } = value;

        if (file.status === 'uploading') {
            setIsUploading(true);
            return;
        }

        const blob = file.originFileObj;

        if (blob) {
            setSourceImageSrc(await readFileAsDataUrl(blob));
        }

        setIsUploading(false);
    }, []);

    const setResultAsSource = () => {
        if (resultImageSrc) {
            setSourceImageSrc(resultImageSrc);
        }
    };

    return (
        <BiConverterPageContainer
            className={className}
            leftTitle={sourceTitle}
            rightTitle={resultTitle}
            rightTitleExtra={
                <Flex row gap={6}>
                    <Button type="text" icon={<SwapLeftOutlined />} onClick={setResultAsSource}>
                        <span className="d-none d-sm-inline">Set as source</span>
                    </Button>
                    <a download href={resultImageSrc}>
                        <Button type="text" icon={<DownloadOutlined />}>
                            <span className="d-none d-sm-inline">Download</span>
                        </Button>
                    </a>
                </Flex>
            }
            leftColSize={9}
            left={
                <Flex col gap={10} className="p-2">
                    <Upload
                        multiple={false}
                        className="QrScannerPage_image-upload"
                        listType="text"
                        showUploadList={false}
                        beforeUpload={isImageFile}
                        onChange={handleUploadedImageChange}
                        accept="image/*, *"
                        customRequest={dummyAntdUploadRequest}
                    >
                        <Button type="primary" icon={<UploadOutlined />} loading={isUploading && { delay: 50 }}>
                            Upload image...
                        </Button>
                    </Upload>

                    {optionsContainer}
                </Flex>
            }
            noRight={!sourceImageSrc}
            right={
                sourceImageSrc ? (
                    <Tabs
                        activeKey={viewTab}
                        onChange={setViewTab as TabChangeHandler}
                        tabBarExtraContent={null}
                        className="ant-tabs-first-tab-indent ant-tabs-no-w100-but-max"
                    >
                        <Tabs.TabPane key={ViewTab.COMPARE} tab="Compare">
                            <Flex col className="w-100">
                                <div className={styles.imageWrapper}>
                                    <AppImgComparisonSlider
                                        fit
                                        src1={sourceImageSrc}
                                        src2={resultImageSrc}
                                        // src1="https://img-comparison-slider.sneas.io/demo/images/before.webp"
                                        // src2="https://img-comparison-slider.sneas.io/demo/images/after.webp"
                                    />
                                </div>
                                {!noImageInfo && sourceImageBlob && resultImageBlob && (
                                    <ImageInfo blob={sourceImageBlob} blob2={resultImageBlob} />
                                )}
                            </Flex>
                        </Tabs.TabPane>
                        <Tabs.TabPane key={ViewTab.ORIGINAL} tab="Original">
                            <Flex col>
                                <div className={styles.imageWrapper}>
                                    <Image src={sourceImageSrc} />
                                </div>
                                {!noImageInfo && sourceImageBlob && <ImageInfo blob={sourceImageBlob} />}
                            </Flex>
                        </Tabs.TabPane>
                        <Tabs.TabPane key={ViewTab.RESULT} tab="Result">
                            <Flex col>
                                <div className={styles.imageWrapper}>
                                    <Image src={resultImageSrc} />
                                </div>
                                {!noImageInfo && resultImageBlob && <ImageInfo blob={resultImageBlob} />}
                            </Flex>
                        </Tabs.TabPane>
                    </Tabs>
                ) : (
                    <Text className="p-2">
                        <h4>Upload your image first</h4>
                    </Text>
                )
            }
        ></BiConverterPageContainer>
    );
};

export default ImageConverterPageContainer;
