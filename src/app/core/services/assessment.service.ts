import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { AssessmentSpec, SectionSpec } from './models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AssessmentService {
  private _assessmentSpec?: AssessmentSpec;

  constructor(private _httpClient: HttpClient) {}

  loadAssessment(fileName: string) {
    return this._httpClient
      .get<AssessmentSpec>(fileName)
      .pipe(
        tap(
          (assessmentSpec: AssessmentSpec) =>
            (this._assessmentSpec = assessmentSpec)
        )
      );
  }

  getSection(sectionNumber: number): Observable<any> {
    if (!this._assessmentSpec) {
      throw new Error('Assessment not loaded');
    }

    const section = this._assessmentSpec.sections.find(
      (sectionSpec: SectionSpec) => (sectionSpec.sectionNumber = sectionNumber)
    );

    if (!section) {
      throw new Error('Section file not found');
    }

    console.log('sectionFile ' + section?.sectionFile);

    return this._httpClient.get(section?.sectionFile);
  }

  loadFile(fileName: string) {
    return this._httpClient.get(fileName, { responseType: 'text' });
  }
}
