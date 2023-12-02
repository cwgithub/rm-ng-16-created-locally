import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDrag, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-drag-and-drop',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    CdkDrag,
    CdkDropListGroup,
    CdkDropList,
  ],
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss'],
})
export class DragAndDropComponent {
  @ViewChild('draggable') draggable?: any;
  // @ViewChild('droppable') droppable?;

  dragImage = 'assets/tests/gizmos/drag-and-drop-barline.png';
  dropImage = 'assets/tests/gizmos/drag-and-drop-stave.png';

  result = 'Incorrect';

  staticX = 100;
  staticY = 100;

  cdkDragMoved(event: any) {
    console.log(`${event.event.x}, ${event.event.y}`);

    const topX = event.event.x - event.event.offsetX;
    const topY = event.event.y - event.event.offsetY;

    this.result = `topX = ${topX} topY = ${topY}`;
  }

  cdkDragStarted(event: any) {
    console.log(event);
  }

  cdkDragReleased(event: any) {
    const elem = document.getElementById('drag-img');
    if (elem) {
      elem.style.position = 'absolute';
      elem.style.left = '0px';
      elem.style.top = '0px';
    }

    if (
      event.event.x >= 400 &&
      event.event.x <= 445
      // &&
      // event.event.y >= 125 &&
      // event.event.y <= 135
    ) {
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

  positionDraggable(x: number, y: number) {
    console.log(this.draggable);

    x = 200;
    y = 200;

    const elem = document.getElementById('drag-img');
    if (elem) {
      // elem.style.position = 'absolute';
      elem.style.left = x + 'px';
      elem.style.top = y + 'px';
    }

    // This doesn't work!
    // ==================
    // if (this.draggable) {
    //   this.draggable.nativeElement.x = x;
    //   this.draggable.nativeElement.y = y;
    // }
  }
}
