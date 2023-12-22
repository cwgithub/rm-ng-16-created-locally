import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AssessmentService } from '../../../core/services/assessment.service';
import {
  AssessmentSpec,
  QuestionSpec,
  SectionSpec,
} from 'src/app/core/models/interfaces';
import { DragAndDropGizmoComponent } from 'src/app/features/gizmos/components/drag-and-drop-gizmo/drag-and-drop-gizmo.component';
import { MultipleChoiceListGizmoComponent } from 'src/app/features/gizmos/components/multiple-choice-list-gizmo/multiple-choice-list-gizmo.component';
import { AnswerService } from 'src/app/core/services/answer.service';
import { MultiMultiGizmoComponent } from 'src/app/features/gizmos/components/multi-multi-gizmo/multi-multi-gizmo.component';
import { QuestionNavComponent } from 'src/app/features/components/question-nav/question-nav.component';

@Component({
  standalone: true,
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss'],
  imports: [
    MatSidenavModule,
    MatButtonModule,
    DragAndDropGizmoComponent,
    MultipleChoiceListGizmoComponent,
    MultiMultiGizmoComponent,
    QuestionNavComponent,
  ],
})
export class AssessmentComponent implements OnInit {
  userId = 'cbw';

  currentAssessmentSpec?: AssessmentSpec;
  currentSectionSpec?: SectionSpec;
  currentQuestionSpec?: QuestionSpec;

  showFiller = false;
  html?: string;
  currentQuestionNumber = 1;
  draggables: string[] = [];
  options: string[] = [];
  optionsData: {} = {};

  // data loaded from the AnswerService for this question
  answerData?: any;

  constructor(
    private _assessmentService: AssessmentService,
    private _answerService: AnswerService
  ) {
    this._answerService.getUserId(this.userId);
  }

  ngOnInit(): void {
    this.loadAssessmentSpec(
      'Grade 1',
      'assets/assessments/grade1/assessment.json'
    );
  }

  loadAssessmentSpec(shortName: string, fullPath: string) {
    this._assessmentService
      .loadAssessmentSpec(shortName, fullPath)
      .subscribe(
        (assessmentSpec: AssessmentSpec) =>
          (this.currentAssessmentSpec = assessmentSpec)
      );
  }

  loadSectionSpec(sectionNumber: number) {
    if (!this.currentAssessmentSpec) {
      throw new Error(
        'No active assessment found when trying to get a section.'
      );
    }

    this._assessmentService
      .loadSectionSpec(this.currentAssessmentSpec, sectionNumber)
      .subscribe((sectionSpec: SectionSpec) => {
        this.currentSectionSpec = sectionSpec;
        this.getQuestionSpec(this.currentSectionSpec, 1);
        this.processQuestionSpec();
      });
  }

  getQuestionSpec(SectionSpec: SectionSpec, questionNumber: number) {
    this.currentQuestionSpec = this._assessmentService.getQuestionSpec(
      SectionSpec,
      questionNumber
    );

    this.answerData = this.answerLoad();
  }

  nextQuestion() {
    if (!this.currentSectionSpec) {
      throw new Error('No active section found when trying to get a question.');
    }

    if (this.currentQuestionNumber < this.currentSectionSpec.questions.length) {
      this.currentQuestionNumber++;
    }

    this.temp();
  }

  previousQuestion() {
    if (!this.currentSectionSpec) {
      throw new Error('No active section found when trying to get a question.');
    }

    if (this.currentQuestionNumber > 1) {
      this.currentQuestionNumber--;
    }

    this.temp();
  }

  finishTest() {
    alert('Do all the marking!');
  }

  private temp() {
    // set to undefined to for gizmo component to reload in fresh state
    this.currentQuestionSpec = undefined;

    setTimeout(() => {
      // get the next questionSpec to be processed
      this.getQuestionSpec(
        this.currentSectionSpec as SectionSpec,
        this.currentQuestionNumber
      );

      // process it
      this.processQuestionSpec();
    }, 100);
  }

  processQuestionSpec() {
    if (this.currentQuestionSpec?.draggables) {
      this.draggables = this.currentQuestionSpec?.draggables.map(
        (dName: string) =>
          `${this.currentQuestionSpec?.questionHtmlDir}/${dName}`
      );
    }

    if (this.currentQuestionSpec?.options) {
      this.options = this.currentQuestionSpec?.options.map(
        (dName: string) =>
          `${this.currentQuestionSpec?.questionHtmlDir}/${dName}`
      );
    }

    if (this.currentQuestionSpec?.optionsData) {
      this.optionsData = this.currentQuestionSpec?.optionsData;
    }

    this.html = undefined;

    if (this.currentQuestionSpec) {
      this._assessmentService
        .loadTextFile(this.currentQuestionSpec.questionHtmlFile)
        .subscribe((html: any) => {
          this.html = html;
        });
    }
  }

  loadJsonFile(filePath?: string): any {
    if (filePath) {
      return this._assessmentService.loadJsonFile(filePath);
    }

    return {};
  }

  onAnswerEvent(answerData: any) {
    if (
      this.userId &&
      this.currentAssessmentSpec?.assessmentId &&
      this.currentSectionSpec?.sectionName &&
      this.currentQuestionSpec?.questionNumber
    ) {
      this._answerService.setAnswer(
        this.userId,
        this.currentAssessmentSpec?.assessmentId,
        this.currentSectionSpec?.sectionName,
        this.currentQuestionSpec?.questionNumber,
        answerData
      );
    }
  }

  answerLoad(): any {
    if (
      this.userId &&
      this.currentAssessmentSpec?.assessmentId &&
      this.currentSectionSpec?.sectionName &&
      this.currentQuestionSpec?.questionNumber
    ) {
      return this._answerService.getAnswer(
        this.userId,
        this.currentAssessmentSpec?.assessmentId,
        this.currentSectionSpec?.sectionName,
        this.currentQuestionSpec?.questionNumber
      );
    }
  }

  onQuestionNavQuestionClicked(questionNumber: number) {
    this.currentQuestionNumber = questionNumber;

    this.temp();
  }

  isCorrect(questionNumber?: number): boolean {
    if (questionNumber) {
      return this._answerService.isCorrect(questionNumber);
    }

    return false;

    // throw new Error('Could not detect the current question number.')
  }
}
