import React, { FunctionComponent, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import PageContainer from '../../layouts/pages/pageContainer/PageContainer';
import styles from './HhDictionariesPage.module.scss';
import { Checkbox, Popover, Select, Table, Tabs } from 'antd';
import useWriteableLocalstorageState from '../../hooks/useWriteableLocalstorageState';
import getLocalStorageKey from '../../utils/getLocalStorageKey';
import Flex from '../../components/flex/Flex';
import appAxios from '../../actions/api/appAxios';
import { get, isString, omit, values } from 'lodash';
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
import { useDebounce } from 'rooks';
import { Info } from '@mui/icons-material';
import Text from 'antd/lib/typography/Text';
import useChangeAnyStateHandler from '../../hooks/useChangeAnyStateHandler';
import TabChangeHandler from '../../types/antd/TabChangeHandler';

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

const allViewModes = values(DictionaryViewMode);

const isViewModeSupported = (options: HHDictionaryOptions, mode: DictionaryViewMode) => {
    return !options.viewModes || options.viewModes.includes(mode);
};

const getViewModes = (options: HHDictionaryOptions): DictionaryViewMode[] => {
    return options.viewModes ?? allViewModes;
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

    return flat.sort(numberIdSorter);
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

    return Array.from(interimResult.entries())
        .map(([level2Id, level1Items]) => {
            const level2 = interimResultKeys.get(level2Id);

            return {
                ...level2,
                items: level1Items
                    .map((level1) => ({
                        ...level1,
                        items: []
                    }))
                    .sort(numberIdSorter)
            } as ParentEntry;
        })
        .sort(numberIdSorter);
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

    const idQuery = parseQuery(parseIdQuery(query), true);

    if (idQuery !== undefined && isMatchByQuery(entry.id, idQuery)) {
        return true;
    }

    const exactNameQuery = parseQuery(parseExactNameQuery(query), true);

    if (exactNameQuery !== undefined && isMatchByQuery(entry.name, exactNameQuery)) {
        return true;
    }

    const nameQuery = parseQuery(parseNameQuery(query), false);

    if (nameQuery !== undefined && isMatchByQuery(entry.name, nameQuery)) {
        return true;
    }

    if (entry.id === query) {
        return true;
    }

    const hhQuery = parseQuery(query, false);

    if (hhQuery !== undefined && isMatchByQuery(entry.name, hhQuery)) {
        return true;
    }

    // if (isParentEntry(entry)) {
    //     return entry.items.some(item => isEntryMatchBySearchQuery(item, query));
    // }

    return false;
};

const preFilterEntriesBySearchQuery = <E extends Entry>(
    entries: E[],
    query: string,
    isSearch1Level: boolean
): Array<E | undefined> => {
    return entries.map((entry) => {
        const isMatchItself = isEntryMatchBySearchQuery(entry, query);
        if (isMatchItself) {
            return {
                ...entry,
                matchingQuery: query || undefined
            };
        }

        if (!isSearch1Level && isParentEntry(entry)) {
            const preFilteredItems = filterEntriesBySearchQuery(entry.items, query, isSearch1Level);
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

const filterEntriesBySearchQuery = <E extends Entry>(
    entries: E[],
    query: string,
    isSearch1Level: boolean
): Array<E | undefined> => {
    return preFilterEntriesBySearchQuery(entries, query, isSearch1Level).filter(Boolean) as E[];
};

const parseIdQuery = (query: string): string | undefined => {
    return /^[#№](.*)$/.exec(query)?.[1];
};

const parseNameQuery = (query: string): string | undefined => {
    return /^@(.*)$/.exec(query)?.[1];
};

const parseExactNameQuery = (query: string): string | undefined => {
    return /^=(.*)$/.exec(query)?.[1];
};

const parseRegexQuery = (query: string): RegExp | undefined => {
    const match = /^\/(.+)\/([a-z]*)$/.exec(query);
    if (!match) {
        return undefined;
    }

    return new RegExp(match[1], match[2]);
};

interface HHQuery {
    isExact?: boolean;
    query: RegExp | string;
}

const parseQuery = (query: string | undefined, isExact: boolean, isNoRegex?: boolean): HHQuery | undefined => {
    const hhQuery = (query && !isNoRegex && parseRegexQuery(query)) || query;

    if (hhQuery === undefined) {
        return undefined;
    }

    return {
        isExact: Boolean(isExact),
        query: hhQuery
    };
};

const isMatchByQuery = (value: string, hhQuery: HHQuery): boolean => {
    const { query, isExact } = hhQuery;

    if (!query) {
        return true;
    }

    if (isString(query)) {
        const normalizedQuery = query.trim().toLowerCase();
        return isExact ? value.toLowerCase() === normalizedQuery : value.toLowerCase().includes(normalizedQuery);
    }

    return query.test(value);
};

const getDisplayedDictionaryData = (
    dictionaryData: HHDictionaryData | undefined,
    viewMode: DictionaryViewMode,
    searchQuery: string,
    isSearch1Level: boolean
): HHDictionaryData | undefined => {
    if (!dictionaryData) {
        return dictionaryData;
    }

    return {
        ...dictionaryData,
        views: {
            ...dictionaryData.views,
            [viewMode]: filterEntriesBySearchQuery(dictionaryData.views[viewMode], searchQuery, isSearch1Level)
        }
    };
};

const HhDictionariesPage: FunctionComponent = () => {
    const [dictionary, setDictionary] = useWriteableLocalstorageState<HHDictionary>(
        getLocalStorageKey('headhunter-dictionaries', 'dictionary'),
        HHDictionary.PROFESSIONAL_ROLES
    );

    const [searchQuery, , setSearchQueryByEvent] = useInputState<string>('');
    const [isSearch1Level, setIsSearch1Level] = useState<boolean>(false);
    const handleIsSearch1LevelChecked = useChangeAnyStateHandler(setIsSearch1Level, 'checked');
    const [isSearchError, setIsSearchError] = useState<boolean>(false);

    const [viewMode, setViewMode] = useState<DictionaryViewMode>(DictionaryViewMode.TREE);

    const dictionaryOptions = dictionariesOptions[dictionary];

    const [dictionariesData, setDictionariesData] = useState<Partial<Record<HHDictionary, HHDictionaryData>>>({});
    const [dictionaryData, setDictionaryData] = useState<HHDictionaryData>();
    const [displayedDictionaryData, setDisplayedDictionaryData] = useState<HHDictionaryData>();

    // const displayedDictionaryData = useDebouncedMemo(
    //     () => {
    //         if (!dictionaryData) {
    //             return dictionaryData;
    //         }
    //
    //         return {
    //             ...dictionaryData,
    //             views: {
    //                 ...dictionaryData.views,
    //                 [viewMode]: filterEntriesBySearchQuery(
    //                     dictionaryData.views[viewMode],
    //                     searchQuery.trim().toLowerCase()
    //                 )
    //             }
    //         };
    //     },
    //     [dictionaryData, viewMode, searchQuery],
    //     100
    // );

    const updateDisplayedDictionaryData = useCallback(
        (
            dictionaryData: HHDictionaryData | undefined,
            viewMode: DictionaryViewMode,
            searchQuery: string,
            isSearch1Level: boolean
        ) => {
            try {
                setDisplayedDictionaryData(
                    getDisplayedDictionaryData(dictionaryData, viewMode, searchQuery, isSearch1Level)
                );

                setIsSearchError(false);
            } catch (error) {
                setIsSearchError(true);
            }
        },
        []
    );

    const handleDictionaryChange = useCallback(
        (newDictionary: HHDictionary) => {
            const newDictionaryOptions = dictionariesOptions[newDictionary];

            if (!isViewModeSupported(newDictionaryOptions, viewMode)) {
                const newViewMode = getViewModes(newDictionaryOptions)[0];
                if (newViewMode) {
                    setViewMode(newViewMode);
                }
            }

            setDictionary(newDictionary);
        },
        [viewMode, dictionary]
    );

    const updateDisplayedDictionaryDataDebounced = useDebounce(updateDisplayedDictionaryData, 100);

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

    const previousSearchQueryRef = useRef<string>(searchQuery);

    useLayoutEffect(() => {
        const previousSearchQuery = previousSearchQueryRef.current;
        previousSearchQueryRef.current = searchQuery;

        if (previousSearchQuery === searchQuery) {
            updateDisplayedDictionaryData(dictionaryData, viewMode, searchQuery, isSearch1Level);
        } else {
            updateDisplayedDictionaryDataDebounced(dictionaryData, viewMode, searchQuery, isSearch1Level);
        }
    }, [
        dictionaryData,
        viewMode,
        searchQuery,
        isSearch1Level,
        updateDisplayedDictionaryData,
        updateDisplayedDictionaryDataDebounced
    ]);

    return (
        <PageContainer title="HeadHunter Dictionaries" className={styles.page}>
            <Flex col gap={8}>
                <Flex row gap={12} align="center">
                    <label className="d-flex align-items-center gap-2">
                        Dictionary
                        <Select
                            className={styles.dictionarySelect}
                            value={dictionary}
                            onSelect={handleDictionaryChange}
                        >
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

                <Flex col gap={8}>
                    <Flex row gap={12} align="center">
                        <Search
                            value={searchQuery}
                            onChange={setSearchQueryByEvent}
                            placeholder="Search items by id or name"
                            className={styles.search}
                            allowClear
                            status={isSearchError ? 'error' : undefined}
                        />
                        <Popover
                            placement="bottom"
                            content={
                                <div className={styles.searchTipContainer}>
                                    <Text>
                                        Use <Text code>#</Text> or <Text code>№</Text> to search only by ID
                                    </Text>
                                    <br />
                                    <Text>
                                        Use <Text code>@</Text> to search only by name
                                    </Text>
                                    <br />
                                    <Text>
                                        Use <Text code>=</Text> to search by exact name
                                    </Text>
                                    <br />
                                    <Text className="d-block mb-1">
                                        Regexes are supported as well
                                        <br />
                                        <Text code>[spec_char]/&lt;pattern&gt;/[flags]</Text>
                                    </Text>
                                    <Text type="secondary">Combining the special characters is not allowed!</Text>
                                    <Text className="d-block mt-1 mb-1">Examples: </Text>
                                    <Text code className="d-block">
                                        розни
                                    </Text>
                                    <Text code className="d-block">
                                        @розничн
                                    </Text>
                                    <Text code className="d-block">
                                        =розничная торговля
                                    </Text>
                                    <Text code className="d-block">
                                        #2
                                    </Text>
                                    <Text code className="d-block">
                                        №2
                                    </Text>
                                    <Text code className="d-block">
                                        #/^.+\.203$/
                                    </Text>
                                    <Text code className="d-block">
                                        @/^рознич/i
                                    </Text>
                                    <Text code className="d-block">
                                        /ная торговля$/
                                    </Text>
                                </div>
                            }
                        >
                            <a className={styles.searchInfoIconLink}>
                                <Info className={styles.searchInfoIcon} />
                            </a>
                        </Popover>
                    </Flex>
                    <Checkbox
                        checked={isSearch1Level}
                        onChange={handleIsSearch1LevelChecked}
                        className="align-self-start"
                    >
                        Search only first level
                    </Checkbox>
                </Flex>

                {displayedDictionaryData ? (
                    <Flex col gap={8} className={styles.dataContainer}>
                        <Tabs activeKey={viewMode} onChange={setViewMode as TabChangeHandler}>
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
