import { CommonModule, Time } from '@angular/common';
import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BackendService } from '../shared/backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from '../shared/event';

@Component({
  selector: 'app-edit-event',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgbDatepickerModule],
  templateUrl: './update-event.component.html',
  styleUrl: './update-event.component.css'
})

export class UpdateEventComponent implements OnInit{
  id: number = 0;
  event!: Event;
  closeResult = '';

  titleFC = new FormControl('', [Validators.required]);
  dateFC = new FormControl(new Date(), [Validators.required]);
  starttimeFC = new FormControl({ hours: 0, minutes: 0 } as Time, [Validators.required]); // Anfangswerte für starttime und endtime festlegen
  endtimeFC = new FormControl({ hours: 0, minutes: 0 } as Time, [Validators.required]);
  locationFC = new FormControl('', [Validators.required]);
  descriptionFC = new FormControl('', [Validators.required]);
  linkFC = new FormControl('',[Validators.pattern('^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,})([\/\w \.-]*)*\/?$')]);

  private modalService = inject(NgbModal); 
  private bs = inject(BackendService) 
  private route = inject(ActivatedRoute)
  private router = inject(Router);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? Number(idParam) : 0;
    this.readOne(this.id);
  }

  readOne(id: number): void {
    this.bs.getEventById(id).subscribe(
    {
      next: (response: Event) => {
              this.event = response;
              console.log(this.event);
              this.titleFC.setValue(this.event.title);
              this.dateFC.setValue(new Date(this.event.date));
              this.starttimeFC.setValue(this.event.starttime);
              this.endtimeFC.setValue(this.event.endtime);
              this.locationFC.setValue(this.event.location);
              this.descriptionFC.setValue(this.event.description);
              this.linkFC.setValue(this.event.link);
              return this.event;
              
      },
      error: (err) => console.log(err),
      complete: () => console.log('readOne() completed')
    });
  }


  private formValid() {
    return this.titleFC.valid && this.dateFC.valid && this.locationFC.valid && this.starttimeFC.valid && this.endtimeFC.valid && this.descriptionFC.valid && this.linkFC.valid;
  }

  updateEvent(content: TemplateRef<any>) {

    if(this.formValid())
    {
      let event = {
        id: this.id,
        title: this.titleFC.value!,
        date: this.dateFC.value!,
        location: this.locationFC.value!,
        starttime: this.event.starttime!,
        endtime: this.event.endtime!,
        description: this.event.description!,
        link: this.event.link!
      }

      console.log('event: ', event) // for debugging

      this.bs.updateOneMember(event, this.id).subscribe({
          next: (response) => console.log('response', response),
          error: (err) => console.log(err),
          complete: () => console.log('update completed')
      });

      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result
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

  cancel(): void {
    this.readOne(this.id);
  }

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

}
