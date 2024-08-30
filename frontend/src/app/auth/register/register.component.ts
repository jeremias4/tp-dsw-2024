import { JsonPipe } from '@angular/common';
import { Component, inject} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  formulario: FormGroup;
  userService = inject(UserService)

  constructor(){
    this.formulario = new FormGroup({
        name: new FormControl(),
        surname: new FormControl(),
        email: new FormControl(),
        password: new FormControl(),
        gender: new FormControl(),
        city: new FormControl(),
        vendor: new FormControl()
    })
  }
  async register(){
    const response = await this.userService.register(this.formulario.value);
    console.log(response)
  }
}
