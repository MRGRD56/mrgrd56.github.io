import React, { Dispatch, FunctionComponent, ReactNode, SetStateAction, useCallback, useMemo, useState } from 'react';
import { useDebouncedMemo } from '../../../hooks/debouncedMemo';
import getErrorMessage from '../../../utils/getErrorMessage';
import BiConverterPageContainer from '../biConverterPageContainer/BiConverterPageContainer';
import styles from './TextBiConverterPageContainer.module.scss';
import { Alert, Button, Popover, Tooltip } from 'antd';
import { SettingOutlined, SwapOutlined } from '@ant-design/icons';
import AppEditor from '../../../components/appEditor/AppEditor';
import CopyButton from '../../../components/copyButton/CopyButton';
import MonacoLanguage from '../../../types/MonacoLanguage';
import { editor } from 'monaco-editor';
import { isEqual } from 'lodash';
import Flex from '../../../components/flex/Flex';
import useOptionalLocalstorageState from '../../../hooks/useOptionalLocalstorageState';
import Switch from '../../../utils/Switch';
import TextArea from 'antd/lib/input/TextArea';
import useStateChangeByEventHandler from '../../../hooks/useStateChangeByEventHandler';
import classNames from 'classnames';

const sourceEditorOptions: editor.IStandaloneEditorConstructionOptions = {
    minimap: { enabled: false }
};

const resultEditorOptions: editor.IStandaloneEditorConstructionOptions = {
    readOnly: true,
    minimap: { enabled: false }
};

export enum EditorType {
    MONACO,
    PLAIN
}

interface SourceOptions {
    title: string;
    language?: MonacoLanguage;
    editorType?: EditorType;
}

export type TextBiConvert<O = undefined> = (source: string, options: O) => string;
export type RenderOptionsPopover<O> = (
    options: O,
    setOptions: Dispatch<SetStateAction<O>>,
    handleClose: () => void
) => ReactNode;

export interface OptionsPopoverComponentProps<O> {
    options: O;
    onOptionsChange: Dispatch<SetStateAction<O>>;
    onClose: () => void;
}

export type OptionsPopoverComponent<O> = FunctionComponent<OptionsPopoverComponentProps<O>>;

interface BaseProps<O> {
    source1: SourceOptions;
    source2: SourceOptions;
    convert1to2: TextBiConvert<O>;
    convert2to1?: TextBiConvert<O>;
    swapStateStorageKey?: string;
    sourceStorageKey?: string;
}

interface PropsWithOptions<O> extends BaseProps<O> {
    defaultOptions: O;
    optionsStorageKey: string;
    renderOptionsPopover: OptionsPopoverComponent<O>;
}

interface PropsWithoutOptions extends BaseProps<undefined> {
    defaultOptions?: never;
    optionsStorageKey?: never;
    // convert: (source: string, options?: undefined) => string;
    // convertBack?: (source: string) => string;
    renderOptionsPopover?: never;
}

type Props<O> = PropsWithOptions<O> | PropsWithoutOptions;

