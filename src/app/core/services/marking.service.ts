import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GizmoType } from '../models/types';
import {
  CorrectAnswer,
  CorrectAnswersSpec,
  UserAnswer,
} from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class MarkingService {
  static readonly CacheKeyDelimiter = '::';

  private _cache = new Map<number, CorrectAnswer>();

  constructor(private _httpClient: HttpClient) {
    this.loadAnswers(
      'Grade 1',
      'assets/assessments/grade1/rhythm/answers.json'
    );
  }

  loadAnswers(_shortName: string, fullPath: string) {
    return this._httpClient
      .get<CorrectAnswersSpec>(fullPath)
      .subscribe((data: CorrectAnswersSpec) => {
        data.answers.forEach((answer: CorrectAnswer) => {
          this._cache.set(answer.questionNumber, answer);
        });
      });
  }

  determineIsCorrect(questionNumber: number, userAnswer: UserAnswer): boolean {
    const correctAnswer = this._cache.get(questionNumber);

    if (correctAnswer) {
      if (correctAnswer.gizmoType !== userAnswer.gizmoType) {
        throw new Error('Gizmo types should match!');
      }

      switch (correctAnswer.gizmoType) {
        case 'multiple-choice-list':
          return (
            correctAnswer.selection === userAnswer.selection.split('/').pop()
          );

        case 'drag-and-drop':
          // "selection": {
          //   "barline.png": {
          //     "uppperLeft": 460,
          //     "upperTop": 230,
          //     "lowerLeft": 510,
          //     "lowerTop": 240
          //   }
          // }

          const userSelectKeys = Object.keys(userAnswer.selection);
          const correctSelectKeys = Object.keys(correctAnswer.selection);

          if (userSelectKeys.length !== correctSelectKeys.length) {
            return false;
          }




          return true;

        case 'multi-multi':
          return true;

        default:
          throw new Error(`Unknown Gizmo type: "${correctAnswer.gizmoType}"`);
      }
    }

    return false;
  }
}
