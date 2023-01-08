import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    todos as todos_state,
    complitedTodo,
    deleteTodo,
    editTodo,
    saveEditionTodo,
} from '../redux/slices/todoSlice';
import s from './TodoList.module.css';

interface Props {
    filter: string;
    complited: boolean;
}

export const TodoList = ({ filter, complited }: Props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const dispatch = useDispatch();
    const { todos } = useSelector(todos_state);

    const getDate = (id: number) => {
        const dateParse = new Date(id);

        const date = dateParse
            .toLocaleString('ru-RU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            })
            .split(' ');
        date.pop();
        return date.join(' ');
    };

    const handleComplited = (id: number) => {
        dispatch(complitedTodo({ id }));
    };

    const handleDeleted = (id: number) => {
        // eslint-disable-next-line no-restricted-globals
        const confirmDel = confirm('Удалить Todo?');
        if (confirmDel) {
            dispatch(deleteTodo({ id }));
            if (id === editingId) {
                setIsEditing(false);
            }
        }
    };

    const handleEdit = (id: number, name: string, description: string) => {
        dispatch(editTodo({ id }));
        setName(name);
        setDescription(description);
        setIsEditing(true);
        setEditingId(id);
    };

    const handleSave = (id: number) => {
        if (name === '' || description === '') {
            return alert('Filds Name and Description required');
        }

        dispatch(saveEditionTodo({ id, name, description }));
        setName('');
        setDescription('');
        setIsEditing(false);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value);
    };

    const handleDescrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.currentTarget.value);
    };

    const getVisibleTodos = () => {
        const normalizeFilter = filter.toLowerCase();
        let complitedTodos = todos;

        if (complited) {
            complitedTodos = todos.filter(todo => todo.completed === true);
        }

        return (
            todos &&
            complitedTodos.filter(
                todo =>
                    todo.name.toLocaleLowerCase().includes(normalizeFilter) ||
                    todo.description
                        .toLocaleLowerCase()
                        .includes(normalizeFilter)
            )
        );
    };
    const visibleTodos = getVisibleTodos();

    if (todos.length === 0) {
        return (
            <div className={s.todoList}>
                <div className={s.firstTodo}>Enter your first Todo</div>
            </div>
        );
    }

    if (visibleTodos.length === 0) {
        return (
            <div className={s.todoList}>
                <div className={s.firstTodo}>
                    {complited
                        ? 'No complited Todos'
                        : 'No todos found for your request'}
                </div>
            </div>
        );
    } else {
        return (
            <div className={s.todoList}>
                <ul>
                    {visibleTodos.map(todo => (
                        <li key={todo.id} className={s.todo}>
                            <div
                                className={
                                    todo.completed ? s.todoCompl : s.todoInfo
                                }
                            >
                                {!todo.edit ? (
                                    <>
                                        <p className={s.name}>{todo.name}</p>
                                        <p>{todo.description}</p>
                                        <p className={s.createdDate}>
                                            {getDate(todo.id)}
                                        </p>
                                    </>
                                ) : (
                                    <div className={s.editInputBox}>
                                        <input
                                            type="text"
                                            defaultValue={name}
                                            onChange={handleNameChange}
                                            className={s.editInput}
                                        />
                                        <input
                                            type="text"
                                            defaultValue={description}
                                            onChange={handleDescrChange}
                                            className={s.editInput}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className={s.btnBox}>
                                <button
                                    className={s.btnCompl}
                                    type="button"
                                    onClick={() => handleComplited(todo.id)}
                                    disabled={isEditing}
                                >
                                    {todo.completed
                                        ? 'Cancel completion'
                                        : 'Complete'}
                                </button>

                                {!todo.edit ? (
                                    <button
                                        type="button"
                                        className={s.btnEdit}
                                        onClick={() => {
                                            handleEdit(
                                                todo.id,
                                                todo.name,
                                                todo.description
                                            );
                                        }}
                                        disabled={isEditing}
                                    >
                                        Edit
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className={s.btnEdit}
                                        onClick={() => {
                                            handleSave(todo.id);
                                        }}
                                    >
                                        Ok
                                    </button>
                                )}
                                <button
                                    className={s.btnDel}
                                    type="button"
                                    onClick={() => {
                                        handleDeleted(todo.id);
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
};
