import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import {
  AssessmentSpec,
  QuestionSpec,
  SectionFileRef,
  SectionSpec,
} from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AssessmentService {
  // static readonly ServerUrl = 'https://theory-server.azurewebsites.net/api';
  static readonly ServerUrl = 'http://localhost:8080/api';

  private _cache = new Map<string, AssessmentSpec>();

  constructor(private _httpClient: HttpClient) {}

  loadAssessmentSpec(shortName: string): Observable<AssessmentSpec> {
    const url = `${AssessmentService.ServerUrl}/assessment/${shortName}`;

    return this._httpClient
      .get<AssessmentSpec>(url)
      .pipe(
        tap((assessmentSpec: AssessmentSpec) =>
          this._cache.set(shortName, assessmentSpec)
        )
      );
  }

  loadSectionSpec(
    assessmentSpec: AssessmentSpec,
    sectionNumber: number
  ): Observable<SectionSpec> {
    if (!assessmentSpec) {
      throw new Error('Assessment not loaded');
    }

    const sectionFileRef = assessmentSpec.sectionsFileRefs.find(
      (sectionSpec: SectionFileRef) =>
        sectionSpec.sectionNumber === sectionNumber
    );

    if (!sectionFileRef) {
      throw new Error('Section data not found');
    }

    const url = `${AssessmentService.ServerUrl}/section/${assessmentSpec.assessmentName}/${sectionFileRef.sectionName}`;

    // load the section JSON data
    return this._httpClient.get<SectionSpec>(url);
  }

  getQuestionSpec(
    sectionSpec: SectionSpec,
    questionNumber: number
  ): QuestionSpec {
    if (!sectionSpec) {
      throw new Error('Section not loaded');
    }

    const questionSpec = sectionSpec.questions.find(
      (questionSpec: QuestionSpec) =>
        questionSpec.questionNumber === questionNumber
    );

    if (!questionSpec) {
      throw new Error('Question data not found');
    }

    // load the section JSON data
    return this.cloneQuestionSpec(questionSpec);
  }

  loadTextFile(fileName: string) {
    return this._httpClient.get(fileName, { responseType: 'text' });
  }

  loadJsonFile(fileName: string) {
    return this._httpClient.get(fileName);
  }

  private cloneQuestionSpec(original: QuestionSpec): QuestionSpec {
    const clone: QuestionSpec = {
      questionNumber: original.questionNumber,
      questionHtmlDir: original.questionHtmlDir,
      questionHtmlFile: original.questionHtmlFile,
      gizmoType: original?.gizmoType,
      draggables: original.draggables ? [...original.draggables] : undefined,
      droppable: original?.droppable,
      options: original.options ? [...original.options] : undefined,
      optionsDataFile: original.optionsDataFile,
      optionsData: original.optionsData,
    };

    return clone;
  }
}
