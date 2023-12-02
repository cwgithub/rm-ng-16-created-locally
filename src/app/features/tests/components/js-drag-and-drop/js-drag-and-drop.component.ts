import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-js-drag-and-drop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './js-drag-and-drop.component.html',
  styleUrls: ['./js-drag-and-drop.component.scss'],
})
export class JsDragAndDropComponent implements AfterViewInit {
  pos1 = 0;
  pos2 = 0;
  pos3 = 0;
  pos4 = 0;
  item: any;

  constructor() {}

  ngAfterViewInit(): void {
    /* draggable element */
    this.item = document.querySelector('.item');

    this.item?.addEventListener('dragstart', this.dragStart);
    this.item?.addEventListener('drag', this.elementDrag.bind(this));

    /* drop targets */
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
      box.addEventListener('dragenter', this.dragEnter);
      box.addEventListener('dragover', this.dragOver);
      box.addEventListener('dragleave', this.dragLeave);
      box.addEventListener('drop', this.drop);
    });
  }

  closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }

  elementDrag(e: any) {
    e = e || window.event;
    e.preventDefault();

    console.log('===========================');

    // calculate the new cursor position:
    this.pos1 = this.pos3 - e.clientX;
    this.pos2 = this.pos4 - e.clientY;

    console.log(`pos1 ${this.pos1} pos2 ${this.pos2}`);

    this.pos3 = e.clientX;
    this.pos4 = e.clientY;
    console.log(`pos3 ${this.pos3} pos4 ${this.pos4}`);

    // set the element's new position:
    this.item.style.top = this.item.offsetTop - this.pos2 + 'px';
    this.item.style.left = this.item.offsetLeft - this.pos1 + 'px';
    console.log(
      `style.top ${this.item.offsetTop} style.left ${this.item.offsetLeft}`
    );

    console.log(
      `style.top ${this.item.style.top} style.left ${this.item.style.left}`
    );
  }

  // ============================================================
  // ============================================================
  // ============================================================

  dragStart(e: any) {
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => {
      e.target.classList.add('hide');
    }, 0);
  }

  dragEnter(e: any) {
    e.preventDefault();
    e.target.classList.add('drag-over');
  }

  dragOver(e: any) {
    e.preventDefault();
    e.target.classList.add('drag-over');
  }

  dragLeave(e: any) {
    e.target.classList.remove('drag-over');
  }

  drop(e: any) {
    e.target.classList.remove('drag-over');

    // get the draggable element
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);

    // add it to the drop target
    e.target.appendChild(draggable);

    // display the draggable element
    draggable?.classList.remove('hide');
  }

  dragMouseDown(e: any) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    this.pos3 = e.clientX;
    this.pos4 = e.clientY;
    document.onmouseup = this.closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = this.elementDrag.bind(this);
  }
}
