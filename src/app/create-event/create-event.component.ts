import { Component, OnInit, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { BackendService } from '../shared/backend.service';
import { CommonModule, Time } from '@angular/common';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgbDatepickerModule],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent implements OnInit{
  

  // FormControl-Objekte für die Eingabefelder des Formulars
  titleFC = new FormControl('', [Validators.required]);
  dateFC = new FormControl(new Date(), [Validators.required]);
  starttimeFC = new FormControl({ hours: 0, minutes: 0 } as Time, [Validators.required]); // Anfangswerte für starttime und endtime festlegen
  endtimeFC = new FormControl({ hours: 0, minutes: 0 } as Time, [Validators.required]);
  locationFC = new FormControl('', [Validators.required]);
  descriptionFC = new FormControl('', [Validators.required]);
  linkFC = new FormControl('',[Validators.pattern('^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,})([\/\w \.-]*)*\/?$')]);

  bs = inject (BackendService); // BackendService per Dependency Injection einbinden
  private router = inject(Router); //

  ngOnInit(): void {
    this.cancel(); // beim Initialisieren des Formulars alle Eingabefelder zurücksetzen
  }

  private formValid() {
    return this.titleFC.valid && this.descriptionFC.valid && this.dateFC.valid && this.starttimeFC.valid && this.endtimeFC.valid && this.locationFC.valid && this.linkFC.valid;
  }

 
  // Methode zum Erstellen eines Events
  create() { 
    console.log('create() wurde aufgerufen'); // debug
    if (this.formValid()) {
      let event = {
        title: this.titleFC.value!,
        date: this.dateFC.value!,
        starttime: this.starttimeFC.value!,
        endtime: this.endtimeFC.value!,
        location: this.locationFC.value!,
        description: this.descriptionFC.value!,
        link: this.linkFC.value
      };
      console.log('event wurde aufgerufen: ', event); // debug

      this.bs.createEvent(event).subscribe({
        next: (response) => {
          console.log('Event erfolgreich erstellt: ', response);
        },
        error: (err) => console.log('Fehler beim Erstellen des Events: ', err),
        complete: () => console.log('create() completed')
      });
      
    }
    }

    // Methode zum Abbrechen des Erstellens eines Events
    cancel() {
      this.titleFC.reset();
      this.descriptionFC.reset();
      this.dateFC.reset();
      this.starttimeFC.reset(); 
      this.endtimeFC.reset();
      this.locationFC.reset();
      this.linkFC.reset();
      }
  }

  

