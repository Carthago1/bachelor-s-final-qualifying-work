import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';

const rootReducer = combineReducers({
    user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
    reducer: rootReducer
});

export default store;
