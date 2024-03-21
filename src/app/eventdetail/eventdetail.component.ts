import { Component, OnInit, inject } from '@angular/core';
import { BackendService } from '../shared/backend.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Event } from '../shared/event';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-eventdetail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './eventdetail.component.html',
  styleUrl: './eventdetail.component.css'
})

export class EventdetailComponent implements OnInit{

  event!: Event;

  private bs = inject(BackendService) 
  private route = inject(ActivatedRoute) 
  private modalService = inject(NgbModal); 
  private router = inject(Router);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.getEvent(Number(id));
  }
  }

   getEvent(id: number) {
    this.bs.getEventById(id).subscribe(
      {
        next: (response: Event) => {
          this.event = response;
        },
        error: (err) => console.log(err),
        complete: () => console.log('readOne() completed')
      });
  }

  // Methode zum Löschen eines Events
  deleteEvent(id: number): void {
    console.log('id', id);
    this.bs.deleteEvent(id).subscribe({
      next: (response) => {
        console.log('Event erfolgreich gelöscht: ', response);
        // TODO: Event-Liste aktualsieren !!
        // TODO: Event-Liste aktualsieren !!
        // TODO: Event-Liste aktualsieren !!
      },
      error: (err) => console.log('Fehler beim Löschen des Events: ', err),
      complete: () => console.log('deleteEvent() completed')
    });
  }


  // Methode zum Öffnen des Bestätigungs-Dialogs (Modal)
  openConfirmDeleteModal(content: any, event: Event): void {
    this.event = event;
    this.modalService.open(content, { centered: true });
  }


  confirmDelete(): void {
    if (this.event.id) {
      this.deleteEvent(this.event.id);
    }
  }


  // Methode zum Öffnen der Update-Event-Komponente
  openUpdateEvent(event: Event): void {
    this.router.navigate(['/update', event.id]); // Navigieren zur Update-Event-Komponente
  }


  navigateToOverview(): void {
    this.router.navigate(['/event']);
  }


}

