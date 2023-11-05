import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as vexflow from 'vexflow';
import { Vex } from 'vexflow';
import { Factory } from 'vexflow';
import { StaveNote } from 'vexflow';
import { Formatter } from 'vexflow';
import { Renderer } from 'vexflow';
import { Stave } from 'vexflow';
import { Voice } from 'vexflow';

@Component({
  selector: 'app-vexflow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vexflow.component.html',
  styleUrls: ['./vexflow.component.scss'],
})
export class VexflowComponent implements OnInit {
  public VF: any;

  renderer: any;
  context: any;
  stave: any;

  ngOnInit() {
    this.tutorial();
    this.easyScore();
    this.nativeAPI();
  }

  tutorial() {
    this.tutorialBoilerplate();
    this.tutorialStep1();
    this.tutorialStep2();
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
    const div = document.getElementById('native-api');
    this.VF = Vex.Flow;

    const renderer = new this.VF.Renderer(div, this.VF.Renderer.Backends.SVG);
    renderer.resize(500, 500);

    const context = renderer.getContext();
    context.setFont('Arial', 10, '').setBackgroundFillStyle('#eed');

    const stave = new this.VF.Stave(10, 40, 400);
    stave.addClef('treble').addTimeSignature('4/4');

    // add other stuff in here! ...

    stave.setContext(context).draw();
  }

  tutorialBoilerplate() {
    // Create an SVG renderer and attach it to the DIV element named "boo".
    const div = document.getElementById('tutorial') as HTMLDivElement;

    if (!div) {
      alert('Did not find the "tutorial" div');
    } else {
      this.renderer = new Renderer(div, Renderer.Backends.SVG);

      // Configure the rendering context.
      this.renderer.resize(500, 200);
      this.context = this.renderer.getContext();
    }
  }

  tutorialStep1() {
    // Create a stave of width 400 at position 10, 40 on the canvas.
    this.stave = new Stave(10, 40, 400);

    // Add a clef and time signature.
    this.stave.addClef('treble').addTimeSignature('4/4');

    // Connect it to the rendering context and draw!
    this.stave.setContext(this.context).draw();
  }

  tutorialStep2() {
    // Create the notes
    const notes = [
      // A quarter-note C.
      new StaveNote({ keys: ['c/4'], duration: 'q' }),

      // A quarter-note D.
      new StaveNote({ keys: ['d/4'], duration: 'q' }),

      // A quarter-note rest. Note that the key (b/4) specifies the vertical
      // position of the rest.
      new StaveNote({ keys: ['b/4'], duration: 'qr' }),

      // A C-Major chord.
      new StaveNote({ keys: ['c/4', 'e/4', 'g/4'], duration: 'q' }),
    ];

    // Create a voice in 4/4 and add above notes
    const voice = new Voice({ num_beats: 4, beat_value: 4 });
    voice.addTickables(notes);

    // Format and justify the notes to 400 pixels.
    new Formatter().joinVoices([voice]).format([voice], 350);

    // Render voice
    voice.draw(this.context, this.stave);
  }
}
