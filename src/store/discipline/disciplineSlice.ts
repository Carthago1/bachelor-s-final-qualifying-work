import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Discipline, DisciplineState } from './disciplineTypes';

const initialState: DisciplineState = {
    discipline: [],
    selectedDiscipline: null
}

const disciplineSlice = createSlice({
    name: 'discipline',
    initialState,
    reducers: {
        setDiscipline(state, action: PayloadAction<Discipline[]>) {
            state.discipline = action.payload;
        },
        setSelectedDiscipline(state, action: PayloadAction<number | null>) {
            state.selectedDiscipline = action.payload;
        },
        resetDiscipline(state) {
            state.discipline = [];
            state.selectedDiscipline = null;
        }
    }
});

export const { setDiscipline, setSelectedDiscipline, resetDiscipline } = disciplineSlice.actions;
export default disciplineSlice.reducer;
