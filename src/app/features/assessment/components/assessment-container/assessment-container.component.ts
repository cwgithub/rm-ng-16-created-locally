import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AssessmentComponent } from '../assessment/assessment.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    AssessmentComponent,
  ],
  templateUrl: './assessment-container.component.html',
  styleUrls: ['./assessment-container.component.scss'],
})
export class AssessmentContainerComponent {
  showFiller = false;
}
