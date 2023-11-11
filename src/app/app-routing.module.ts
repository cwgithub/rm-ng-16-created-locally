import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'assessment',
    loadComponent: () =>
      import('./features/components/assessment/assessment.component').then(
        (m) => m.AssessmentComponent
      ),
  },
  {
    path: 'vexflow',
    loadComponent: () =>
      import('./features/components/vexflow/vexflow.component').then(
        (m) => m.VexflowComponent
      ),
  },

  { path: '', redirectTo: '/assessment', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
