import { Injectable } from '@angular/core';
import { GizmoType } from '../models/types';

@Injectable({
  providedIn: 'root',
})
export class AnswerService {
  private _cache = new Map<string, any>();
  private _userId?: string;
  private _correctMap = new Map<number, boolean>();

  constructor() {}

  static readonly CacheKeyDelimiter = '::';

  private createCacheKey(
    userId: string,
    assessmentId: string,
    sectionName: string,
    questionNumber: number
  ): string {
    return `${userId}${AnswerService.CacheKeyDelimiter}${assessmentId}${AnswerService.CacheKeyDelimiter}${sectionName}${AnswerService.CacheKeyDelimiter}${questionNumber}`;
  }

  setUserId(userId: string) {
    this._userId = userId;
  }

  getUserId(userId: string): string | undefined {
    return this._userId;
  }

  setAnswer(
    userId: string,
    assessmentId: string,
    sectionName: string,
    questionNumber: number,
    answerData: any
  ): void {
    const key = this.createCacheKey(
      userId,
      assessmentId,
      sectionName,
      questionNumber
    );

    this._cache.set(key, answerData);

    // todo - this will move to the server side
    const isCorrect = this.determineIsCorrect(
      userId,
      assessmentId,
      sectionName,
      questionNumber
    );

    this._correctMap.set(questionNumber, isCorrect);
  }

  isCorrect(questionNumber: number): boolean {
    return this._correctMap.get(questionNumber) || false;
  }

  private determineIsCorrect(
    userId: string,
    assessmentId: string,
    sectionName: string,
    questionNumber: number
  ): boolean {
    const answer = this.getAnswer(
      userId,
      assessmentId,
      sectionName,
      questionNumber
    );

    switch (answer.gizmoType) {
      case 'multiple-choice-list':
        return true;

      case 'drag-and-drop':
        return true;

      case 'multi-multi':
        return true;

      default:
        throw new Error(`Unknown Gizmo type: "${answer.gizmoType}"`);
    }
  }

  getAnswer(
    userId: string,
    assessmentId: string,
    sectionName: string,
    questionNumber: number
  ): any {
    const key = this.createCacheKey(
      userId,
      assessmentId,
      sectionName,
      questionNumber
    );

    if (key) {
      return this._cache.get(key);
    }
  }
}
