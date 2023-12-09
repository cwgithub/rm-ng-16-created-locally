import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsDragAndDropComponent } from '../../js-drag-and-drop/js-drag-and-drop.component';
import { DragAndDropGizmoComponent } from 'src/app/features/gizmos/components/drag-and-drop-gizmo/drag-and-drop-gizmo.component';


@Component({
  selector: 'app-drag-and-dro-test',
  standalone: true,
  imports: [CommonModule, JsDragAndDropComponent, DragAndDropGizmoComponent],
  templateUrl: './drag-and-drop-test.component.html',
  styleUrls: ['./drag-and-drop-test.component.scss'],
})
export class DragAndDropTestComponent implements AfterViewInit, OnDestroy {
  dragImage = 'assets/tests/gizmos/drag-and-drop-barline.png';
  dropImage = 'assets/tests/gizmos/drag-and-drop-stave.png';

  left = 0;
  top = 0;

  savedX = -1;
  savedY = -1;

  releasedX = -1;
  releasedY = -1;

  currentState = '';

  outerElem?: HTMLElement;
  innerElem?: HTMLElement;

  ngAfterViewInit(): void {
    const outer = document.getElementById('outer');
    if (outer) {
      this.outerElem = outer;
    }

    const inner = document.getElementById('inner');
    if (inner) {
      this.innerElem = inner;
    }

    console.log(this.outerElem);
    console.log(this.innerElem);
  }

  ngOnDestroy(): void {
    alert('I am being destroyed!')
  }

  moveInner() {
    this.left += 10;
    this.placeXY(this.left, 0);
  }

  cdkDragReleased(event: any) {
    this.releasedX = event.event.x;
    this.releasedY = event.event.y;
    this.placeXY(0, 0);
  }

  cdkDragStarted(event: any) {
    // this.placeXY(event.event.x, 0);
    // this.placeXY(0, 0);
    // this.left = event.event.x;
    // this.top = event.event.y;
  }

  recordXY() {
    this.savedX = this.releasedX;
    this.savedY = this.releasedY;

    localStorage.setItem('savedX', `${this.savedX}`);
    localStorage.setItem('savedY', `${this.savedY}`);
  }

  loadXY() {
    const x = localStorage.getItem('savedX');
    const y = localStorage.getItem('savedY');

    if (x !== null && y !== null) {
      this.placeXY(+x, 0);
    }
  }

  resetXY() {
    this.left = 0;
    this.top = 0;
    this.placeXY(0, 0);
  }

  repositionXY() {
    this.placeXY(this.savedX, this.savedY);
  }

  showXY() {
    const elem = document.getElementById('inner');
    if (elem) {
      this.currentState = `left ${elem.style.left}, top ${elem.style.top}`;
    } else {
      this.currentState = 'Not known';
    }
  }

  private placeXY(x: number, y: number) {
    const elem = document.getElementById('inner');

    this.left = x;
    this.top = y;

    if (elem) {
      elem.style.position = 'relative';
      elem.style.left = x + 'px';
      elem.style.top = y + 'px';
    }
  }
}
