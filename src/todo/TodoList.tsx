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

export const TodoList = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const dispatch = useDispatch();
    const { todos } = useSelector(todos_state);

    const handleComplited = (id: number) => {
        dispatch(complitedTodo({ id }));
    };

    const handleDeleted = (id: number) => {
        dispatch(deleteTodo({ id }));
        if (id === editingId) {
            setIsEditing(false);
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

    return (
        <div className={s.todoList}>
            {todos.length === 0 ? (
                <div className={s.firstTodo}>Enter your first Todo</div>
            ) : (
                <ul>
                    {todos.map(todo => (
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
                                {!todo.completed && (
                                    <button
                                        className={s.btnCompl}
                                        type="button"
                                        onClick={() => handleComplited(todo.id)}
                                        disabled={isEditing}
                                    >
                                        Completed
                                    </button>
                                )}
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
            )}
        </div>
    );
};
