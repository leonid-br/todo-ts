import React from 'react';

import s from './FilterTodo.module.css';

interface Props {
    filter: string;
    setFilter: (filter: string) => void;
}

export const FilterTodo = ({ filter, setFilter }: Props) => {
    return (
        <div className={s.filterContainer}>
            <p>Todos Filter</p>
            <input
                type="text"
                className={s.filterInput}
                onChange={e => setFilter(e.currentTarget.value)}
                value={filter}
            />
        </div>
    );
};
