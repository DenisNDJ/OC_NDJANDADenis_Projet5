import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginRequest } from "../models/loginRequest.interface";
import { RegisterRequest } from "../models/registerRequest.interface";
import { SessionInformation } from "../models/sessionInformation.interface";
import { Article } from "../models/article.interface";
import { Theme } from "../models/theme.interface";
import { User } from "../models/user.interface";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private pathService = '/api/user';

  constructor(private httpClient: HttpClient) { }

  public getById(id: string): Observable<User> {
    return this.httpClient.get<User>(`${this.pathService}/${id}`);
  }

  public update(user: User, id: string): Observable<User> {
    return this.httpClient.put<User>(`${this.pathService}/${id}`, user);
  }
  
}