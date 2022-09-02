import React, { FunctionComponent, useCallback, useMemo, useRef, useState } from 'react';
import Search from 'antd/lib/input/Search';
import styles from './AppHeaderSearch.module.scss';
import { AutoComplete, InputRef } from 'antd';
import Text from 'antd/lib/typography/Text';
import { DefaultOptionType, FilterFunc, SelectHandler } from 'rc-select/lib/Select';
import { BaseSelectRef } from 'rc-select/lib/BaseSelect';
import { menuRouteItems } from '../../../../../../constants/router/menuItems';
import { getMenuItemRouterLink, getMenuItemTitle, SingleMenuItem } from '../../../../utils/routeMenuItems';
import { AutoCompleteProps } from 'antd/lib/auto-complete';
import classNames from 'classnames';
import { useKey } from 'rooks';
import { isEmpty } from 'lodash';
import useAppSettings from '../../../../../../hooks/useAppSettings';
import useRouterNavigate from '../../../../../../hooks/useRouterNavigate';

interface OptionType extends DefaultOptionType {
    data: SingleMenuItem;
}

const filterOption: FilterFunc<OptionType> = (inputValue, option) => {
    const query = inputValue.trim().toLocaleLowerCase();

    const isEmptyQuery = isEmpty(query);

    if (option === undefined) {
        return isEmptyQuery;
    }

    if (isEmptyQuery) {
        return true;
    }

    const isMatchByLabel = () => String(option.label).toLocaleLowerCase().includes(query);
    const isMatchBySearchText = () =>
        Boolean(option.data.searchText) && String(option.data.searchText).toLocaleLowerCase().includes(query);

    return isMatchByLabel() || isMatchBySearchText();
};

interface Props extends Omit<AutoCompleteProps, 'options' | 'filterOption' | 'onSelect' | 'children'> {
    inputClassName?: string;
}

const AppHeaderSearch: FunctionComponent<Props> = ({ className, inputClassName, ...props }) => {
    const navigate = useRouterNavigate();
    const { doShowHiddenMenuItems } = useAppSettings();

    const [query, setQuery] = useState<string>('');

    const allSearchOptions = useMemo<OptionType[]>(() => {
        return menuRouteItems
            .filter((item) => doShowHiddenMenuItems || !item.isHidden)
            .map((item) => {
                const title = getMenuItemTitle(item);

                return {
                    label: title,
                    value: title,
                    data: item
                };
            });
    }, [doShowHiddenMenuItems]);

    const searchInputRef = useRef<InputRef>(null);

    const autoCompleteRef = useRef<BaseSelectRef>(null);

    const selectOption = useCallback((option: SingleMenuItem) => {
        const routerLink = getMenuItemRouterLink(option);

        navigate(routerLink);

        setTimeout(() => {
            setQuery(' ');
        });
        setTimeout(() => {
            setQuery('');
        });
        autoCompleteRef.current?.blur();
    }, []);

    const handleSelect = useCallback<SelectHandler<string, OptionType>>(
        (label: string, { data }: OptionType) => {
            selectOption(data);
        },
        [navigate, selectOption]
    );

    const handleSearch = useCallback(
        (value: string) => {
            if (!query.trim().length) {
                return;
            }

            const matchingOptions = allSearchOptions.filter((option) => filterOption(value, option));
            if (!matchingOptions.length) {
                return;
            }

            const { data } = matchingOptions[0];
            selectOption(data);
        },
        [selectOption, query]
    );

    useKey(['Slash'], (event) => {
        const activeTag = document.activeElement?.tagName;
        if (activeTag && ['input', 'textarea'].includes(activeTag.toLowerCase())) {
            return;
        }

        if (event.altKey || event.ctrlKey || event.shiftKey || event.metaKey) {
            return;
        }

        searchInputRef.current?.focus();
        event.preventDefault();
    });

    return (
        <div className={styles.container}>
            <AutoComplete
                options={allSearchOptions}
                className={classNames(styles.autoComplete, className)}
                filterOption={filterOption}
                onSelect={handleSelect}
                notFoundContent={<Text type="secondary">No results</Text>}
                value={query}
                onChange={setQuery}
                ref={autoCompleteRef}
                {...props}
            >
                <Search ref={searchInputRef} onSearch={handleSearch} placeholder="Search" className={inputClassName} />
            </AutoComplete>
            {!query.length && (
                <Text keyboard className={styles.keyHint} type="secondary">
                    /
                </Text>
            )}
        </div>
    );
};

export default AppHeaderSearch;
