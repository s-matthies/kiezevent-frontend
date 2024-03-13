import { Component, OnInit, inject } from '@angular/core';
import { BackendService } from '../shared/backend.service';
import { Event } from '../shared/event';

@Component({
  selector: 'app-eventlist',
  standalone: true,
  imports: [],
  templateUrl: './eventlist.component.html',
  styleUrl: './eventlist.component.css'
})
export class EventlistComponent implements OnInit{ // Oninit -> Lifecycle-Hook, der beim Initialisieren der Komponente aufgerufen wird

  events: Event[] = []; // Array für die Events

  bs = inject (BackendService); // BackendService per Dependency Injection einbinden
  // andere Möglichkeit: constructor(private bs : BackendService) { }

  ngOnInit(): void {
    this.readAllEvents(); // beim Initialisieren der Komponente alle Events auslesen
  }

  readAllEvents(): void {
    this.bs.getAllEvents().subscribe( // BackendService aufrufen // subscribe() -> wir melden uns an
          {
            next: (response) => { // next() -> gibt uns den eigentlichen Wert zurück; wir reagieren auf die Antwort
                  this.events = response;
                  console.log("events", this.events);
                  return this.events;
                },
            error: (err) => console.log(err),
            complete: () => console.log('getAllEvents() completed')
          })
  }
}
