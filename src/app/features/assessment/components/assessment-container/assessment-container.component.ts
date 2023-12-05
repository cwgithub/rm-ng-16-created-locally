import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AssessmentComponent } from '../assessment/assessment.component';
import { AssessmentService } from '../../../../core/services/assessment.service';
import { Observable, tap } from 'rxjs';
import {
  QuestionSpec,
  SectionSpec,
} from 'src/app/core/services/models/interfaces';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    AssessmentComponent,
    NgIf,
  ],
  templateUrl: './assessment-container.component.html',
  styleUrls: ['./assessment-container.component.scss'],
})
export class AssessmentContainerComponent {
  showFiller = false;
  html?: string;
  currentQuestionNumber = 1;

  private _currentSection: any;

  constructor(private _assessmentService: AssessmentService) {
    this._assessmentService
      .loadAssessment('assets/assessments/grade1/test.json')
      .subscribe();
  }

  loadSection(sectionNumber: number) {
    this._assessmentService
      .getSection(sectionNumber)
      .pipe(
        tap((sectionFile: string) => {
          console.log(sectionFile);
        })
      )
      .subscribe((sectionData: any) => {
        this._currentSection = sectionData;
        console.log(this._currentSection);
      });
  }

  nextQuestion() {
    this.currentQuestionNumber++;
    this.loadQuestion(this.currentQuestionNumber);
  }

  previousQuestion() {
    this.currentQuestionNumber--;
    this.loadQuestion(this.currentQuestionNumber);
  }

  loadQuestion(questionNumber: number) {
    const question = this._currentSection.questions.find(
      (question: QuestionSpec) => question.questionNumber == questionNumber
    );

    this._assessmentService
      .loadFile(question.questionHtmlFile)
      .subscribe((html: any) => {
        this.html = html;
      });

    console.log(question);
  }

  getCurrentSection(): any {
    return this._currentSection;
  }
}
