import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from './event';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  backendUrl = "http://localhost:4000"; // Basis-URL für die REST-Schnittstelle

  constructor(private http: HttpClient) { } // einbinden HttpClient per Dependency Injection

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.backendUrl + "/events"); // GET-Request an die REST-Schnittstelle senden 
  }
}
