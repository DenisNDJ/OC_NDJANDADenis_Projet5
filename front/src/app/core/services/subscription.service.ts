import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Theme } from "../models/theme.interface";

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