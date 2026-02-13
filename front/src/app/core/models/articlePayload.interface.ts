import { Theme } from "./theme.interface";

export interface ArticlePayload {
    titre: string;
    theme: Theme;
    content: string;
}