import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { GizmoType } from '../../../../core/models/types';

@Component({
  selector: 'app-multi-multi-gizmo',
  standalone: true,
  imports: [FormsModule, MatSelectModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './multi-multi-gizmo.component.html',
  styleUrls: ['./multi-multi-gizmo.component.scss'],
})
export class MultiMultiGizmoComponent implements OnInit {
  static readonly GizmoType: GizmoType = 'multi-multi';

  constructor() {}

  @Input() optionsData?: any;
  @Input() answerData?: any;

  @Output() answerEvent = new EventEmitter<any>();

  keys?: string[];
  selection: { [id: string]: string | undefined } = {};

  ngOnInit(): void {
    if (this.optionsData) {
      this.keys = Object.keys(this.optionsData);
    }
    if (this.answerData) {
      this.selection = this.answerData.selection;
    }
  }

  answer() {
    const testAnswer = {
      gizmoType: MultiMultiGizmoComponent.GizmoType,
      selection: this.selection,
    };

    this.answerEvent.emit(testAnswer);
  }
}
