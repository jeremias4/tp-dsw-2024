import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form = signal<FormGroup>(
    new FormGroup(
      {
        name: new FormControl(''),
        surname: new FormControl(''),
        email: new FormControl(''),
        password: new FormControl(''),
        gender: new FormControl(''),
        city: new FormControl(''),
        vendor: new FormControl('')

      }

    )
  );

}
