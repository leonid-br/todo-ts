import { useState } from 'react';
import { useSelector } from 'react-redux';

import { Header } from './Header';
import { CreateTodo } from './CreateTodo';
import { TodoList } from './TodoList';
import { FilterTodo } from './FilterTodo';

import { todos as todos_state } from '../redux/slices/todoSlice';

import s from './TodoView.module.css';

interface ITodo {
    id: number;
    name: string;
    description: string;
    completed: boolean;
    edit: boolean;
}

export const TodoView = () => {
    const [filter, setFilter] = useState('');
    const [complited, setComplited] = useState(false);

    const { todos } = useSelector(todos_state);

    const complitedTodos: number = (todos as ITodo[]).reduce(
        (acc: number, cur: ITodo) => {
            return cur.completed ? acc + 1 : acc;
        },
        0
    );

    return (
        <div className={s.back}>
            <Header title="My ToDo" />
            <CreateTodo />
            {todos.length > 2 && (
                <FilterTodo
                    filter={filter}
                    setFilter={setFilter}
                    setComplitedTodos={setComplited}
                    complited={complited}
                    countTodos={todos.length}
                    complitedTodos={complitedTodos}
                />
            )}
            <TodoList filter={filter} complited={complited} />
        </div>
    );
};
