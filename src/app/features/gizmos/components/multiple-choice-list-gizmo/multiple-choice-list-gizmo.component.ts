import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { AnswerService } from 'src/app/core/services/answer.service';
import { MatButtonModule } from '@angular/material/button';
import { GizmoType } from 'src/app/core/models/types';

@Component({
  selector: 'app-multiple-choice-list-gizmo',
  standalone: true,
  imports: [FormsModule, MatRadioModule, MatButtonModule],
  templateUrl: './multiple-choice-list-gizmo.component.html',
  styleUrls: ['./multiple-choice-list-gizmo.component.scss'],
})
export class MultipleChoiceListGizmoComponent implements AfterViewInit {
  static readonly GizmoType: GizmoType = 'multiple-choice-list';

  constructor(private _answerService: AnswerService) {}

  @Input() options?: string[];
  @Input() answerData?: any;

  selection?: string;

  @Output() answerEvent = new EventEmitter<any>();

  ngAfterViewInit(): void {
    if (this.answerData) {
      this.selection = this.answerData.selection;
    }
  }

  answer() {
    const testAnswer = {
      gizmoType: MultipleChoiceListGizmoComponent.GizmoType,
      selection: this.selection,
    };

    this.answerEvent.emit(testAnswer);
  }
}
