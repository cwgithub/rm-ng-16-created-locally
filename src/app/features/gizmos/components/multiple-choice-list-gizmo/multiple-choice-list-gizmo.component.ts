import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { GizmoType } from 'src/app/core/models/types';
import { AssessmentService } from 'src/app/core/services/assessment.service';
import { AsyncPipe } from '@angular/common';
import { ServerUtilsService } from 'src/app/core/services/server-utils..service';

@Component({
  selector: 'app-multiple-choice-list-gizmo',
  standalone: true,
  imports: [FormsModule, MatRadioModule, MatButtonModule, AsyncPipe],
  templateUrl: './multiple-choice-list-gizmo.component.html',
  styleUrls: ['./multiple-choice-list-gizmo.component.scss'],
})
export class MultipleChoiceListGizmoComponent implements AfterViewInit {
  static readonly GizmoType: GizmoType = 'multiple-choice-list';

  constructor(
    private _assessmentService: AssessmentService,
    private _serverUtilsService: ServerUtilsService,
  ) {}

  @Input() options?: string[];
  @Input() answerData?: any;

  selection?: string;

  @Output() answerEvent = new EventEmitter<any>();

  ngAfterViewInit(): void {
    if (this.answerData) {
      this.selection = this.answerData.selection;
    }
  }

  getImageUrl(imagePath: string): string {
    return this._serverUtilsService.getServerFileUrl(imagePath);
  }

  answer() {
    if (this.selection) {
      const testAnswer = {
        gizmoType: MultipleChoiceListGizmoComponent.GizmoType,
        selection: this.selection,
      };

      this.answerEvent.emit(testAnswer);
    }
  }
}
