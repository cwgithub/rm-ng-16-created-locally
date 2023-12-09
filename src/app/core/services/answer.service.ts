import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AnswerService {
  private _cache = new Map<string, any>();
  private _userId?: string;

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
  }

  getAnswer(
    userId: string,
    assessmentId: string,
    sectionName: string,
    questionNumber: number,
    answerData: any
  ): any {
    const key = this.createCacheKey(
      userId,
      assessmentId,
      sectionName,
      questionNumber
    );

    this._cache.get(key);
  }
}
