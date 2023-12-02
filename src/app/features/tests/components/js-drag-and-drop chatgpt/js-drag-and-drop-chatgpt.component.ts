import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-js-drag-and-drop-chatgpt',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './js-drag-and-drop-chatgpt.component.html',
  styleUrls: ['./js-drag-and-drop-chatgpt.component.scss'],
})
export class JsDragAndDropComponentChatGpt implements OnInit {
  dragImage = 'assets/tests/gizmos/drag-and-drop-barline.png';
  dropImage = 'assets/tests/gizmos/drag-and-drop-stave.png';

  @Input() gizmoInstance?: number;

  @ViewChild('draggableElement', { static: true }) draggableElementRef:
    | ElementRef
    | undefined;
  @ViewChild('droppableElement', { static: true }) droppableElementRef:
    | ElementRef
    | undefined;

  offsetX: number = -1;
  offsetY: number = -1;
  isDragging = false;

  draggableElement?: HTMLElement;
  droppableElement?: HTMLElement;

  constructor() {}

  ngOnInit(): void {
    if (this.draggableElementRef) {
      this.draggableElement = this.draggableElementRef
        .nativeElement as HTMLElement;

      this.draggableElement.addEventListener(
        'dragstart',
        this.dragstart.bind(this)
      );
      this.draggableElement.addEventListener('drag', this.drag.bind(this));
    }

    if (this.droppableElementRef) {
      this.droppableElement = this.droppableElementRef
        .nativeElement as HTMLElement;
      this.droppableElement.addEventListener(
        'dragover',
        this.allowDrop.bind(this)
      );
      this.droppableElement.addEventListener('drop', this.drop.bind(this));
    }
  }

  allowDrop(e: any) {
    e.preventDefault();
  }

  // mouseDown(e: any) {
  dragstart(e: any) {
    if (this.draggableElement) {
      this.isDragging = true;
      this.offsetX =
        e.clientX - this.draggableElement.getBoundingClientRect().left;
      this.offsetY =
        e.clientY - this.draggableElement.getBoundingClientRect().top;

      setTimeout(() => {
        e.target.classList.add('hide');
      }, 0);
    }
  }

  drag(e: any) {
    if (this.draggableElement && this.isDragging) {
      const x = e.clientX - this.offsetX;
      const y = e.clientY - this.offsetY;
      this.draggableElement.style.left = x + 'px';
      this.draggableElement.style.top = y + 'px';
    }
  }

  positionClick() {
    const leftPosition = localStorage.getItem(
      `${this.gizmoInstance}-leftPosition`
    );
    const topPosition = localStorage.getItem(
      `${this.gizmoInstance}-topPosition`
    );

    if (this.draggableElement) {
      this.draggableElement.style.left = leftPosition + 'px';
      this.draggableElement.style.top = topPosition + 'px';
    }
  }

  storeClick() {
    if (this.draggableElement) {
      // Store the position (l
      const leftPosition = parseInt(
        this.draggableElement.style.left || '0',
        10
      );
      const topPosition = parseInt(this.draggableElement.style.top || '0', 10);

      localStorage.setItem(
        `${this.gizmoInstance}-leftPosition`,
        `${leftPosition}`
      );
      localStorage.setItem(
        `${this.gizmoInstance}-topPosition`,
        `${topPosition}`
      );

      console.log(`Position: left ${leftPosition}, top ${topPosition}`);
    }
  }

  drop(e: any) {
    e.target.classList.remove('drag-over');

    this.isDragging = false;

    // get the draggable element
    const data = e.dataTransfer.getData('text/plain');
    // const draggable = document.getElementById(id);

    setTimeout(() => {
      if (this.draggableElement) {
        // display the draggable element
        this.draggableElement.classList.remove('hide');
      }
    }, 0);
  }
}
