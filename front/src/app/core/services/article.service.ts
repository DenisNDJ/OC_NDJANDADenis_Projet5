import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Article } from "../models/article.interface";
import { ArticlePayload } from "../models/articlePayload.interface";
import { Commentaire } from "../models/commentaire.interface";
import { CommentairePayload } from "../models/commentPayload.interface";

@Injectable({
  providedIn: 'root'
})

export class ArticleService {

  private pathService = '/api/article';

  constructor(private httpClient: HttpClient) { }

  public all(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(this.pathService);
  }

  public allComment(id: string): Observable<Commentaire[]> {
    return this.httpClient.get<Commentaire[]>(`${this.pathService}/${id}/comment`);
  }

  public getSubscribed(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${this.pathService}/subscribed`);
  }

  public getById(id: string): Observable<Article> {
    return this.httpClient.get<Article>(`${this.pathService}/${id}`);
  }
  
  public create(articlePayload: ArticlePayload): Observable<void>{
    return this.httpClient.post<void>(this.pathService,articlePayload);
  }

  public comment(commentairePayload: CommentairePayload): Observable<void>{
    return this.httpClient.post<void>(`${this.pathService}/comment`,commentairePayload);
  }
}