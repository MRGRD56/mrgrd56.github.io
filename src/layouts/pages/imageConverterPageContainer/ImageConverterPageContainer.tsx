import React, { FunctionComponent, useState } from 'react';
import styles from './imageConverterPageContainer.module.scss';
import { Col } from 'antd';
import BiConverterPageContainer from '../biConverterPageContainer/BiConverterPageContainer';
import AppImgComparisonSlider from '../../../components/appImgComparisonSlider/AppImgComparisonSlider';
import { useDebouncedMemo } from '../../../hooks/debouncedMemo';
import { OptionsPopoverComponent } from '../textBiConverterPageContainer/TextBiConverterPageContainer';
import useOptionalLocalstorageState from '../../../hooks/useOptionalLocalstorageState';

interface BaseProps<O> {
    sourceTitle: string;
    resultTitle: string;
}

interface PropsWithOptions<O> extends BaseProps<O> {
    convert: (sourceImage: string, options: O) => string;
    defaultOptions: O;
    optionsStorageKey: string;
    renderOptionsContainer: OptionsPopoverComponent<O>;
}

interface PropsWithoutOptions extends BaseProps<undefined> {
    convert: (sourceImage: string) => string;
    defaultOptions?: never;
    optionsStorageKey?: never;
    renderOptionsContainer?: never;
}

type Props<O> = PropsWithOptions<O> | PropsWithoutOptions;

const ImageConverterPageContainer = <O,>(props: Props<O>) => {
    const { sourceTitle, resultTitle, convert, defaultOptions, optionsStorageKey, renderOptionsContainer } = props;

    const [options, setOptions] = useOptionalLocalstorageState<O>(optionsStorageKey, defaultOptions);

    const [sourceImageSrc, setSourceImageSrc] = useState<string>();
    const resultImageSrc = useDebouncedMemo<string | undefined>(
        () => {
            if (!sourceImageSrc) {
                return;
            }

            return convert(sourceImageSrc, options);
        },
        [sourceImageSrc, options],
        100
    );

    return (
        <BiConverterPageContainer
            leftTitle={sourceTitle}
            rightTitle={resultTitle}
            left={<Col>Org</Col>}
            right={
                <AppImgComparisonSlider
                    src1="https://img-comparison-slider.sneas.io/demo/images/before.webp"
                    src2="https://img-comparison-slider.sneas.io/demo/images/after.webp"
                />
            }
        ></BiConverterPageContainer>
    );
};

export default ImageConverterPageContainer;
