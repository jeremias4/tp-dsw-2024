import { Routes } from '@angular/router';
import { CrearEventoComponent } from './crear-evento/crear-evento.component';


export const ADMIN_ROUTES: Routes = [
    {path: 'crear-evento', component: CrearEventoComponent} //POST NUEVO EVENTO
];
