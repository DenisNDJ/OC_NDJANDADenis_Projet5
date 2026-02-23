import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
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