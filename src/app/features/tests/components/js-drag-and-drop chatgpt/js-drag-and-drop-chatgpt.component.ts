import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface cacheEntry {
  left: number;
  top: number;
}

@Component({
  selector: 'app-js-drag-and-drop-chatgpt',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './js-drag-and-drop-chatgpt.component.html',
  styleUrls: ['./js-drag-and-drop-chatgpt.component.scss'],
})
export class JsDragAndDropComponentChatGpt implements AfterViewInit {
  @Input() dragImages?: string[];
  @Input() dropImage?: string;
  @Input() gizmoInstance?: number;

  @ViewChildren('draggablElements')
  draggableComponentRefs?: QueryList<ElementRef>;
  @ViewChild('droppableElement', { static: true }) droppableElementRef:
    | ElementRef
    | undefined;

  draggableElementRef?: ElementRef; // dynamically set to the current dragged element

  offsetX: number = -1;
  offsetY: number = -1;
  isDragging = false;

  _cache: { [id: string]: cacheEntry } = {};

  draggableElements?: HTMLElement[] = [];

  draggableElement?: HTMLElement;
  droppableElement?: HTMLElement;

  constructor() {}

  ngAfterViewInit(): void {
    if (this.draggableComponentRefs) {
      this.draggableComponentRefs.forEach((elemRef: ElementRef) => {
        const elem = elemRef.nativeElement as HTMLElement;
        elem.addEventListener('dragstart', this.dragstart.bind(this));
        elem.addEventListener('drag', this.drag.bind(this));
        this.draggableElements?.push(elem);
      });
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

  // ==========================================================================
  // Events on the draggable part ...
  // ==========================================================================

  dragstart(e: any) {
    this.draggableElement = e.currentTarget;

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

      const data = this.draggableElement.getAttribute('data-image');

      if (data) {
        this._cache[data] = {
          left: x,
          top: y,
        };
      }
    }
  }

  // ==========================================================================
  // Events on the droppable part ...
  // ==========================================================================

  allowDrop(e: any) {
    e.preventDefault();
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

  // ==========================================================================
  // Events on the buttons ...
  // ==========================================================================

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

    const storedCache = localStorage.getItem(`${this.gizmoInstance}-cache`);
    if (storedCache) {
      this._cache = JSON.parse(storedCache);
    }

    // - loop over the _cache
    Object.keys(this._cache).forEach((key: string) => {
      const draggableElem = this.draggableElements?.find(
        (elem: HTMLElement) => elem.getAttribute('data-image') === key
      );
      if (draggableElem) {
        draggableElem.style.left = this._cache[key].left + 'px';
        draggableElem.style.top = this._cache[key].top + 'px';
      }
    });

    // - for each one, locate the draggable object by the image key value
    // - set the Left and Top string values from the _cache entries
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

      localStorage.setItem(
        `${this.gizmoInstance}-cache`,
        JSON.stringify(this._cache, null, 2)
      );

      console.log(`Position: left ${leftPosition}, top ${topPosition}`);
    }
  }
}
