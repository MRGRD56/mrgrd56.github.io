import React, { FunctionComponent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PageContainer from '../../layouts/pages/pageContainer/PageContainer';
import styles from './HhDictionariesPage.module.scss';
import { Select, Table, Tabs } from 'antd';
import useWriteableLocalstorageState from '../../hooks/useWriteableLocalstorageState';
import getLocalStorageKey from '../../utils/getLocalStorageKey';
import Flex from '../../components/flex/Flex';
import appAxios from '../../actions/api/appAxios';
import { get, omit } from 'lodash';
import Column from 'antd/lib/table/Column';
import call from '../../utils/call';
import { compareFields, compareNumbers, compareNumericStrings, Comparer, compareStrings } from '../../utils/sorting';
import { ExpandableConfig } from 'antd/lib/table/interface';
import Loading from '../../components/loading/Loading';
import CopyButton from '../../components/copyButton/CopyButton';
import ExternalLink from '../../components/ExternalLink';
import { LinkOutlined } from '@ant-design/icons';
import Search from 'antd/lib/input/Search';
import useInputState from '../../hooks/useInputState';
import { useDebouncedMemo } from '../../hooks/debouncedMemo';

enum HHDictionary {
    PROFESSIONAL_ROLES = 'professional_roles',
    SPECIALIZATIONS = 'specializations',
    INDUSTRIES = 'industries',
    AREAS = 'areas'
}

enum DictionaryViewMode {
    TREE = 'TREE',
    FLAT = 'FLAT',
    INVERTED_2_LEVEL_TREE = 'INVERTED_2_LEVEL_TREE'
}

interface HHDictionaryOptions {
    viewModes?: DictionaryViewMode[]; // if undefined - all are supported
    rootPath?: string;
    itemChildrenNodeName: string;
    idSorter: Comparer<Entry>;
}

interface Entry {
    id: string;
    name: string;

    matchingQuery?: string;
}

interface ParentEntry extends Entry {
    items: ParentEntry[];
}

const isParentEntry = (entry: Entry): entry is ParentEntry => {
    return Array.isArray((entry as any).items);
};

interface HHDictionaryData {
    views: {
        [DictionaryViewMode.TREE]: ParentEntry[];
        [DictionaryViewMode.FLAT]: Entry[];
        [DictionaryViewMode.INVERTED_2_LEVEL_TREE]: ParentEntry[];
    };
}

const stringIdSorter = compareFields<string, Entry>('id', compareStrings);
const numberIdSorter = compareFields<string, Entry>('id', compareNumericStrings);
const nameSorter = compareFields<string, Entry>('name', compareStrings);
const itemsCountSorter = compareFields<number, Entry>('items.length', compareNumbers);

const dictionariesOptions: Record<HHDictionary, HHDictionaryOptions> = {
    [HHDictionary.PROFESSIONAL_ROLES]: {
        viewModes: [DictionaryViewMode.TREE, DictionaryViewMode.INVERTED_2_LEVEL_TREE],
        rootPath: 'categories',
        itemChildrenNodeName: 'roles',
        idSorter: numberIdSorter
    },
    [HHDictionary.SPECIALIZATIONS]: {
        itemChildrenNodeName: 'specializations',
        idSorter: numberIdSorter
    },
    [HHDictionary.INDUSTRIES]: {
        itemChildrenNodeName: 'industries',
        idSorter: numberIdSorter
    },
    [HHDictionary.AREAS]: {
        viewModes: [DictionaryViewMode.TREE, DictionaryViewMode.FLAT],
        itemChildrenNodeName: 'areas',
        idSorter: numberIdSorter
    }
};

const isViewModeSupported = (options: HHDictionaryOptions, mode: DictionaryViewMode) => {
    return !options.viewModes || options.viewModes.includes(mode);
};

const parseEntriesTree = (root: any[], options: HHDictionaryOptions): ParentEntry[] => {
    const { itemChildrenNodeName, idSorter } = options;

    return root
        .map((item) => {
            const itemsNode = item[itemChildrenNodeName] ?? [];

            return {
                id: item.id,
                name: item.name,
                ...omit(item, 'id', 'name', itemChildrenNodeName),
                items: parseEntriesTree(itemsNode, options)
            } as ParentEntry;
        })
        .sort(idSorter);
};

const flatEntries = (tree: ParentEntry[]): Entry[] => {
    const flat: Entry[] = [];

    tree.forEach((entry) => {
        flat.push(omit(entry, 'items'));
        flat.push(...flatEntries(entry.items));
    });

    return flat;
};

const invertEntries2LevelTree = (tree: ParentEntry[]): ParentEntry[] => {
    const interimResultKeys = new Map<ParentEntry['id'], ParentEntry>();
    const interimResult = new Map<ParentEntry['id'], ParentEntry[]>();

    for (const level1 of tree) {
        for (const level2 of level1.items) {
            const interimResultEntry = interimResult.get(level2.id);
            if (interimResultEntry) {
                interimResultEntry.push(level1);
            } else {
                interimResult.set(level2.id, [level1]);
                interimResultKeys.set(level2.id, level2);
            }
        }
    }

    return Array.from(interimResult.entries()).map(([level2Id, level1Items]) => {
        const level2 = interimResultKeys.get(level2Id);

        return {
            ...level2,
            items: level1Items.map((level1) => ({
                ...level1,
                items: []
            }))
        } as ParentEntry;
    });
};

const treeExpandable: ExpandableConfig<ParentEntry> = {
    expandedRowRender: (record) => {
        const isExpandable = record.items.some((item) => item.items.length > 0);

        return (
            <Table
                dataSource={record.items}
                expandable={isExpandable ? treeExpandable : undefined}
                rowKey="id"
                pagination={false}
            >
                <Column key="id" dataIndex="id" title="ID" sorter={numberIdSorter} />
                <Column key="name" dataIndex="name" title="Name" sorter={nameSorter} />
                {isExpandable && (
                    <Column
                        key="itemsCount"
                        dataIndex={['items', 'length']}
                        title="Items"
                        sortDirections={['descend', 'ascend']}
                        sorter={itemsCountSorter}
                    />
                )}
            </Table>
        );
    },
    expandRowByClick: true
};

const isEntryMatchBySearchQuery = (entry: Entry, query: string): boolean => {
    if (!query) {
        return true;
    }

    if (entry.id === query) {
        return true;
    }

    if (entry.name.toLowerCase().includes(query)) {
        return true;
    }

    // if (isParentEntry(entry)) {
    //     return entry.items.some(item => isEntryMatchBySearchQuery(item, query));
    // }

    return false;
};

const preFilterEntriesBySearchQuery = <E extends Entry>(entries: E[], query: string): Array<E | undefined> => {
    return entries.map((entry) => {
        const isMatchItself = isEntryMatchBySearchQuery(entry, query);
        if (isMatchItself) {
            return {
                ...entry,
                matchingQuery: query || undefined
            };
        }

        if (isParentEntry(entry)) {
            const preFilteredItems = filterEntriesBySearchQuery(entry.items, query);
            const hasMatchingItems = preFilteredItems.some(Boolean);

            if (!hasMatchingItems) {
                return;
            }

            return {
                ...entry,
                items: preFilteredItems
            } as ParentEntry;
        }
    }) as Array<E | undefined>;

    // const firstLevelFiltered = entries.filter(entry => {
    //     return isEntryMatchBySearchQuery(entry, query);
    // });
    //
    // return firstLevelFiltered.map(entry => {
    //     if (isParentEntry(entry)) {
    //         return {
    //             ...entry,
    //             items: filterEntriesBySearchQuery(entry.items, query)
    //         };
    //     }
    //
    //     return entry;
    // });
};

const filterEntriesBySearchQuery = <E extends Entry>(entries: E[], query: string): Array<E | undefined> => {
    return preFilterEntriesBySearchQuery(entries, query).filter(Boolean) as E[];
};

const HhDictionariesPage: FunctionComponent = () => {
    const [dictionary, setDictionary] = useWriteableLocalstorageState<HHDictionary>(
        getLocalStorageKey('headhunter-dictionaries', 'dictionary'),
        HHDictionary.PROFESSIONAL_ROLES
    );

    const [searchQuery, , setSearchQueryByEvent] = useInputState<string>('');

    const [viewMode, setViewMode] = useState<DictionaryViewMode>(DictionaryViewMode.TREE);

    const dictionaryOptions = dictionariesOptions[dictionary];

    const [dictionariesData, setDictionariesData] = useState<Partial<Record<HHDictionary, HHDictionaryData>>>({});
    const [dictionaryData, setDictionaryData] = useState<HHDictionaryData>();

    const displayedDictionaryData = useDebouncedMemo(
        () => {
            if (!dictionaryData) {
                return dictionaryData;
            }

            return {
                ...dictionaryData,
                views: {
                    ...dictionaryData.views,
                    [viewMode]: filterEntriesBySearchQuery(
                        dictionaryData.views[viewMode],
                        searchQuery.trim().toLowerCase()
                    )
                }
            };
        },
        [dictionaryData, viewMode, searchQuery],
        100
    );

    const fetchDictionaryData = useCallback(async (dictionary: HHDictionary): Promise<HHDictionaryData> => {
        const { data: raw } = await appAxios.get<object>(`https://api.hh.ru/${dictionary}`);

        const dictionaryOptions = dictionariesOptions[dictionary];

        const root: any[] = dictionaryOptions.rootPath === undefined ? raw : get(raw, dictionaryOptions.rootPath);
        const tree: ParentEntry[] = parseEntriesTree(root, dictionaryOptions);
        const flat: Entry[] = flatEntries(tree);
        const inverted2LevelTree: ParentEntry[] = invertEntries2LevelTree(tree);

        return {
            views: {
                [DictionaryViewMode.TREE]: tree,
                [DictionaryViewMode.FLAT]: flat,
                [DictionaryViewMode.INVERTED_2_LEVEL_TREE]: inverted2LevelTree
            }
        };
    }, []);

    const stringData = useMemo<string | undefined>(() => {
        return displayedDictionaryData && JSON.stringify(displayedDictionaryData.views[viewMode], undefined, 4);
    }, [displayedDictionaryData, viewMode]);

    const previousDictionaryRef = useRef<HHDictionary>();

    useEffect(() => {
        call(async () => {
            const previousDictionary = previousDictionaryRef.current;
            previousDictionaryRef.current = dictionary;

            if (previousDictionary === dictionary) {
                return;
            }

            const loadedData = dictionariesData[dictionary];
            if (loadedData) {
                setDictionaryData(loadedData);
                return;
            }

            setDictionaryData(undefined);
            const fetchedData = await fetchDictionaryData(dictionary);
            setDictionariesData((data) => ({
                ...data,
                [dictionary]: fetchedData
            }));
            setDictionaryData(fetchedData);
        });
    }, [dictionary, dictionariesData, fetchDictionaryData]);

    return (
        <PageContainer title="HeadHunter Dictionaries">
            <Flex col gap={8}>
                <Flex row gap={12} align="center">
                    <label className="d-flex align-items-center gap-2">
                        Dictionary
                        <Select className={styles.dictionarySelect} value={dictionary} onSelect={setDictionary}>
                            <Select.Option value={HHDictionary.PROFESSIONAL_ROLES}>
                                {HHDictionary.PROFESSIONAL_ROLES}
                            </Select.Option>
                            <Select.Option value={HHDictionary.SPECIALIZATIONS}>
                                {HHDictionary.SPECIALIZATIONS}
                            </Select.Option>
                            <Select.Option value={HHDictionary.INDUSTRIES}>{HHDictionary.INDUSTRIES}</Select.Option>
                            <Select.Option value={HHDictionary.AREAS}>{HHDictionary.AREAS}</Select.Option>
                        </Select>
                    </label>
                    <ExternalLink href={`https://api.hh.ru/${dictionary}`} className={styles.apiLinkIcon}>
                        <LinkOutlined />
                    </ExternalLink>
                </Flex>

                <Search
                    value={searchQuery}
                    onChange={setSearchQueryByEvent}
                    placeholder="Search items by id or name"
                    className={styles.search}
                    allowClear
                />

                {displayedDictionaryData ? (
                    <Flex col gap={8}>
                        <Tabs activeKey={viewMode} onChange={setViewMode as (activeKey: string) => void}>
                            {isViewModeSupported(dictionaryOptions, DictionaryViewMode.TREE) && (
                                <Tabs.TabPane tab="Tree" key={DictionaryViewMode.TREE}>
                                    <Table
                                        dataSource={displayedDictionaryData.views.TREE}
                                        expandable={treeExpandable}
                                        rowKey="id"
                                    >
                                        <Column
                                            key="id"
                                            dataIndex="id"
                                            title="ID"
                                            sorter={dictionaryOptions.idSorter}
                                        />
                                        <Column key="name" dataIndex="name" title="Name" sorter={nameSorter} />
                                        {/*//         render={(value, record) => (*/}
                                        {/*//             record.matchingQuery ? (*/}
                                        {/*//                 <Highlighter*/}
                                        {/*//                     searchWords={[record.matchingQuery]}*/}
                                        {/*//                     textToHighlight={record.name}*/}
                                        {/*//                 />*/}
                                        {/*//             ) : (*/}
                                        {/*//                 record.name*/}
                                        {/*//             )*/}
                                        {/*//         )}*/}
                                        {/*// />*/}
                                        <Column
                                            key="itemsCount"
                                            dataIndex={['items', 'length']}
                                            title="Items"
                                            sortDirections={['descend', 'ascend']}
                                            sorter={itemsCountSorter}
                                        />
                                    </Table>
                                </Tabs.TabPane>
                            )}
                            {isViewModeSupported(dictionaryOptions, DictionaryViewMode.INVERTED_2_LEVEL_TREE) && (
                                <Tabs.TabPane tab="Inverted Tree" key={DictionaryViewMode.INVERTED_2_LEVEL_TREE}>
                                    <Table
                                        dataSource={displayedDictionaryData.views.INVERTED_2_LEVEL_TREE}
                                        expandable={treeExpandable}
                                        rowKey="id"
                                    >
                                        <Column
                                            key="id"
                                            dataIndex="id"
                                            title="ID"
                                            sorter={dictionaryOptions.idSorter}
                                        />
                                        <Column key="name" dataIndex="name" title="Name" sorter={nameSorter} />
                                        <Column
                                            key="itemsCount"
                                            dataIndex={['items', 'length']}
                                            title="Items"
                                            sortDirections={['descend', 'ascend']}
                                            sorter={itemsCountSorter}
                                        />
                                    </Table>
                                </Tabs.TabPane>
                            )}
                            {isViewModeSupported(dictionaryOptions, DictionaryViewMode.FLAT) && (
                                <Tabs.TabPane tab="Flat" key={DictionaryViewMode.FLAT}>
                                    <Table dataSource={displayedDictionaryData.views.FLAT} rowKey="id">
                                        <Column
                                            key="id"
                                            dataIndex="id"
                                            title="ID"
                                            sorter={dictionaryOptions.idSorter}
                                        />
                                        <Column key="name" dataIndex="name" title="Name" sorter={nameSorter} />
                                    </Table>
                                </Tabs.TabPane>
                            )}
                        </Tabs>

                        <CopyButton className="align-self-start" value={stringData}>
                            Copy data as JSON
                        </CopyButton>
                    </Flex>
                ) : (
                    <Loading delay={100} />
                )}
            </Flex>
        </PageContainer>
    );
};

export default HhDictionariesPage;
