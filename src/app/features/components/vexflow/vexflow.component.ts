import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as vexflow from 'vexflow';

@Component({
  selector: 'app-vexflow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vexflow.component.html',
  styleUrls: ['./vexflow.component.scss'],
})
export class VexflowComponent {
  ngOnInit() {
    // const VF = vexflow.Flow;
    // var theDiv = document.getElementById('boo');
    // var renderer = new VF.Renderer(
    //   theDiv as HTMLElement,
    //   VF.Renderer.Backends.SVG
    // );
  }
}
