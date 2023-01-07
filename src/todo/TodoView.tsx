import { useState } from 'react';
import { useSelector } from 'react-redux';

import { Header } from './Header';
import { CreateTodo } from './CreateTodo';
import { TodoList } from './TodoList';
import { FilterTodo } from './FilterTodo';

import { todos as todos_state } from '../redux/slices/todoSlice';

import s from './TodoView.module.css';

export const TodoView = () => {
    const [filter, setFilter] = useState('');

    const { todos } = useSelector(todos_state);

    return (
        <div className={s.back}>
            <Header title="My ToDo" />
            <CreateTodo />
            {todos.length > 2 && (
                <FilterTodo filter={filter} setFilter={setFilter} />
            )}
            <TodoList filter={filter} />
        </div>
    );
};
