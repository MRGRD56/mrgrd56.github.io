import React, { FunctionComponent, useCallback, useEffect, useRef } from 'react';
import PageContainer, { PageTag } from '../../layouts/pages/pageContainer/PageContainer';
import styles from './HttpClientPage.module.scss';
import Flex from '../../components/flex/Flex';
import { Select, Spin } from 'antd';
import HttpMethod from './types/HttpMethod';
import { identity, values } from 'lodash';
import Search from 'antd/lib/input/Search';
import useWriteableLocalstorageState from '../../hooks/useWriteableLocalstorageState';
import getLocalStorageKey from '../../utils/getLocalStorageKey';
import HttpRequest from './types/HttpRequest';
import useChangeStateHandler from '../../hooks/useChangeStateHandler';
import Split from 'react-split';
import classNames from 'classnames';
import AppEditor from '../../components/appEditor/AppEditor';
import axios, { AxiosResponse, Method } from 'axios';
import useAsync from '../../hooks/useAsync';
import logged from '../../utils/logged';
import getResponseLanguage from './utils/getResponseLanguage';
import MonacoLanguage from '../../types/MonacoLanguage';
import { OnMount } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import processRef from '../../utils/processRef';

const { Option } = Select;

enum RequestTab {
    PARAMS = 'PARAMS',
    HEADERS = 'HEADERS',
    BODY = 'BODY'
}

enum ResponseTab {
    BODY = 'BODY',
    HEADERS = 'HEADERS',
    COOKIES = 'COOKIES',
    RAW = 'RAW'
}

const HttpClientPage: FunctionComponent = () => {
    const [request, setRequest] = useWriteableLocalstorageState<HttpRequest>(
        getLocalStorageKey('http-client', 'request'),
        {
            method: HttpMethod.GET,
            url: ''
        }
    );
    const handleRequestChange = useChangeStateHandler(setRequest);

    const responseEditorRef = useRef<editor.IStandaloneCodeEditor>();

    const sendRequest = useCallback(async (): Promise<AxiosResponse<string, unknown>> => {
        return logged(
            axios.request<string>({
                method: request.method as unknown as Method,
                url: request.url,
                transformResponse: identity
            })
        );
    }, [request]);

    const {
        invoke: handleRequestSend,
        result: response,
        isLoading: isFetching,
        error: fetchingError
    } = useAsync(sendRequest);

    useEffect(() => {
        setTimeout(() => {
            processRef(responseEditorRef, async (responseEditor) => {
                await responseEditor.getAction('editor.action.formatDocument').run();
                responseEditor.revealLine(0, editor.ScrollType.Immediate);
            });
        }, 50);
    }, [response]);

    const handleResponseEditorMount = useCallback<OnMount>((editor) => {
        responseEditorRef.current = editor;
    }, []);

    // const handleRequestSend = useCallback(async () => {
    //     setIsFetching(true);
    //     try {
    //         const response = await axios.request<string>({
    //             method: request.method as unknown as Method,
    //             transformResponse: identity
    //         });
    //         setResponse(response);
    //     } catch (error) {
    //
    //     } finally {
    //         setIsFetching(false);
    //     }
    // }, [request]);

    return (
        <PageContainer
            className={styles.container}
            tags={[PageTag.WIP]}
            contentClassName={styles.container}
            noContentPadding
        >
            <Split className={classNames('app-split', styles.content)} direction="vertical" minSize={50} snapOffset={0}>
                <Flex col className={styles.requestContainer}>
                    <Search
                        className={styles.requestMain}
                        placeholder="Enter request URL"
                        addonBefore={
                            <Select
                                value={request.method}
                                onChange={handleRequestChange('method')}
                                className={styles.requestMethodSelect}
                            >
                                {values(HttpMethod).map((method) => (
                                    <Option key={method} value={method}>
                                        {method}
                                    </Option>
                                ))}
                            </Select>
                        }
                        enterButton="Send"
                        onSearch={handleRequestSend}
                        value={request.url}
                        onChange={handleRequestChange('url')}
                    />
                </Flex>
                <Flex col className={styles.responseContainer}>
                    <Spin spinning={isFetching} className={styles.responseLoading}>
                        <AppEditor
                            onMount={handleResponseEditorMount}
                            beforeMount={console.log}
                            language={response && (getResponseLanguage(response) as MonacoLanguage)}
                            value={response?.data ?? ''}
                            options={{ readOnly: false }}
                            className={styles.responseBodyText}
                        />
                    </Spin>
                </Flex>
            </Split>
        </PageContainer>
    );
};

export default HttpClientPage;
