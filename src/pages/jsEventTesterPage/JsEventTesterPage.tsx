import React, { FunctionComponent, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PageContainer from '../../layouts/pages/pageContainer/PageContainer';
import Flex from '../../components/flex/Flex';
import { Switch, Tabs } from 'antd';
import Text from 'antd/lib/typography/Text';
import joinObjects from '../../utils/joinObjects';
import { useLocalstorageState } from 'rooks';
import getLocalStorageKey from '../../utils/getLocalStorageKey';

const JsEventTesterPage: FunctionComponent = () => {
    const [lastKeyDownEvent, setLastKeyDownEvent] = useState<KeyboardEvent>();
    const [doPreventDefault, setDoPreventDefault] = useLocalstorageState<boolean>(
        getLocalStorageKey('js-event-tester/keydown', 'doPreventDefault'),
        false
    );

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

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (doPreventDefault) {
                event.preventDefault();
            }
            event.stopImmediatePropagation();

            console.log('keydown', event);
            setLastKeyDownEvent(event);
        },
        [doPreventDefault]
    );

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
                        <Flex column gap={16}>
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
                            <label className="d-flex flex-row align-items-center gap-2">
                                <Switch checked={doPreventDefault} onChange={setDoPreventDefault} />
                                preventDefault
                            </label>
                        </Flex>
                    </Tabs.TabPane>
                </Tabs>
            </Flex>
        </PageContainer>
    );
};

export default JsEventTesterPage;
