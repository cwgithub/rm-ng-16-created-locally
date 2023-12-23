import { Injectable } from '@angular/core';
import { ServiceUtils } from './service-utils';
import { UserAnswer } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AnswerService {
  static readonly CacheKeyDelimiter = '::';
  private _cache = new Map<string, UserAnswer>();
  private _userId?: string;
  private _correctMap = new Map<number, boolean>();

  constructor() {}

  setUserId(userId: string) {
    this._userId = userId;
  }

  getUserId(): string | undefined {
    return this._userId;
  }

  setAnswer(
    userId: string,
    assessmentId: string,
    sectionName: string,
    questionNumber: number,
    answerData: UserAnswer
  ): void {
    const key = ServiceUtils.createCacheKey(
      userId,
      assessmentId,
      sectionName,
      questionNumber
    );

    this._cache.set(key, answerData);

    // // todo - this will move to the server side
    // const isCorrect = this.determineIsCorrect(
    //   userId,
    //   assessmentId,
    //   sectionName,
    //   questionNumber
    // );

    // this._correctMap.set(questionNumber, isCorrect);
  }

  isCorrect(questionNumber: number): boolean {
    return this._correctMap.get(questionNumber) || false;
  }

  getAnswer(
    userId: string,
    assessmentId: string,
    sectionName: string,
    questionNumber: number
  ): UserAnswer | undefined {
    const key = ServiceUtils.createCacheKey(
      userId,
      assessmentId,
      sectionName,
      questionNumber
    );

    if (key) {
      return this._cache.get(key);
    }

    return undefined;
  }
}
