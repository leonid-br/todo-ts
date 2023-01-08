// import React, { useState } from 'react';

import s from './FilterTodo.module.css';

interface Props {
    filter: string;
    setFilter: (filter: string) => void;
    setComplitedTodos: (complited: boolean) => void;
    complited: boolean;
    countTodos: number;
    complitedTodos: number;
}

export const FilterTodo = ({
    filter,
    setFilter,
    setComplitedTodos,
    complited,
    countTodos,
    complitedTodos,
}: Props) => {
    return (
        <div className={s.filterContainer}>
            <div>
                <p>Todos Filter</p>
                <input
                    type="text"
                    className={s.filterInput}
                    onChange={e => setFilter(e.currentTarget.value)}
                    value={filter}
                />
            </div>
            <div className={s.settingsTodoView}>
                <div>
                    <p>All Todos</p>
                    <span>{countTodos}</span>
                </div>
                <div>
                    <p>Complited Todos</p>
                    <span>{complitedTodos}</span>
                </div>
                <div>
                    <p>Show complited todos</p>
                    <button
                        type="button"
                        onClick={() => setComplitedTodos(!complited)}
                    >
                        Show
                    </button>
                </div>
            </div>
        </div>
    );
};