const TextBiConverterPageContainer = <O,>(props: Props<O>) => {
    const {
        defaultOptions,
        optionsStorageKey,
        convert1to2,
        convert2to1,
        source1,
        source2,
        renderOptionsPopover,
        swapStateStorageKey,
        sourceStorageKey
    } = props;

    const [source, setSource] = useOptionalLocalstorageState<string>(sourceStorageKey, '');
    const handleSourceChange = useStateChangeByEventHandler(setSource);
    const [error, setError] = useState<string>();
    const [isSettingsTooltipVisible, setIsSettingsTooltipVisible] = useState<boolean>(false);
    const [isSettingsVisible, setIsSettingsVisible] = useState<boolean>(false);
    const [isSwappedDirection, setIsSwappedDirection] = useOptionalLocalstorageState(swapStateStorageKey, false);

    const [selectableConversionOptions, setSelectableConversionOptions] = useOptionalLocalstorageState<O>(
        optionsStorageKey,
        defaultOptions
    );

    // const conversionOptions = useMemo(() => {
    //     if (getConversionOptions && selectableOptions) {
    //         return getConversionOptions(selectableOptions);
    //     }
    // }, [selectableConversionOptions]);

    const result = useDebouncedMemo(
        (noResult) => {
            if (!source?.trim()) {
                setError(undefined);
                return '';
            }

            try {
                const convert = isSwappedDirection && convert2to1 ? convert2to1 : convert1to2;
                const result = convert(source, selectableConversionOptions as any);

                setError(undefined);

                return result;
            } catch (e) {
                setError(getErrorMessage(e));

                if (e instanceof SyntaxError) {
                    return noResult;
                } else {
                    throw e;
                }
            }
        },
        [source, selectableConversionOptions, isSwappedDirection, convert1to2, convert2to1],
        50
    );

    const { sourceLeft, sourceRight } = useMemo(() => {
        return {
            sourceLeft: isSwappedDirection ? source2 : source1,
            sourceRight: isSwappedDirection ? source1 : source2
        };
    }, [source1, source2, isSwappedDirection]);

    const handleSettingsClick = useCallback(() => {
        setIsSettingsVisible((isVisible) => !isVisible);
        setIsSettingsTooltipVisible(false);
    }, []);

    const optionsPopoverContent = useMemo(() => {
        if (!renderOptionsPopover) {
            return;
        }

        // return renderOptionsPopover({
        //     options: selectableConversionOptions,
        //     onOptionsChange: setSelectableConversionOptions,
        //     onClose: handleSettingsClick
        // });

        const OptionsPopoverContent = renderOptionsPopover;
        return (
            <OptionsPopoverContent
                options={selectableConversionOptions}
                onOptionsChange={setSelectableConversionOptions}
                onClose={handleSettingsClick}
            />
        );

        // console.log('CHECK COMPONENT', {
        //     renderOptionsPopover,
        //     isFC: isFunctionComponent<OptionsPopoverComponent<O>>(renderOptionsPopover)
        // });
        // if (isFunctionComponent<OptionsPopoverComponent<O>>(renderOptionsPopover)) {
        //
        // }
        //
        // return renderOptionsPopover(selectableConversionOptions, setSelectableConversionOptions, handleSettingsClick);
    }, [selectableConversionOptions, setSelectableConversionOptions, handleSettingsClick]);

    const handleSettingsTooltipVisibleChange = useCallback(
        (value: boolean) => {
            if (!isSettingsVisible) {
                setIsSettingsTooltipVisible(value);
            }
        },
        [isSettingsVisible]
    );

    const handleSwapConversionDirectionClick = useCallback(() => {
        setSource(result ?? '');
        setIsSwappedDirection((x) => !x);
    }, [setIsSwappedDirection, result]);

    // const handlePlainEditorKeydown = useCallback<React.KeyboardEventHandler<HTMLTextAreaElement>>((event) => {
    //     if (event.key === 'Tab') {
    //         event.preventDefault();
    //     }
    // }, []);

    return (
        <BiConverterPageContainer
            className={styles.pageContainer}
            leftTitle={sourceLeft.title}
            leftExtra={
                <Flex row gap={4}>
                    {convert2to1 && (
                        <Tooltip title="Swap conversion direction" placement="bottomRight">
                            <Button type="text" icon={<SwapOutlined />} onClick={handleSwapConversionDirectionClick} />
                        </Tooltip>
                    )}
                    {renderOptionsPopover && (
                        <Popover
                            trigger="click"
                            visible={isSettingsVisible}
                            onVisibleChange={setIsSettingsVisible}
                            content={optionsPopoverContent}
                            placement="bottomRight"
                        >
                            <Tooltip
                                title="Settings"
                                placement="bottomRight"
                                visible={isSettingsVisible ? false : isSettingsTooltipVisible}
                                onVisibleChange={handleSettingsTooltipVisibleChange}
                            >
                                <Button type="text" icon={<SettingOutlined />} onClick={handleSettingsClick} />
                            </Tooltip>
                        </Popover>
                    )}
                </Flex>
            }
            left={Switch.of(sourceLeft.editorType ?? EditorType.MONACO)
                .onCase(EditorType.MONACO, () => (
                    <AppEditor
                        className={styles.editor}
                        language={sourceLeft.language}
                        options={sourceEditorOptions}
                        value={source}
                        onChange={setSource}
                    />
                ))
                .onCase(EditorType.PLAIN, () => (
                    <TextArea
                        className={classNames(styles.editor, styles.plainEditor)}
                        value={source}
                        onChange={handleSourceChange}
                        // onKeyDown={handlePlainEditorKeydown}
                    />
                ))
                .value()}
            rightTitle={sourceRight.title}
            rightExtra={
                <Tooltip title="Copy" placement="bottomLeft">
                    <CopyButton value={result} type="text" children="" />
                </Tooltip>
            }
            right={Switch.of(sourceRight.editorType ?? EditorType.MONACO)
                .onCase(EditorType.MONACO, () => (
                    <AppEditor
                        className={styles.editor}
                        language={sourceRight.language}
                        options={resultEditorOptions}
                        value={result}
                    />
                ))
                .onCase(EditorType.PLAIN, () => (
                    <TextArea className={classNames(styles.editor, styles.plainEditor)} value={result} readOnly />
                ))
                .value()}
            extra={error && <Alert className={styles.messageContainer} type="error" showIcon message={error} />}
        />
    );
};

export default React.memo(TextBiConverterPageContainer, isEqual) as typeof TextBiConverterPageContainer;
