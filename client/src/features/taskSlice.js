import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios'

const BASE_URL = 'https://mern-todo-list.onrender.com'

const initialState = {
    tasks: [],
    taskName: '',
    isOpen: false,
    taskModal: {}
}

export const getAllTasks = createAsyncThunk(
    'task/getAllTasks',
    async () => {
        const res = await axios.get(`${BASE_URL}/api/v1/tasks`);
        return res.data.tasks;
    }
);

export const addTask = createAsyncThunk(
    'task/addTask',
    async (a, ThunkAPI) => {
        const taskName = ThunkAPI.getState().task.taskName;
        if (taskName === '') {
            return taskName
        } else {
            const res = await axios.post(`${BASE_URL}/api/v1/tasks`, {
                task: taskName
            });
            return res.data.task;
        }
        
    }
);

export const getTask = createAsyncThunk(
    'task/getTask',
    async (payload) => {
        const { id } = payload;
        const res = await axios.get(`${BASE_URL}/api/v1/tasks/${id}`);
        return res.data.task;
    }
);

export const editTask = createAsyncThunk(
    'task/editTask',
    async (payload) => {
        const { id, task, completed} = payload;
        if (task === '') {
            return ''
        }
        const res = await axios.patch(`${BASE_URL}/api/v1/tasks/${id}`, {
            task,
            completed
        });
        return res.data.task;
    }
);

export const deleteTask = createAsyncThunk(
    'task/deleteTask',
    async (payload) => {
        const { id } = payload;
        const res = await axios.delete(`${BASE_URL}/api/v1/tasks/${id}`);
        return res.data.task;
    }
)

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        handleChangeTaskName: (state, action) => {
            state.taskName = action.payload;
        },
        toggle: (state, action) => {
            state.isOpen = !state.isOpen
        },
        handleChangeTaskModal: (state, action) => {
            state.taskModal.task = action.payload;
        },
        toggleCompleted: (state, action) => {
            state.taskModal.completed = !state.taskModal.completed;
        }
    },
    extraReducers: {
        [getAllTasks.fulfilled]: (state, action) => {
            state.tasks = [...action.payload];
        },
        [addTask.fulfilled]: (state, action) => {
            if (action.payload === '') {
                console.log('Task name cannot not be empty');
            } else {
                const prevTasks = state.tasks;
                state.tasks = [...prevTasks, action.payload];
                state.taskName = '';
            }
        },
        [getTask.fulfilled]: (state, action) => {
            state.taskModal = action.payload;
            state.isOpen = !state.isOpen;
        },
        [editTask.fulfilled]: (state, action) => {
            if (action.payload !== ''){
                state.tasks = current(state.tasks).map(task => (task._id === action.payload._id && action.payload) || task);
                state.isOpen = false;
            }
        },
        [deleteTask.fulfilled]: (state, action) => {
            state.tasks = current(state.tasks).filter(task => task._id !== action.payload._id);
        }
    }
});

export const { handleChangeTaskName, toggle, handleChangeTaskModal, toggleCompleted } = taskSlice.actions;

export default taskSlice.reducer;