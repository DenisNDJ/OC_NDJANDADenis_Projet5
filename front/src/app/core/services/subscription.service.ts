import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginRequest } from "../models/loginRequest.interface";
import { RegisterRequest } from "../models/registerRequest.interface";
import { SessionInformation } from "../models/sessionInformation.interface";
import { Article } from "../models/article.interface";
import { Theme } from "../models/theme.interface";
import { ApiResponse } from "../models/apiResponse.interface";

@Injectable({
  providedIn: 'root'
})

export class SubscriptionService {

  private pathService = '/api/sub';

  constructor(private httpClient: HttpClient) { }

  public subscribe(id: string): Observable<void> {
    return this.httpClient.post<void>(`${this.pathService}/${id}`, null);
  }

  public unsubscribe(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.pathService}/${id}`);
  }

  public getByUser(): Observable<Theme[]> {
    return this.httpClient.get<Theme[]>(`${this.pathService}/user`);
  }
  
}