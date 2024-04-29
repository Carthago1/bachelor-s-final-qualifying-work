import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserState } from './userTypes';

const initialState: UserState = {
    user: null,
    authorized: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
            state.authorized = true;
        },
        clearUser(state) {
            state.user = null;
            state.authorized = false;
        }
    }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
