import { Component, OnInit } from '@angular/core';  
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-crear-evento',
  standalone: true,
  imports: [],
  templateUrl: './crear-evento.component.html',
  styleUrls: ['./crear-evento.component.css']  
})
export class CrearEventoComponent implements OnInit {  

  constructor(private servicesUsuarios: UserService) { 

  }

  ngOnInit(): void {
    this.servicesUsuarios.getUsers().subscribe((value) => console.log(value));
  }

}
