export interface Discipline {
    id: number;
    name: string;
    professorId?: string;
}

export interface DisciplineState {
    discipline: Discipline[] | [];
    selectedDiscipline: number | null;
}
