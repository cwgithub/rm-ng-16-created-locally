import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { AnswerService } from 'src/app/core/services/answer.service';

@Component({
  selector: 'app-multiple-choice-list-gizmo',
  standalone: true,
  imports: [CommonModule, FormsModule, MatRadioModule],
  templateUrl: './multiple-choice-list-gizmo.component.html',
  styleUrls: ['./multiple-choice-list-gizmo.component.scss'],
})
export class MultipleChoiceListGizmoComponent implements AfterViewInit {
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
      selection: this.selection,
    };

    this.answerEvent.emit(testAnswer);
  }
}
