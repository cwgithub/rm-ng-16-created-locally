import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AssessmentSpec, SectionSpec } from '../../../core/models/interfaces';
import { AnswerService } from 'src/app/core/services/answer.service';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-question-nav',
  templateUrl: './question-nav.component.html',
  styleUrl: './question-nav.component.scss',
})
export class QuestionNavComponent {
  @Input() userId?: string;
  @Input() assessmentId?: string;
  @Input() sectionSpec?: SectionSpec;
  @Input() currentQuestionNumber?: number;

  @Output() questionClickEvent = new EventEmitter<number>();

  constructor(private _answerService: AnswerService) {}



  isAnswered(questionNumber: number): boolean {
    if (!this.userId) {
      throw new Error('No user id set');
    }
    if (!this.assessmentId) {
      throw new Error('No assessment id set');
    }
    if (!this.sectionSpec) {
      throw new Error('No active section set');
    }

    const userAnswer = this._answerService.getAnswer(
      this.userId,
      this.assessmentId,
      this.sectionSpec?.sectionName,
      questionNumber,
    );

    return userAnswer !== undefined;
  }
}
