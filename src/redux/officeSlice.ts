import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface OfficeState {
    id: number | null;
    name: string | null;
}
const initialState: OfficeState = {
    id: null,
    name: null,
};
const officeSlice = createSlice({
    name: 'office',
    initialState,
    reducers: {
        setSelectedOffice: (state, action: PayloadAction<OfficeState>) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
        },
        clearSelectedOffice: (state) => {
            state.id = null;
            state.name = null;
        },
    },
});
export const { setSelectedOffice, clearSelectedOffice } = officeSlice.actions;
export default officeSlice.reducer;