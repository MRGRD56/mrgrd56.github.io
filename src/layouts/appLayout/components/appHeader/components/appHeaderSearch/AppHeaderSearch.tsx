import React, { FunctionComponent, useCallback, useRef, useState } from 'react';
import Search from 'antd/lib/input/Search';
import styles from './AppHeaderSearch.module.scss';
import { AutoComplete } from 'antd';
import Text from 'antd/lib/typography/Text';
import { DefaultOptionType, FilterFunc, SelectHandler } from 'rc-select/lib/Select';
import { BaseSelectRef } from 'rc-select/lib/BaseSelect';
import { menuRouteItems } from '../../../../../../constants/router/menuItems';
import { MenuRouteItem } from '../../../../utils/routeMenuItems';
import { useNavigate } from 'react-router-dom';
import { AutoCompleteProps } from 'antd/lib/auto-complete';
import classNames from 'classnames';

interface OptionType extends DefaultOptionType {
    data: MenuRouteItem;
}

const allSearchOptions: OptionType[] = menuRouteItems.map((item) => {
    const title = item.title ?? item.route.title;

    return {
        label: title,
        value: title,
        data: item
    };
});

console.log(menuRouteItems);

const filterOption: FilterFunc<OptionType> = (inputValue, option) => {
    const query = inputValue.trim().toLocaleLowerCase();

    if (option === undefined) {
        return !query;
    }

    if (!query) {
        return false;
    }

    return String(option.label).toLocaleLowerCase().includes(query);
};

interface Props extends Omit<AutoCompleteProps, 'options' | 'filterOption' | 'onSelect' | 'children'> {
    inputClassName?: string;
}

const AppHeaderSearch: FunctionComponent<Props> = ({ className, inputClassName, ...props }) => {
    const navigate = useNavigate();

    const [query, setQuery] = useState<string>('');

    const autoCompleteRef = useRef<BaseSelectRef>(null);

    const handleSelect = useCallback<SelectHandler<string, OptionType>>(
        (label: string, { data }: OptionType) => {
            const path = data.route.path;

            navigate(path);

            setQuery('');
            autoCompleteRef.current?.blur();
        },
        [navigate]
    );

    return (
        <AutoComplete
            options={allSearchOptions}
            className={classNames(styles.container, className)}
            filterOption={filterOption}
            onSelect={handleSelect}
            notFoundContent={<Text type="secondary">No results</Text>}
            value={query}
            onChange={setQuery}
            ref={autoCompleteRef}
            {...props}
        >
            <Search placeholder="Search" className={inputClassName} />
        </AutoComplete>
    );
};

export default AppHeaderSearch;
