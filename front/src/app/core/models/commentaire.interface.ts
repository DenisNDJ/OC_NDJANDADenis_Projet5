import { User } from "./user.interface";

export interface Commentaire {
    id: number;
    user: User;
    content: string;
    date: Date;
}