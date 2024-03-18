import { Component, OnInit, inject } from '@angular/core';
import { BackendService } from '../shared/backend.service';
import { Event } from '../shared/event';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-eventlist',
    standalone: true,
    templateUrl: './eventlist.component.html',
    styleUrl: './eventlist.component.css',
    imports: [CommonModule]
})
export class EventlistComponent implements OnInit{
 // Oninit -> Lifecycle-Hook, der beim Initialisieren der Komponente aufgerufen wird

  bs = inject (BackendService); // BackendService per Dependency Injection einbinden | andere Möglichkeit: constructor(private bs : BackendService) { }
  private modalService = inject(NgbModal); 
  private route = inject(ActivatedRoute) 
  private router = inject(Router); 
 
  events: Event[] = []; // Array für die Events
  pages: number[] = []; // Array für die Seitenzahlen
  totalPages: number = 0;; // Gesamtanzahl der Seiten
  pagedEvents: Event[] = []; // Array für die Events auf der aktuellen Seite
  currentPage = 1; // Aktuelle Seite
  pageSize = 9; // Anzahl der Events pro Seite
  selectedEvent?: Event; 
 
  ngOnInit(): void {
    this.readAllEvents(); // beim Initialisieren der Komponente alle Events auslesen
  }

  readAllEvents(): void {
    this.bs.getAllEvents().subscribe({
      next: (response) => {
        this.events = response.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        this.totalPages = Math.ceil(this.events.length / this.pageSize);
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        this.updatePage();
      },
      error: (error) => console.error(error),
      complete: () => console.log('readAllEvents() completed')
    });
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


  // Methode zum Öffnen der Update-Event-Komponente
  openUpdateEvent(event: Event): void {
    this.router.navigate(['/update', event.id]); // Navigieren zur Update-Event-Komponente
  }


  // Methode zum Löschen eines Events
  deleteEvent(id: number): void {
    console.log('id', id);
    this.bs.deleteEvent(id).subscribe({
      next: (response) => {
        console.log('Event erfolgreich gelöscht: ', response);
        this.readAllEvents(); // Liste der Events aktualisieren
      },
      error: (err) => console.log('Fehler beim Löschen des Events: ', err),
      complete: () => console.log('deleteEvent() completed')
    });
  }


  // Methode zum Öffnen des Bestätigungs-Dialogs (Modal)
  openConfirmDeleteModal(content: any, event: Event): void {
    this.selectedEvent = event;
    this.modalService.open(content, { centered: true });
  }


  confirmDelete(): void {
    if (this.selectedEvent?.id) {
      this.deleteEvent(this.selectedEvent.id);
    }
  }
}

        
          