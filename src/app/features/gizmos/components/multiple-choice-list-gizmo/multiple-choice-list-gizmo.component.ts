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

  @Output() answerEvent = new EventEmitter<any>();

  selection?: string;

  ngAfterViewInit(): void { }

  answer() {
    const testAnswer = {
      gizmo: 'drag-and-drop',
      data: {
        foo: 'bar',
      },
    };

    this.answerEvent.emit(testAnswer);
  }
}
