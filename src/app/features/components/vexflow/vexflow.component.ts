import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as vexflow from 'vexflow';
import { Vex } from 'vexflow';
import { Factory } from 'vexflow';

@Component({
  selector: 'app-vexflow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vexflow.component.html',
  styleUrls: ['./vexflow.component.scss'],
})
export class VexflowComponent implements OnInit {
  public VF: any;

  // const VF = vexflow.Flow;
  // var theDiv = document.getElementById('boo');
  // var renderer = new VF.Renderer(
  //   theDiv as HTMLElement,
  //   VF.Renderer.Backends.SVG
  // );

  ngOnInit() {
    this.easyScore();
    this.nativeAPI();
  }

  easyScore() {
    const vf = new Factory({
      renderer: { elementId: 'easy-score', width: 500, height: 200 },
    });

    const score = vf.EasyScore();
    const system = vf.System();

    system
      .addStave({
        voices: [
          score.voice(score.notes('C#5/q, B4, A4, G#4', { stem: 'up' })),
          score.voice(score.notes('C#4/h, C#4', { stem: 'down' })),
        ],
      })
      .addClef('treble')
      .addTimeSignature('4/4');

    vf.draw();
  }

  nativeAPI() {
    var div = document.getElementById('native-api');
    this.VF = Vex.Flow;

    var renderer = new this.VF.Renderer(div, this.VF.Renderer.Backends.SVG);
    renderer.resize(500, 500);

    var context = renderer.getContext();
    context.setFont('Arial', 10, '').setBackgroundFillStyle('#eed');

    var stave = new this.VF.Stave(10, 40, 400);

    stave.addClef('treble').addTimeSignature('4/4');

    // add other stuff in here! ...

    stave.setContext(context).draw();
  }
}
