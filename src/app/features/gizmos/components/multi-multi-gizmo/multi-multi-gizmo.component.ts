import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, UntypedFormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-multi-multi-gizmo',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './multi-multi-gizmo.component.html',
  styleUrls: ['./multi-multi-gizmo.component.scss'],
})
export class MultiMultiGizmoComponent implements OnInit {
  constructor() {}

  @Input() optionsData?: any;
  @Input() answerData?: any;

  @Output() answerEvent = new EventEmitter<any>();

  keys?: string[];
  selections: { [id: string]: string | undefined } = {};

  ngOnInit(): void {
    if (this.optionsData) {
      this.keys = Object.keys(this.optionsData);
    }
    if (this.answerData) {
      this.selections = this.answerData.selections;
    }
  }

  answer() {
    const testAnswer = {
      selections: this.selections,
    };

    this.answerEvent.emit(testAnswer);
  }
}
