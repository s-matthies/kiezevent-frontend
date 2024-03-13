import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from './event';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  baseUrl = "http://localhost:4000/events"; // Basis-URL für die REST-Schnittstelle

  constructor(private http: HttpClient) { } // einbinden HttpClient per Dependency Injection

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.baseUrl); // GET-Request an die REST-Schnittstelle senden 
  }
}
