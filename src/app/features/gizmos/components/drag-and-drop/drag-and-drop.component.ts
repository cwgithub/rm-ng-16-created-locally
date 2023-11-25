import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drag-and-drop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss'],
})
export class DragAndDropComponent {
  dragImage = 'assets/tests/gizmos/drag-and-drop-barline.png';
  dropImage = 'assets/tests/gizmos/drag-and-drop-stave.png';
}
