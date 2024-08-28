import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductoComponent } from './producto/producto.component';
import { ComprarComponent } from './comprar/comprar.component';
import { CrearEventoComponent } from '../admin/crear-evento/crear-evento.component';


export const ARTICLES_ROUTES: Routes = [
    {path: 'home', component: HomeComponent}, //GET TODOS LOS EVENTOS
    {path: 'product', component: ProductoComponent}, //GET 1 SOLO EVENTO
    {path: 'comprar', component: ComprarComponent}, //GET TICKET DE EVENTO
];
