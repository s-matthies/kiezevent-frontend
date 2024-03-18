import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { BackendService } from '../shared/backend.service';
import { CommonModule, Time } from '@angular/common';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from '../shared/event';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgbDatepickerModule],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent{
  
  private modalService = inject(NgbModal);
  private bs = inject(BackendService);
  private router = inject(Router);
  private route = inject(ActivatedRoute) 
  closeResult = '';

  event!: Event; 
 
  
  titleFC = new FormControl('', [Validators.required]);
  dateFC = new FormControl(null, [Validators.required], futureDateValidator());
  starttimeFC = new FormControl(null, [Validators.required]);
  endtimeFC = new FormControl(null, [Validators.required]);
  /*
  dateFC = new FormControl(new Date(), [Validators.required]);
  starttimeFC = new FormControl({ hours: 0, minutes: 0 } as Time, [Validators.required]); // Anfangswerte für starttime und endtime festlegen
  endtimeFC = new FormControl({ hours: 0, minutes: 0 } as Time, [Validators.required]);
  */
  locationFC = new FormControl('', [Validators.required]);
  descriptionFC = new FormControl('', [Validators.required]);
  linkFC = new FormControl('',[Validators.pattern('^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,})([\/\w \.-]*)*\/?$')]);
  

  //
  private formValid() {
    return this.titleFC.valid && this.descriptionFC.valid && this.dateFC.valid && this.starttimeFC.valid && this.endtimeFC.valid && this.locationFC.valid && this.linkFC.valid;
  }


  // Methode zum Erstellen eines neuen Events
  createEvent(content: TemplateRef<any>) {
    if(this.formValid())
    {
      let event = {
        title: this.titleFC.value!,
        date: this.dateFC.value!,
        location: this.locationFC.value!,
        starttime: this.starttimeFC.value!,
        endtime: this.endtimeFC.value!,
        description: this.descriptionFC.value!,
        link: this.linkFC.value!
      }
      
      console.log('new event: ', event);

      this.bs.createEvent(event).subscribe({
        next: (response) => console.log('response', response),
        error: (err) => console.log(err),
        complete: () => console.log('register completed')
    });


   


    // Modal öffnen
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title' }).result
      .then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          this.router.navigate(['/members']);
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        },
      );

      console.log('new event: ', event)
    }
    else
    {
      console.warn('form still invalid!')
    }
  }

      // Methode zum Anzeigen des Modal-Dialogs
      private getDismissReason(reason: any): string {
        switch (reason) {
          case ModalDismissReasons.ESC:
            return 'by pressing ESC';
          case ModalDismissReasons.BACKDROP_CLICK:
            return 'by clicking on a backdrop';
          default:
            return `with: ${reason}`;
        }
      }


      // Hilfsmethode für die Anzeige von Fehlermeldungen
      isInvalidAndTouched(field: FormControl): boolean {
        return !field.valid && field.touched;
      }


      // Methode zum Zurücksetzen des Formulars
      resetForm(): void {
        this.titleFC.reset();
        this.dateFC.reset();
        this.starttimeFC.reset();
        this.endtimeFC.reset();
        this.locationFC.reset();
        this.descriptionFC.reset();
        this.linkFC.reset();
      }


      // Methode zum Abbrechen / zurück zur EventList-Komponente
    cancel() {
      this.router.navigate(['/event']); // zurück zur EventList-Komponente navigieren
     }
  }

  // Validator für das Datum (darf nicht in der Vergangenheit liegen)
  export function futureDateValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const forbidden = new Date(control.value) < new Date();
      return of(forbidden ? { 'pastDate': {value: control.value} } : null);
    };
  }
