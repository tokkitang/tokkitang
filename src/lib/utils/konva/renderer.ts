import Konva from 'konva';
import { NOTE } from '../../constants/note';
import type { Note } from '../../types/Note';
import { makeInputText } from './makeInputText';

export type OnNoteDragEnd = (note: Note) => void;

export class Renderer {
	private stage: Konva.Stage;
	private layer: Konva.Layer;
	private onNoteDragEnd: OnNoteDragEnd | null = null;

	constructor(stage: Konva.Stage, layer: Konva.Layer) {
		this.stage = stage;
		this.layer = layer;
	}

	async setOnNoteDragEnd(callback: OnNoteDragEnd) {
		this.onNoteDragEnd = callback;
	}

	async renderNote(note: Note) {
		const newNoteGroup = new Konva.Group({
			x: Number(note.x),
			y: Number(note.y),
			draggable: true
		});

		newNoteGroup.on('dragend', () => {
			note.x = newNoteGroup.x().toString();
			note.y = newNoteGroup.y().toString();
			this.onNoteDragEnd?.(note);
		});

		newNoteGroup.add(
			new Konva.Rect({
				width: NOTE.DEFAULT_WIDTH,
				height: NOTE.DEFAULT_HEIGHT,
				fill: NOTE.DEFAULT_COLOR,
				stroke: NOTE.DEFAULT_STROKE_COLOR,
				strokeWidth: NOTE.DEFAULT_STROKE_WIDTH
			})
		);

		const noteText = makeInputText(
			this.stage,
			new Konva.Text({
				width: NOTE.INPUT.DEFAULT_WIDTH,
				height: NOTE.INPUT.DEFAULT_HEIGHT,
				text: note.content,
				fill: 'white',
				fontSize: NOTE.INPUT.DEFAULT_FONT_SIZE
			}),
			(editText) => {
				note.content = editText;
				this.onNoteDragEnd?.(note);
			}
		);

		newNoteGroup.add(noteText);

		this.layer.add(newNoteGroup);
	}
}
