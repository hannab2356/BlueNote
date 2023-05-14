export interface User {
    id: number;
    username: string;
    birthDate: Date;
    roles?: string[];
    token: string;
    description: string;
}
