import React, { CSSProperties, FunctionComponent, useCallback } from 'react';
import styles from './HtmlEditorPage.module.scss';
import { Button, Col, Row, Select, Space, Tabs, Tooltip } from 'antd';
import { useLocalstorageState } from 'rooks';
import getLocalStorageKey from '../../utils/getLocalStorageKey';
import useChangeStateHandler from '../../hooks/useChangeStateHandler';
import AppEditor from '../../components/appEditor/AppEditor';
import classNames from 'classnames';
import { useDebouncedMemo } from '../../hooks/debouncedMemo';
import Html from '@mui/icons-material/Html';
import Css from '@mui/icons-material/Css';
import Javascript from '@mui/icons-material/Javascript';
import { OnMount } from '@monaco-editor/react';
import { emmetCSS, emmetHTML, emmetJSX } from 'emmet-monaco-es';
import { editor } from 'monaco-editor';
import ButtonGroup from 'antd/lib/button/button-group';
import { Code, VerticalSplit, ViewHeadline, Visibility } from '@mui/icons-material';
import useChangeValueStateHandler from '../../hooks/useChangeValueStateHandler';
import Split from 'react-split';
import './HtmlEditorPage.scss';
import SingleConverterPageContainer from '../../layouts/pages/singleConverterPageContainer/SingleConverterPageContainer';
import { EditOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';

enum EditorTab {
    HTML = 'html',
    CSS = 'css',
    JS = 'js'
}

enum ViewTab {
    PREVIEW = 'PREVIEW',
    SOURCE = 'SOURCE'
}

type EditorSources = Record<EditorTab, string>;

const sourcesInitial: EditorSources = {
    html: `
<div class="example">
    <p>
        Follow me on GitHub
        <a href="https://github.com/MRGRD56" target="_blank" rel="noopener noreferrer">
            https://github.com/MRGRD56</a> ;)
    </p>
    <button class="button1">Click me</button>
</div>`.trimStart(),
    css: `
html {
    font-family: Arial, sans-serif;
}

.example, .example a {
    color: #039be5;
}`.trimStart(),
    js: `
document.querySelector('button.button1')
    .addEventListener('click', () => {
        alert('Hello world!')
    });`.trimStart()
};

const tabBarStyle: CSSProperties = {
    margin: 0,
    paddingLeft: 15,
    paddingRight: 15
};

const editorOptions: editor.IStandaloneEditorConstructionOptions = {
    minimap: { enabled: false },
    automaticLayout: false
};

const resultEditorOptions: editor.IStandaloneEditorConstructionOptions = {
    ...editorOptions,
    readOnly: true
};

enum ViewMode {
    EDITOR = 'EDITOR',
    SPLIT = 'SPLIT',
    VIEW = 'VIEW'
}

// const viewModes: CheckboxOptionType[] = [
//     {
//         value: ViewMode.EDITOR,
//         label: <ViewHeadline/>
//     },
//     {
//         value: ViewMode.SPLIT,
//         label: <VerticalSplit/>
//     }
// ];

const HtmlEditorPage: FunctionComponent = () => {
    const [sources, setSources] = useLocalstorageState<EditorSources>(
        getLocalStorageKey('html-editor', 'sources'),
        sourcesInitial
    );

    const [editorTab, setEditorTab] = useLocalstorageState<EditorTab>(
        getLocalStorageKey('html-editor', 'editorTab'),
        EditorTab.HTML
    );

    const [viewTab, setViewTab] = useLocalstorageState<ViewTab>(
        getLocalStorageKey('html-editor', 'viewTab'),
        ViewTab.PREVIEW
    );

    const [viewMode, setViewMode] = useLocalstorageState<ViewMode>(
        getLocalStorageKey('html-editor', 'viewMode'),
        ViewMode.SPLIT
    );

    const handleSourceChange = useChangeStateHandler(setSources);

    const handleEditorTabChange = useCallback((tab: string) => {
        setEditorTab(tab as EditorTab);
    }, []);

    const handleViewTabChange = useCallback((tab: string) => {
        setViewTab(tab as ViewTab);
    }, []);

    const handleViewModeChange = useChangeValueStateHandler(setViewMode);

    const resultSource = useDebouncedMemo(
        { sources },
        ({ sources }) => {
            const cssPart = sources.css.trim() ? `<style>\n${sources.css.trim()}\n</style>` : '';
            const jsPart = sources.js.trim() ? `<script>\n${sources.js.trim()}\n</script>` : '';

            return [cssPart, sources.html, jsPart].filter(Boolean).join('\n\n');
        },
        [sources],
        50
    ) as string;

    const handleEditorMount = useCallback<OnMount>((editor, monaco) => {
        emmetHTML(monaco);
        emmetCSS(monaco);
        emmetJSX(monaco);

        editor.layout();
    }, []);

    // const leftColSpan = {
    //     [ViewMode.EDITOR]: 24,
    //     [ViewMode.SPLIT]: 12,
    //     [ViewMode.VIEW]: 0
    // }[viewMode];
    //
    // const rightColSpan = {
    //     [ViewMode.EDITOR]: 0,
    //     [ViewMode.SPLIT]: 12,
    //     [ViewMode.VIEW]: 24
    // }[viewMode];

    const leftCol = (
        <Col className={classNames(styles.col, styles.leftCol, { 'd-none': viewMode === ViewMode.VIEW })}>
            <Tabs
                activeKey={editorTab}
                onChange={handleEditorTabChange}
                tabBarStyle={tabBarStyle}
                className={styles.editorTabs}
                tabBarGutter={10}
            >
                <Tabs.TabPane
                    tab={
                        <div className={styles.tabTitleWrapper}>
                            <Html className={styles.tabTitle} />
                        </div>
                    }
                    key={EditorTab.HTML}
                    className={styles.editorTab}
                >
                    <AppEditor
                        value={sources.html}
                        onChange={handleSourceChange(EditorTab.HTML)}
                        className={styles.editor}
                        language="html"
                        onMount={handleEditorMount}
                        options={editorOptions}
                    />
                </Tabs.TabPane>
                <Tabs.TabPane
                    tab={
                        <div className={styles.tabTitleWrapper}>
                            <Css className={styles.tabTitle} />
                        </div>
                    }
                    key={EditorTab.CSS}
                    className={styles.editorTab}
                >
                    <AppEditor
                        value={sources.css}
                        onChange={handleSourceChange(EditorTab.CSS)}
                        className={styles.editor}
                        language="css"
                        onMount={handleEditorMount}
                        options={editorOptions}
                    />
                </Tabs.TabPane>
                <Tabs.TabPane
                    tab={
                        <div className={styles.tabTitleWrapper}>
                            <Javascript className={styles.tabTitle} />
                        </div>
                    }
                    key={EditorTab.JS}
                    className={styles.editorTab}
                >
                    <AppEditor
                        value={sources.js}
                        onChange={handleSourceChange(EditorTab.JS)}
                        className={styles.editor}
                        language="javascript"
                        onMount={handleEditorMount}
                        options={editorOptions}
                    />
                </Tabs.TabPane>
            </Tabs>
        </Col>
    );

    const rightCol = (
        <Col
            className={classNames(styles.col, styles.rightCol, {
                'd-none': viewMode === ViewMode.EDITOR
            })}
        >
            <Tabs
                activeKey={viewTab}
                onChange={handleViewTabChange}
                tabBarStyle={tabBarStyle}
                className={styles.editorTabs}
                tabBarGutter={10}
            >
                <Tabs.TabPane
                    key={ViewTab.PREVIEW}
                    tab={
                        <div className={styles.tabTitleWrapper}>
                            <Visibility className={styles.tabTitle} />
                        </div>
                    }
                    className={styles.editorTab}
                >
                    <iframe srcDoc={resultSource} className={styles.resultFrame} />
                </Tabs.TabPane>
                <Tabs.TabPane
                    key={ViewTab.SOURCE}
                    tab={
                        <div className={styles.tabTitleWrapper}>
                            <Code className={styles.tabTitle} />
                        </div>
                    }
                    className={styles.editorTab}
                >
                    <AppEditor
                        value={resultSource}
                        className={styles.editor}
                        language="html"
                        options={resultEditorOptions}
                    />
                </Tabs.TabPane>
            </Tabs>
        </Col>
    );

    const titleExtra = (
        <div className={styles.titleExtra}>
            <Space>
                <Select></Select>
                <ButtonGroup>
                    <Tooltip title="Edit" placement="bottom">
                        <Button icon={<EditOutlined />} />
                    </Tooltip>
                    <Tooltip title="Delete" placement="bottom">
                        <Button icon={<MinusOutlined />} />
                    </Tooltip>
                    <Tooltip title="Add" placement="bottom">
                        <Button icon={<PlusOutlined />} />
                    </Tooltip>
                </ButtonGroup>
            </Space>
            <ButtonGroup>
                <Button
                    type="text"
                    icon={<ViewHeadline />}
                    className={classNames({ 'antd-text-primary': viewMode === ViewMode.EDITOR })}
                    onClick={handleViewModeChange(ViewMode.EDITOR)}
                />
                <Button
                    type="text"
                    icon={<VerticalSplit />}
                    className={classNames({ 'antd-text-primary': viewMode === ViewMode.SPLIT })}
                    onClick={handleViewModeChange(ViewMode.SPLIT)}
                />
            </ButtonGroup>
        </div>
    );

    return (
        <SingleConverterPageContainer className={styles.container} title="HTML Editor" titleExtra={titleExtra}>
            {viewMode === ViewMode.SPLIT ? (
                <Split className={styles.containerRow} direction="horizontal" minSize={0} snapOffset={25}>
                    {leftCol}
                    {rightCol}
                </Split>
            ) : (
                <Row className={styles.containerRow}>
                    {viewMode === ViewMode.EDITOR && leftCol}
                    {viewMode === ViewMode.VIEW && rightCol}
                </Row>
            )}
        </SingleConverterPageContainer>
    );
};

export default HtmlEditorPage;
