import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from '../redux/features/employeeSlice';

const store = configureStore({
    reducer: {
        employees: employeeReducer
    }
});

export default store;
