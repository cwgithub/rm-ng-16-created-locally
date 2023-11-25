import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragAndDropComponent } from 'src/app/features/gizmos/components/drag-and-drop/drag-and-drop.component';

@Component({
  selector: 'app-drag-and-dro-test',
  standalone: true,
  imports: [CommonModule, DragAndDropComponent],
  templateUrl: './drag-and-drop-test.component.html',
  styleUrls: ['./drag-and-drop-test.component.scss']
})
export class DragAndDropTestComponent {

}
