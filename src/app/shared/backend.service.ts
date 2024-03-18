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

  getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(this.backendUrl + "/events/" + id); // GET-Request an die REST-Schnittstelle senden
  }

  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.backendUrl + "/events", event); // POST-Request an die REST-Schnittstelle senden
  }
  

  updateOneMember(event: Event, id: number): Observable<Event> {
    return this.http.put<Event>(this.backendUrl + "/events/" + id, event);
  }

  deleteEvent(id: number): Observable<Event> {
    return this.http.delete<Event>(this.backendUrl + "/events/" + id); // DELETE-Request an die REST-Schnittstelle senden
  }

  // weitere Methoden für die REST-Schnittstelle
}
