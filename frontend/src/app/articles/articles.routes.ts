import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductoComponent } from './producto/producto.component';
import { ComprarComponent } from './comprar/comprar.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CrearEventoComponent } from './crear-evento/crear-evento.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';


export const ARTICLES_ROUTES: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'producto', component: ProductoComponent},
    {path: 'comprar', component: ComprarComponent},
    {path: 'perfil', component: PerfilComponent},
    {path: 'crear-evento', component: CrearEventoComponent},
    {path: 'editar-perfil', component: EditarPerfilComponent},
];
