import { Component } from '@angular/core';
import { AssessmentService } from '../../../../core/services/assessment.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-tests',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss'],
})
export class TestsComponent {
  imageData?: any;
  sanitized?: any;

  constructor(
    private _assessmentService: AssessmentService,
    private _sanitizer: DomSanitizer
  ) {}
}
