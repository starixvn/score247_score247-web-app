import React from "react";
import Select, { ValueType } from "react-select";
import { filter } from "lodash";
import "./style.scss";

interface SortOption {
    value: number,
    label: string
}

type Props = {
    sortByValue: number;
    onSortChange: (sortValue: number) => void;
};

const sortOptions = [
    {
        value: 1,
        label: "KO time"
    },
    {
        value: 2,
        label: "League"
    }
];

const prefix = () => ({
    alignItems: 'center',
    display: 'flex',

    ':before': {
        content: '"Sort by:"'
    },
});

const SoccerSortOption: React.FC<Props> = props => {
    const colourStyles = {
        singleValue: (styles: any) => ({ ...styles, ...prefix() }),//NOSONAR
    };

    const handleSortChange = (selectedOption: ValueType<SortOption>) => {
        const option = selectedOption as SortOption;
        props.onSortChange(option.value);
    };

    return (<Select
        instanceId={props.sortByValue}
        className="sort-dropdown"
        classNamePrefix="select"
        options={sortOptions}
        isSearchable={false}
        value={filter(sortOptions, { value: props.sortByValue })}
        onChange={handleSortChange}
        placeholder="Sort by"
        styles={colourStyles}
    />);
};

export default SoccerSortOption;