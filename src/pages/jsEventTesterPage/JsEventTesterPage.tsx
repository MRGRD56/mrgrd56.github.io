import React, { FunctionComponent, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PageContainer from '../../layouts/pages/pageContainer/PageContainer';
import Flex from '../../components/flex/Flex';
import { Tabs } from 'antd';
import Text from 'antd/lib/typography/Text';
import joinObjects from '../../utils/joinObjects';

const JsEventTesterPage: FunctionComponent = () => {
    const [lastKeyDownEvent, setLastKeyDownEvent] = useState<KeyboardEvent>();

    const containerRef = useRef<HTMLDivElement>(null);

    const pressedModifiers = useMemo<ReactNode[]>(() => {
        if (!lastKeyDownEvent) {
            return [];
        }

        return [
            lastKeyDownEvent.ctrlKey && (
                <Text keyboard key="modifier-ctrl">
                    Ctrl
                </Text>
            ),
            lastKeyDownEvent.altKey && (
                <Text keyboard key="modifier-alt">
                    Alt
                </Text>
            ),
            lastKeyDownEvent.shiftKey && (
                <Text keyboard key="modifier-shift">
                    Shift
                </Text>
            ),
            lastKeyDownEvent.metaKey && (
                <Text keyboard key="modifier-meta">
                    Win
                </Text>
            )
        ].filter(Boolean);
    }, [lastKeyDownEvent]);

    const pressedShortcut = useMemo<ReactNode[]>(() => {
        if (!lastKeyDownEvent) {
            return [];
        }

        return [
            ...pressedModifiers,
            lastKeyDownEvent.location !== 1 && lastKeyDownEvent.location !== 2 && (
                <Text keyboard key="pressed-key">
                    {lastKeyDownEvent.key.toUpperCase()}
                </Text>
            )
        ].filter(Boolean);
    }, [pressedModifiers, lastKeyDownEvent]);

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        event.stopImmediatePropagation();

        console.log('keydown', event);
        setLastKeyDownEvent(event);
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <PageContainer ref={containerRef} title="JavaScript Event Tester" tabIndex={-1}>
            <Flex column maxWidth="800px">
                <Tabs>
                    <Tabs.TabPane tab="keydown">
                        <Flex column>
                            {lastKeyDownEvent ? (
                                <Text className="fs-6">
                                    <Flex column gap={5}>
                                        <Text strong className="fs-5">
                                            {joinObjects(pressedShortcut, <>+</>)}
                                        </Text>
                                        <div>
                                            <Text code>event.key</Text>: <Text keyboard>{lastKeyDownEvent.key}</Text>
                                        </div>
                                        <div>
                                            <Text code>event.code</Text>: <Text keyboard>{lastKeyDownEvent.code}</Text>
                                        </div>
                                        <div>
                                            <Text code>event.which</Text>:{' '}
                                            <Text keyboard>{lastKeyDownEvent.which}</Text>
                                        </div>
                                        <div>
                                            <Text code>modifiers</Text>: {pressedModifiers}
                                        </div>
                                    </Flex>
                                </Text>
                            ) : (
                                <Flex column gap={8}>
                                    <Text strong>Press any key</Text>
                                </Flex>
                            )}
                        </Flex>
                    </Tabs.TabPane>
                </Tabs>
            </Flex>
        </PageContainer>
    );
};

export default JsEventTesterPage;
