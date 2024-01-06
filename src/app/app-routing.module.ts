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
    path: 'tests',
    loadComponent: () =>
      import('./features/tests/test/components/tests.component').then(
        (m) => m.TestsComponent
      ),
  },
  {
    path: 'vexflow',
    loadComponent: () =>
      import('./features/tests/vexflow/components/vexflow.component').then(
        (m) => m.VexflowComponent
      ),
  },
  {
    path: 'layouts',
    loadComponent: () =>
      import('./features/tests/layouts/components/layouts.component').then(
        (m) => m.LayoutsComponent
      ),
  },
  {
    path: 'gizmos',
    loadComponent: () =>
      import(
        './features/tests/gizmos/components/drag-and-drop-test.component'
      ).then((m) => m.DragAndDropTestComponent),
  },

  { path: '', redirectTo: '/assessment', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
