import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { AnswerService } from 'src/app/core/services/answer.service';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-multi-multi-gizmo',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './multi-multi-gizmo.component.html',
  styleUrls: ['./multi-multi-gizmo.component.scss'],
})
export class MultiMultiGizmoComponent implements AfterViewInit, OnChanges {
  constructor(private _answerService: AnswerService) {}

  @Input() optionsData?: any;
  @Input() answerData?: any;

  keys?: string[];
  selections: { [id: string]: string | undefined } = {};

  @Output() answerEvent = new EventEmitter<any>();

  ngAfterViewInit(): void {
    if (this.answerData) {
      this.selections = this.answerData.selections;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.keys = Object.keys(this.optionsData);

    this.keys.forEach((key: string) => (this.selections[key] = undefined));
  }

  answer() {
    const testAnswer = {
      selections: this.selections,
    };

    this.answerEvent.emit(testAnswer);
  }
}
