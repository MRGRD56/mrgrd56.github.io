import React, { FunctionComponent, useCallback, useMemo, useState } from 'react';
import PageContainer from '../../layouts/pages/pageContainer/PageContainer';
import styles from './DataUrlPage.module.scss';
import { Button, Col, Input, notification, Space, Switch, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import dummyAntdUploadRequest from '../../utils/dummyAntdUploadRequest';
import TextArea from 'antd/lib/input/TextArea';
import useChangeStateHandler from '../../hooks/useChangeStateHandler';
import { DataUrlViewPageQueryParams } from '../dataUrlViewPage/DataUrlViewPage';
import { identity, pickBy } from 'lodash';
import { routes } from '../../constants/router/routes';
import { Link } from 'react-router-dom';
import useStateProducer from '../../hooks/useStateProducer';
import classNames from 'classnames';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import getErrorMessage from '../../utils/getErrorMessage';
import { Base64 } from 'js-base64';
import readFileAsBase64 from '../../utils/readFileAsBase64';

interface DataUrlState {
    title: string;
    mimeType: string;
    encoding: string;
    content: string;
    isBase64: boolean;
}

const initialState: DataUrlState = {
    title: '',
    mimeType: 'text/plain',
    encoding: 'utf-8',
    content: 'Hello World',
    isBase64: false
};

const getDataUrlQueryParams = (state: DataUrlState): DataUrlViewPageQueryParams => {
    // data:[<MIME-type>][;charset=<encoding>][;base64],<data>

    const charsetPart = state.encoding && `;charset=${state.encoding}`;
    const base64Part = state.isBase64 ? ';base64' : '';
    const dataPart = `,${state.content}`;

    const data = `data:${state.mimeType}${charsetPart}${base64Part}${dataPart}`;

    return {
        title: state.title || undefined,
        data
    };
};

const getDataUrlViewUrl = (params: DataUrlViewPageQueryParams): string => {
    const queryParamsPart = new URLSearchParams(pickBy(params, identity)).toString();

    return `${routes.dataUrlView.path}?${queryParamsPart}`;
};

const DataUrlPage: FunctionComponent = () => {
    const [state, setState] = useState<DataUrlState>(initialState);

    const produceState = useStateProducer(setState);
    const handleStateChange = useChangeStateHandler(setState);

    const [displayedDataUrlViewUrl, setDisplayedDataUrlViewUrl] = useState<string>();

    const dataUrlViewLinkRef = (element: HTMLAnchorElement | null) => {
        if (element) {
            setDisplayedDataUrlViewUrl(element.href);
        }
    };

    const dataUrlViewUrl = useMemo(() => {
        return getDataUrlViewUrl(getDataUrlQueryParams(state));
    }, [state]);

    const transformContent = useCallback(
        (transformer: (source: string) => string) => {
            produceState((state) => {
                try {
                    state.content = transformer(state.content);
                } catch (error) {
                    notification.error({
                        message: getErrorMessage(error)
                    });
                }
            });
        },
        [produceState]
    );

    const encodeBase64Content = useCallback(() => transformContent(Base64.encode), [transformContent]);
    const decodeBase64Content = useCallback(() => transformContent(Base64.decode), [transformContent]);

    const handleFileChange = useCallback(async (info: UploadChangeParam<UploadFile<unknown>>) => {
        const { file } = info;

        if (file.status !== 'done') {
            return;
        }

        const { name, type } = file;

        const blob = file.originFileObj;

        const content = (blob && (await readFileAsBase64(blob))) ?? '';

        setState({
            title: name,
            mimeType: type ?? '',
            isBase64: true,
            encoding: '',
            content
        });
    }, []);

    return (
        <PageContainer title="Data URL Generator">
            <Col xs={24} lg={18} xl={12} className={styles.container}>
                <Space className="mb-2">
                    <Upload customRequest={dummyAntdUploadRequest} onChange={handleFileChange} showUploadList={false}>
                        <Button icon={<UploadOutlined />}>Upload file</Button>
                    </Upload>
                </Space>
                <label className={styles.formItem}>
                    <span className={styles.label}>Title:</span>
                    <Input className={styles.input} value={state.title} onChange={handleStateChange('title')} />
                </label>
                <label className={styles.formItem}>
                    <span className={styles.label}>Mime type:</span>
                    <Input className={styles.input} value={state.mimeType} onChange={handleStateChange('mimeType')} />
                </label>
                <label className={styles.formItem}>
                    <span className={styles.label}>Encoding:</span>
                    <Input className={styles.input} value={state.encoding} onChange={handleStateChange('encoding')} />
                </label>
                <label className={styles.formItem}>
                    <span className={styles.label}>Content:</span>
                    <div className={styles.input}>
                        <TextArea
                            className={styles.input}
                            value={state.content}
                            onChange={handleStateChange('content')}
                            rows={3}
                        />
                        <Space className="mt-2">
                            <Button onClick={encodeBase64Content}>Encode base64</Button>
                            <Button onClick={decodeBase64Content}>Decode base64</Button>
                        </Space>
                        <label className={classNames(styles.formItem, 'mt-2')}>
                            <Switch checked={state.isBase64} onChange={handleStateChange('isBase64')} />
                            <span className="ms-3">Base64</span>
                        </label>
                    </div>
                </label>
                <Link to={dataUrlViewUrl} className="mt-3" ref={dataUrlViewLinkRef}>
                    View the iframe
                </Link>
                <TextArea readOnly value={displayedDataUrlViewUrl} rows={4} />
            </Col>
        </PageContainer>
    );
};

export default DataUrlPage;
