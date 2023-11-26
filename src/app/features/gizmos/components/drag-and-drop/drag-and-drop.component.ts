import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDrag, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
// import { DndDropEvent, DndModule } from 'ngx-drag-drop';

// export type DndDragImageOffsetFunction = (
//   event: DragEvent,
//   dragImage: Element
// ) => { x: number; y: number };

@Component({
  selector: 'app-drag-and-drop',
  standalone: true,
  imports: [
    CommonModule,
    // DndModule,
    CdkDrag,
    CdkDropListGroup,
    CdkDropList,
  ],
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss'],
})
export class DragAndDropComponent {
  dragImage = 'assets/tests/gizmos/drag-and-drop-barline.png';
  dropImage = 'assets/tests/gizmos/drag-and-drop-stave.png';

  result = 'Incorrect';

  cdkDragMoved(event: any) {
    console.log(`${event.event.x}, ${event.event.y}`);
  }

  cdkDragStarted(event: any) {
    console.log(event);
  }

  cdkDragReleased(event: any) {
    if (event.event.x >= 400 && event.event.x <= 445) {
      this.result = 'Correct';
    } else {
      this.result = 'Incorrect';
    }
  }

  cdkDragDropped(event: any) {
    console.log(event);
  }

  cdkDropListDropped(event: any) {
    console.log(event);
  }

  cdkDropListEntered(event: any) {
    console.log(event);
  }

  cdkDropListExited(event: any) {
    console.log(event);
  }

  onDrop(event: any) {
    console.log(event);
  }
}
