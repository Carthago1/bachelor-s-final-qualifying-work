export interface User {
    id: number;
    name: string;
    surname: string;
    patronymic: string;
    email: string;
    isStudent?: boolean;
    groupID?: number;
    isProfessor?: boolean;
    isAdmin?: boolean;
}

export interface UserState {
    user: User | null;
    authorized: boolean;
}
