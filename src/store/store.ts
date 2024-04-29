import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import disciplineReducer from './discipline/disciplineSlice';

const rootReducer = combineReducers({
    user: userReducer,
    discipline: disciplineReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
    reducer: rootReducer
});

export default store;
