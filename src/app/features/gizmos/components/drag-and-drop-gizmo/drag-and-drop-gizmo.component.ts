import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';

import { AnswerService } from 'src/app/core/services/answer.service';
import { MatButtonModule } from '@angular/material/button';
import { GizmoType } from 'src/app/core/models/types';

interface cacheEntry {
  left: number;
  top: number;
}

@Component({
  selector: 'app-drag-and-drop-gizmo',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './drag-and-drop-gizmo.component.html',
  styleUrls: ['./drag-and-drop-gizmo.component.scss'],
})
export class DragAndDropGizmoComponent implements AfterViewInit {
  static readonly GizmoType: GizmoType = 'drag-and-drop';

  @Input() dragImages?: string[];
  @Input() dropImage?: string;
  @Input() gizmoInstance?: number;
  @Input() answerData?: any;

  @Output() answerEvent = new EventEmitter<any>();

  @ViewChildren('draggableElements')
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

  constructor(private _answerService: AnswerService) {}

  ngAfterViewInit(): void {
    this.initialiseDisplay();

    if (this.answerData) {
      // add to cache
      this._cache[this.answerData.draggable] = {
        left: this.answerData.leftPosition,
        top: this.answerData.topPosition,
      };
    }

    this.positionDraggables();
  }

  initialiseDisplay() {
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

      const data = this.getImageName(this.draggableElement);

      console.log(`x ${x}, y ${y}`);

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

      // this.storeCurrentDraggable();
    }, 0);
  }

  // ==========================================================================
  // Events on the buttons ...
  // ==========================================================================

  positionDraggables() {
    // const storedCache = localStorage.getItem(`${this.gizmoInstance}-cache`);
    // if (storedCache) {
    //   this._cache = JSON.parse(storedCache);
    // }

    // - loop over the _cache
    Object.keys(this._cache).forEach((key: string) => {
      const draggableElem = this.draggableElements?.find(
        (elem: HTMLElement) => this.getImageName(elem) === key
      );
      if (draggableElem) {
        draggableElem.style.left = this._cache[key].left + 'px';
        draggableElem.style.top = this._cache[key].top + 'px';
      }
    });

    // - for each one, locate the draggable object by the image key value
    // - set the Left and Top string values from the _cache entries
  }

  storeCurrentDraggable() {
    if (this.draggableElement) {
      // Store the position (l
      const leftPosition = parseInt(
        this.draggableElement.style.left || '0',
        10
      );
      const topPosition = parseInt(this.draggableElement.style.top || '0', 10);

      // localStorage.setItem(
      //   `${this.gizmoInstance}-cache`,
      //   JSON.stringify(this._cache, null, 2)
      // );

      console.log(`Position: left ${leftPosition}, top ${topPosition}`);
    }
  }

  getImageName(elem: HTMLElement): string | null {
    if (!elem) {
      return null;
    }

    const filePath = elem.getAttribute('data-image');
    return this.extractImageBase(filePath);
  }

  extractImageBase(filePath: string | null): string {
    const parts = filePath?.split(`/`);

    if (!parts) {
      throw new Error(
        `Trouble extracting image file name from path: ${filePath}`
      );
    }

    return parts[parts?.length - 1];
  }

  answer() {
    if (this.draggableElement) {
      // Store the position (l
      const leftPosition = parseInt(
        this.draggableElement.style.left || '0',
        10
      );
      const topPosition = parseInt(this.draggableElement.style.top || '0', 10);

      const testAnswer = {
        gizmoType: DragAndDropGizmoComponent.GizmoType,
        selection: [
          {
            draggable: this.getImageName(this.draggableElement),
            leftPosition: leftPosition,
            topPosition: topPosition,
          },
        ],
      };

      this.answerEvent.emit(testAnswer);
    }
  }
}
