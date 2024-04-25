export interface User {
    id: number;
    name: string;
    surname: string;
    patronymic: string;
    email: string;
    isStudent?: boolean;
    isProfessor?: boolean;
    isAdmin?: boolean;
    groupID?: number;
}

export interface UserState {
    user: User | null;
}
