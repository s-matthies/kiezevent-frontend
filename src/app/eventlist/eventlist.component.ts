import { Component, OnInit, inject } from '@angular/core';
import { BackendService } from '../shared/backend.service';
import { Event } from '../shared/event';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-eventlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eventlist.component.html',
  styleUrl: './eventlist.component.css'
})
export class EventlistComponent implements OnInit{

 // Oninit -> Lifecycle-Hook, der beim Initialisieren der Komponente aufgerufen wird

  events: Event[] = []; // Array für die Events
  bs = inject (BackendService); // BackendService per Dependency Injection einbinden
  // andere Möglichkeit: constructor(private bs : BackendService) { }
  
  constructor(private router: Router) { }

  pages: number[] = []; // Array für die Seitenzahlen
  totalPages: number = 0;; // Gesamtanzahl der Seiten

  pagedEvents: Event[] = []; // Array für die Events auf der aktuellen Seite
  currentPage = 1; // Aktuelle Seite
  pageSize = 9; // Anzahl der Events pro Seite
 
  ngOnInit(): void {
    this.readAllEvents(); // beim Initialisieren der Komponente alle Events auslesen
  }

  readAllEvents(): void {
    this.bs.getAllEvents().subscribe(
      (response) => {
        this.events = response;
        this.events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // Events nach Datum sortieren
        this.totalPages = Math.ceil(this.events.length / this.pageSize); // Berechnen Sie die Gesamtzahl der Seiten
        this.pages = Array.from({length: this.totalPages}, (_, i) => i + 1); // Erstellen Sie ein Array mit Seitennummern
        this.updatePage(); // Seite aktualisieren, um Events zu paginieren
      },
      (error) => console.log(error)
    );
  }

  // Pagination
  updatePage(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.pagedEvents = this.events.slice(startIndex, startIndex + this.pageSize);
  }

  setPage(page: number): void {
    this.currentPage = page;
    this.updatePage();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePage();
    }
  }

  nextPage(): void {
    const totalPages = Math.ceil(this.events.length / this.pageSize);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.updatePage();
    }
  }

  openUpdateEvent(event: Event): void {
    // Hier navigieren Sie zur Update-Event-Komponente und übergeben das Event-Objekt
    this.router.navigate(['/update', event.id]); // Annahme, dass Event eine Eigenschaft "id" hat
  }

  deleteEvent(_t5: Event) {
    throw new Error('Method not implemented.');
    }
}

        
          