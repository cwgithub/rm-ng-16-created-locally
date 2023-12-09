import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AssessmentSpec, QuestionSpec, SectionSpec } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AssessmentService {
  private _cache = new Map<string, AssessmentSpec>();

  constructor(private _httpClient: HttpClient) {}

  loadAssessmentSpec(
    shortName: string,
    fullPath: string
  ): Observable<AssessmentSpec> {
    return this._httpClient
      .get<AssessmentSpec>(fullPath)
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

    const sectionSpec = assessmentSpec.sections.find(
      (sectionSpec: SectionSpec) => (sectionSpec.sectionNumber === sectionNumber)
    );

    if (!sectionSpec) {
      throw new Error('Section data not found');
    }

    // load the section JSON data
    return this._httpClient.get<SectionSpec>(sectionSpec?.sectionFile);
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
        (questionSpec.questionNumber === questionNumber)
    );

    if (!questionSpec) {
      throw new Error('Question data not found');
    }

    // load the section JSON data
    return this.cloneQuestionSpec(questionSpec);
  }

  loadFile(fileName: string) {
    return this._httpClient.get(fileName, { responseType: 'text' });
  }

  private cloneQuestionSpec(original: QuestionSpec): QuestionSpec {
    const clone: QuestionSpec = {
      questionNumber: original.questionNumber,
      questionHtmlDir: original.questionHtmlDir,
      questionHtmlFile: original.questionHtmlFile,
      gizmo: original?.gizmo,
      draggables: original.draggables ? [...original.draggables] : undefined,
      droppable: original?.droppable,
      options: original.options ? [...original.options] : undefined,
    };




    return clone;
  }
}
