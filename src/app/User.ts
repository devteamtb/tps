import { Role } from "./Role";

export class User {
    id: number;
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    role: Role;
    token?: string;
}