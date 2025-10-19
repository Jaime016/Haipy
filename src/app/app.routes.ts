import { Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    loadChildren: () => import('./tabs/tabs.routes').then(m => m.routes)
  }
];
