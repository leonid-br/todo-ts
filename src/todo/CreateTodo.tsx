import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addTodo } from '../redux/slices/todoSlice';

import s from './CreateTodo.module.css';

export const CreateTodo = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();

    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value);
    };

    const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.currentTarget.value);
    };

    const handleBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
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

    return (
        <>
            <div className={s.form}>
                <label className={s.label}>
                    <span className={s.span}>Name</span>
                    <input type="text" onChange={handleName} value={name} />
                </label>
                <label className={s.label}>
                    <span className={s.span}>Description</span>
                    <input
                        className={s.inpDesc}
                        type="text"
                        onChange={handleDescription}
                        value={description}
                    />
                </label>

                <button className={s.btn} onClick={handleBtnClick}>
                    Add todo
                </button>
            </div>
        </>
    );
};
