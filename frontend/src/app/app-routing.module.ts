import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewSystemComponent } from './components/systems/new-system/new-system.component';
import { SystemsComponent } from './components/systems/systems/systems.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, title: 'Dashboard' },
  { path: 'systems', component: SystemsComponent, title: 'Impianti' },
  {
    path: 'systems/new',
    component: NewSystemComponent,
    title: 'Nuovo Impianto',
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // TODO: Redirect to '/login'
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
