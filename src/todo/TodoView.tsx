import React from 'react';

import { Header } from './Header';
import { CreateTodo } from './CreateTodo';
import { TodoList } from './TodoList';
import s from './TodoView.module.css';

export const TodoView = () => {
    return (
        <div className={s.back}>
            <Header title="My ToDo" />
            <CreateTodo />
            <TodoList />
        </div>
    );
};
