import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewSystemComponent } from './components/systems/new-system/new-system.component';
import { SystemsComponent } from './components/systems/systems/systems.component';

const routes: Routes = [
  { path: 'systems', component: SystemsComponent, title: 'Impianti' },
  {
    path: 'systems/new',
    component: NewSystemComponent,
    title: 'Nuovo Impianto',
  },
  { path: '', redirectTo: '/systems', pathMatch: 'full' }, // TODO: Redirect to '/login'
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
