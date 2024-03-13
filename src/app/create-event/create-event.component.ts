import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent {

  titleFC = new FormControl('', [Validators.required, Validators.minLength(3)]); // FormControl für den Titel des Events
  dateFC = new FormControl('', [Validators.required]);
  starttimeFC = new FormControl('', [Validators.required]); 
  endtimeFC = new FormControl('', [Validators.required]); 
  locationFC = new FormControl('', [Validators.required]); 
  descriptionFC = new FormControl('', [Validators.required, Validators.minLength(10)]); 


}
