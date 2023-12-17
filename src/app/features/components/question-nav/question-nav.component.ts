import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SectionSpec } from '../../../core/models/interfaces';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-question-nav',
  templateUrl: './question-nav.component.html',
  styleUrl: './question-nav.component.scss',
})
export class QuestionNavComponent {
  @Input() sectionSpec?: SectionSpec;
  @Output() questionClickEvent = new EventEmitter<number>();
}
