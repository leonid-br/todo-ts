import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface ITodo {
    id: number;
    name: string;
    description: string;
    completed: boolean;
    edit: boolean;
}

interface ITodoId {
    id: number;
}

interface ITodoEdition {
    id: number;
    name: string;
    description: string;
}

interface ITodoState {
    todos: ITodo[] | [];
}

const todosLS: ITodo[] =
    localStorage.getItem('todos') !== null
        ? JSON.parse(localStorage.getItem('todos') || '{}')
        : [];

export const todoSlice = createSlice({
    name: 'todoSlice',

    initialState: (): ITodoState => ({
        todos: todosLS,
    }),

    reducers: {
        addTodo: (state, action: PayloadAction<ITodo>) => {
            // state.todos.push(action.payload)
            state.todos = [...state.todos, action.payload];
            localStorage.setItem('todos', JSON.stringify(state.todos));
        },
        complitedTodo: (state, action: PayloadAction<ITodoId>) => {
            state.todos = state.todos.map(todo =>
                todo.id === action.payload.id
                    ? { ...todo, completed: true }
                    : todo
            );
            localStorage.setItem('todos', JSON.stringify(state.todos));
        },
        deleteTodo: (state, action: PayloadAction<ITodoId>) => {
            state.todos = state.todos.filter(
                todo => todo.id !== action.payload.id
            );
            localStorage.setItem('todos', JSON.stringify(state.todos));
        },
        editTodo: (state, action: PayloadAction<ITodoId>) => {
            state.todos = state.todos.map(todo =>
                todo.id === action.payload.id ? { ...todo, edit: true } : todo
            );
            localStorage.setItem('todos', JSON.stringify(state.todos));
        },
        saveEditionTodo: (state, action: PayloadAction<ITodoEdition>) => {
            state.todos = state.todos.map(todo =>
                todo.id === action.payload.id
                    ? {
                          ...todo,
                          name: action.payload.name,
                          description: action.payload.description,
                          edit: false,
                      }
                    : todo
            );
            localStorage.setItem('todos', JSON.stringify(state.todos));
        },
    },
});

export const { addTodo, complitedTodo, deleteTodo, editTodo, saveEditionTodo } =
    todoSlice.actions;

export const todos = (state: RootState) => state.todo;

export default todoSlice.reducer;
