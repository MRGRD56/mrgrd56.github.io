import React, { FunctionComponent } from 'react';
import ImageConverterPageContainer, {
    ImageOptionsComponent
} from '../../layouts/pages/imageConverterPageContainer/ImageConverterPageContainer';
import canvasConverter from '../../layouts/pages/imageConverterPageContainer/utils/canvasConverter';
import useChangeStateHandler from '../../hooks/useChangeStateHandler';
import Flex from '../../components/flex/Flex';
import getLocalStorageKey from '../../utils/getLocalStorageKey';
import { InputNumber, Select, Slider } from 'antd';
import styles from './ImageCompressorPage.module.scss';
import { isNil } from 'lodash';

interface Options {
    format: string;
    quality: number | undefined;
}

const defaultOptions: Options = {
    format: 'image/jpeg',
    quality: 70
};

const compressibleTypes = ['image/jpeg', 'image/webp'];

const convert = canvasConverter<Options>((canvas, context, options) => {
    const isCompressible = compressibleTypes.includes(options.format);
    const quality = isCompressible && !isNil(options.quality) ? options.quality / 100 : undefined;

    return canvas.toDataURL(options.format || 'image/jpeg', quality);
});

const OptionsComponent: ImageOptionsComponent<Options> = ({ options, onOptionsChange }) => {
    const handleOptionChange = useChangeStateHandler(onOptionsChange);

    return (
        <Flex col gap={6}>
            <label className={styles.label}>
                <span className={styles.labelText}>Format</span>
                <Select value={options.format} onChange={handleOptionChange('format')} className={styles.input}>
                    <Select.Option key="image/png">PNG</Select.Option>
                    <Select.Option key="image/jpeg">JPEG</Select.Option>
                    <Select.Option key="image/webp">WEBP</Select.Option>
                </Select>
            </label>
            {compressibleTypes.includes(options.format) && (
                <>
                    <label className={styles.label}>
                        <span className={styles.labelText}>Quality</span>
                        <InputNumber
                            value={options.quality}
                            onChange={handleOptionChange('quality')}
                            placeholder="0-100%"
                            min={0}
                            max={100}
                            className={styles.input}
                            // formatter={value => value ? `${value}%` : (value as any)}
                            // parser={value => !value ? (undefined as any) : Number(value.replace('%', ''))}
                        />
                    </label>
                    <Slider value={options.quality} onChange={handleOptionChange('quality')} min={0} max={100} />
                </>
            )}
        </Flex>
    );
};

const ImageCompressorPage: FunctionComponent = () => {
    return (
        <ImageConverterPageContainer
            sourceTitle="Image Compressor"
            convert={convert}
            defaultOptions={defaultOptions}
            renderOptionsContainer={OptionsComponent}
            optionsStorageKey={getLocalStorageKey('image-compressor', 'options')}
            className={styles.container}
        />
    );
};

export default ImageCompressorPage;
