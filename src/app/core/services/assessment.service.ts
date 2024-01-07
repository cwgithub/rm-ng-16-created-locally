import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, switchMap, tap } from 'rxjs';
import {
  AssessmentSpec,
  QuestionSpec,
  SectionFileRef,
  SectionSpec,
} from '../models/interfaces';
import { DomSanitizer, SafeHtml, SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class AssessmentService {
 //static readonly ServerUrl = 'https://theoryserverts.azurewebsites.net';
    static readonly ServerUrl = 'http://localhost:8080';

  private _cache = new Map<string, AssessmentSpec>();

  constructor(
    private _httpClient: HttpClient,
  ) {}

  loadAssessmentSpec(shortName: string): Observable<AssessmentSpec> {
    const url = `${AssessmentService.ServerUrl}/api/assessment/${shortName}`;

    return this._httpClient
      .get<AssessmentSpec>(url)
      .pipe(
        tap((assessmentSpec: AssessmentSpec) =>
          this._cache.set(shortName, assessmentSpec),
        ),
      );
  }

  loadSectionSpec(
    assessmentSpec: AssessmentSpec,
    sectionNumber: number,
  ): Observable<SectionSpec> {
    if (!assessmentSpec) {
      throw new Error('Assessment not loaded');
    }

    const sectionFileRef = assessmentSpec.sectionsFileRefs.find(
      (sectionSpec: SectionFileRef) =>
        sectionSpec.sectionNumber === sectionNumber,
    );

    if (!sectionFileRef) {
      throw new Error('Section data not found');
    }

    const url = `${AssessmentService.ServerUrl}/api/section/${assessmentSpec.assessmentName}/${sectionFileRef.sectionName}`;

    // load the section JSON data
    return this._httpClient.get<SectionSpec>(url);
  }

  getQuestionSpec(
    sectionSpec: SectionSpec,
    questionNumber: number,
  ): QuestionSpec {
    if (!sectionSpec) {
      throw new Error('Section not loaded');
    }

    const questionSpec = sectionSpec.questions.find(
      (questionSpec: QuestionSpec) =>
        questionSpec.questionNumber === questionNumber,
    );

    if (!questionSpec) {
      throw new Error('Question data not found');
    }

    // load the section JSON data
    return questionSpec;
  }

  loadTextFile(fileName: string): Observable<string> {
    return this._httpClient.get(fileName, { responseType: 'text' });
  }

  loadJsonFile(fileName: string): Observable<any> {
    return this._httpClient.get(fileName);
  }

  getServerFileUrl(path: string): string {
    return `${AssessmentService.ServerUrl}/${path}`;
  }
}
