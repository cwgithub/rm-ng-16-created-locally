import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-assessment',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss'],
})
export class AssessmentComponent {
  static AssessmentRootPath = '/assets/assessments';
  static AssessmentFileName = 'assessment.json';

  assessment?: any;
  private _assessmentName = 'grade5';

  constructor(private _httpClient: HttpClient) {
    const fullFileName = `${AssessmentComponent.AssessmentRootPath}\\${this._assessmentName}\\${AssessmentComponent.AssessmentFileName}`;

    this.loadAssessment(fullFileName);
  }

  private loadAssessment(fileName: string) {
    this._httpClient.get(fileName).subscribe((data) => {
      this.assessment = data;
      return data;
    });
  }
}
