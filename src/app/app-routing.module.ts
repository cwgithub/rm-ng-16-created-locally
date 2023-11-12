import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'assessment-container',
    loadComponent: () =>
      import(
        './features/assessment/components/assessment-container/assessment-container.component'
      ).then((m) => m.AssessmentContainerComponent),
  },
  {
    path: 'vexflow',
    loadComponent: () =>
      import('./features/vexflow/components/vexflow/vexflow.component').then(
        (m) => m.VexflowComponent
      ),
  },

  { path: '', redirectTo: '/assessment-container', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
