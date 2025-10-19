import { Routes } from '@angular/router';
import { NotasPage } from '../pages/notas/notas.page';
import { AgregarPage } from '../pages/agregar/agregar.page';
import { AjustesPage } from '../pages/ajustes/ajustes.page';

export const routes: Routes = [
  {
    path: 'notas',
    component: NotasPage,
  },
  {
    path: 'agregar',
    component: AgregarPage,
  },
  {
    path: 'ajustes',
    component: AjustesPage,
  },
  {
    path: '',
    redirectTo: '/notas',
    pathMatch: 'full',
  },
];
