import { Article } from "./article.interface";
import { User } from "./user.interface";

export interface CommentairePayload {
    user?: number;
    article?: Article;
    content: string;
}