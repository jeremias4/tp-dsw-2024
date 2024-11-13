import { Component, Input } from '@angular/core';
import { Evento } from './producto.interface'

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {

  @Input() evento!: Evento;
}
