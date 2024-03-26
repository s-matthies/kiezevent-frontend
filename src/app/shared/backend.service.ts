import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from './event';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  baseUrl = environment.apiUrl;

  // backendUrl = "https://kiezevent-backend.onrender.com"; // Basis-URL für die REST-Schnittstelle

  constructor(private http: HttpClient) { } // einbinden HttpClient per Dependency Injection

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.baseUrl + "/events"); // GET-Request an die REST-Schnittstelle senden 
  }

  getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(this.baseUrl + "/events/" + id); // GET-Request an die REST-Schnittstelle senden
  }

  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.baseUrl + "/events", event); // POST-Request an die REST-Schnittstelle senden
  }
  

  updateOneMember(event: Event, id: number): Observable<Event> {
    return this.http.put<Event>(this.baseUrl + "/events/" + id, event);
  }

  deleteEvent(id: number): Observable<Event> {
    return this.http.delete<Event>(this.baseUrl + "/events/" + id); 
  }
}
