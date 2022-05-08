import React, { CSSProperties, FunctionComponent, useCallback } from 'react';
import PageContainer from '../../layouts/pages/pageContainer/PageContainer';
import styles from './HtmlEditorPage.module.scss';
import { Button, Col, Row, Tabs } from 'antd';
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
import { VerticalSplit, ViewHeadline } from '@mui/icons-material';
import useChangeValueStateHandler from '../../hooks/useChangeValueStateHandler';

enum EditorTab {
    HTML = 'html',
    CSS = 'css',
    JS = 'js'
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
    minimap: { enabled: false }
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

    const [viewMode, setViewMode] = useLocalstorageState<ViewMode>(
        getLocalStorageKey('html-editor', 'viewMode'),
        ViewMode.SPLIT
    );

    const handleSourceChange = useChangeStateHandler(setSources);

    const handleEditorTabChange = useCallback((tab: string) => {
        setEditorTab(tab as EditorTab);
    }, []);

    const handleViewModeChange = useChangeValueStateHandler(setViewMode);

    const resultSource = useDebouncedMemo(
        { sources },
        ({ sources }) => {
            return `
<style>
${sources.css}
</style>

${sources.html}

<script>
${sources.js}
</script>`.trim();
        },
        [sources],
        50
    ) as string;

    const handleEditorMount = useCallback<OnMount>((editor, monaco) => {
        emmetHTML(monaco);
        emmetCSS(monaco);
        emmetJSX(monaco);
    }, []);

    const leftColSpan = {
        [ViewMode.EDITOR]: 24,
        [ViewMode.SPLIT]: 12,
        [ViewMode.VIEW]: 0
    }[viewMode];

    const rightColSpan = {
        [ViewMode.EDITOR]: 0,
        [ViewMode.SPLIT]: 12,
        [ViewMode.VIEW]: 24
    }[viewMode];

    return (
        <PageContainer noPadding className={styles.container}>
            <Row className={styles.containerRow}>
                <Col
                    span={leftColSpan}
                    className={classNames(styles.col, styles.leftCol, { 'd-none': viewMode === ViewMode.VIEW })}
                >
                    <Tabs
                        activeKey={editorTab}
                        onChange={handleEditorTabChange}
                        tabBarStyle={tabBarStyle}
                        className={styles.editorTabs}
                        tabBarGutter={10}
                        tabBarExtraContent={
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
                        }
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
                <Col
                    span={rightColSpan}
                    className={classNames('yui3-cssreset', styles.col, styles.rightCol, {
                        'd-none': viewMode === ViewMode.EDITOR
                    })}
                >
                    <iframe srcDoc={resultSource} className={styles.resultFrame} />
                </Col>
            </Row>
        </PageContainer>
    );
};

export default HtmlEditorPage;
