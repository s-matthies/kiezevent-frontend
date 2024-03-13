import { Component, OnInit } from '@angular/core';
import { BackendService } from '../shared/backend.service';
import { Event } from '../shared/event';

@Component({
  selector: 'app-eventlist',
  standalone: true,
  imports: [],
  templateUrl: './eventlist.component.html',
  styleUrl: './eventlist.component.css'
})
export class EventlistComponent implements OnInit{

  events!: Event[]; // ! bedeutet das, dass die Variable initialisiert wird, bevor sie benutzt wird

  constructor(private bs : BackendService) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  readAll(): void {
    this.bs.getAllEvents().subscribe( // BackendService aufrufen
          {
            next: (response) => {
                  this.events = response;
                  console.log(this.events);
                  return this.events;
                },
            error: (err) => console.log(err),
            complete: () => console.log('getAllEvents() completed')
          })
  }
}
