import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    user: {
        id: number;
        name: string;
        companyId: number;
    } | null;
}

const initialState: AuthState = {
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ id: number; name: string; companyId: number }>) => {
            state.user = {
                id: action.payload.id,
                name: action.payload.name,
                companyId: action.payload.companyId,
            };
        },
        logout: (state) => {
            state.user = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;