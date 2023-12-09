import { AfterViewInit, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-multiple-choice-list-gizmo',
  standalone: true,
  imports: [CommonModule, FormsModule, MatRadioModule],
  templateUrl: './multiple-choice-list-gizmo.component.html',
  styleUrls: ['./multiple-choice-list-gizmo.component.scss'],
})
export class MultipleChoiceListGizmoComponent implements AfterViewInit {
  constructor() {}

  @Input() options?: string[];

  selection?: string;

  ngAfterViewInit(): void {}
}
