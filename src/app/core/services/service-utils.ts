export class ServiceUtils {
  static readonly CacheKeyDelimiter = '::';

  constructor() {}

  static createCacheKey(
    userId: string,
    assessmentId: string,
    sectionName: string,
    questionNumber: number
  ): string {
    return `${userId}${ServiceUtils.CacheKeyDelimiter}${assessmentId}${ServiceUtils.CacheKeyDelimiter}${sectionName}${ServiceUtils.CacheKeyDelimiter}${questionNumber}`;
  }
}
