import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { addTodo } from '../redux/slices/todoSlice';
import { useAutosizeTextArea } from '../hooks/useAutosizeTextArea';

import s from './CreateTodo.module.css';

export const CreateTodo = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const textAreaRef = useRef(
        null
    ) as React.RefObject<HTMLTextAreaElement> | null;

    const dispatch = useDispatch();

    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value);
    };

    const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.currentTarget.value);
    };

    const handleBtnClick = () => {
        if (name === '' || description === '') {
            return alert('Filds Name and Description required');
        }

        dispatch(
            addTodo({
                id: Date.now(),
                name,
                description,
                completed: false,
                edit: false,
            })
        );
        setDescription('');
        setName('');
    };

    useAutosizeTextArea({ textAreaRef, description });
    return (
        <>
            <div className={s.form}>
                <form>
                    <div className={s.formBox}>
                        <label className={s.label}>
                            <span className={s.span}>Name</span>
                            <input
                                type="text"
                                onChange={handleName}
                                value={name}
                            />
                        </label>
                        <label className={`${s.label} ${s.description}`}>
                            <span className={s.span}>Description</span>
                            <textarea
                                onChange={handleDescription}
                                value={description}
                                ref={textAreaRef}
                            />
                        </label>
                    </div>
                    <button
                        type="button"
                        className={s.btn}
                        onClick={handleBtnClick}
                    >
                        Create
                    </button>
                </form>
            </div>
        </>
    );
};
