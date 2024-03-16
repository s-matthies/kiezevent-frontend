import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BackendService } from '../shared/backend.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent implements OnInit {


  // FormControl-Objekte für die Eingabefelder des Formulars
  titleFC = new FormControl('', [Validators.required]);
  descriptionFC = new FormControl('', [Validators.required]);
  dateFC = new FormControl('', [Validators.required]);
  starttimeFC = new FormControl('', [Validators.required]);
  endtimeFC = new FormControl('', [Validators.required]);
  locationFC = new FormControl('', [Validators.required]);
  linkFC = new FormControl('',[Validators.pattern('^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,})([\/\w \.-]*)*\/?$')]);

  bs = inject (BackendService); // BackendService per Dependency Injection einbinden
  backendService: any;
  
  // ngOnInit-Methode zum Initialisieren des BackendService
  ngOnInit(): void {
    this.create();
    };

 
  // Methode zum Erstellen eines Events
  create() { 
    this.backendService.createEvent({
      title: this.titleFC.value,
      description: this.descriptionFC.value,
      date: this.dateFC.value,
      starttime: this.starttimeFC.value,
      endtime: this.endtimeFC.value,
      location: this.locationFC.value,
      link: this.linkFC.value,
    }).subscribe((response: any) => { // Response-Objekt ausgeben lassen (zum Testen)
      console.log(response);
    });
    }

    // Methode zum Abbrechen des Erstellens eines Events
    cancel() {
      this.titleFC.setValue('');
      this.descriptionFC.setValue('');
      this.dateFC.setValue('');
      this.starttimeFC.setValue('');
      this.endtimeFC.setValue('');
      this.locationFC.setValue('');
      this.linkFC.setValue('');
      }
  }

  

