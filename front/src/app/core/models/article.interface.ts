import { Theme } from "./theme.interface";
import { User } from "./user.interface";

export interface Article {
    id: number;
    title: string;
    user: User;
    theme: Theme;
    date: Date;
    content: string;
}