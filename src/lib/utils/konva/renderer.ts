import Konva from 'konva';
import { ENTITY } from '../../constants/entity';
import { NOTE } from '../../constants/note';
import type { Column, Entity } from '../../types/Entity';
import type { Note } from '../../types/Note';
import { makeInputText } from './makeInputText';

export type OnNoteDragEnd = (note: Note) => void;
export type OnEntityDragEnd = (entity: Entity) => void;
export type OnAddRowButtonClicked = () => void;

export class Renderer {
	private stage: Konva.Stage;
	private layer: Konva.Layer;
	private onNoteDragEnd: OnNoteDragEnd | null = null;
	private onEntityDragEnd: OnEntityDragEnd | null = null;
	private onAddRowButtonClicked: OnAddRowButtonClicked | null = null;

	constructor(stage: Konva.Stage, layer: Konva.Layer) {
		this.stage = stage;
		this.layer = layer;
	}

	async setOnNoteDragEnd(callback: OnNoteDragEnd) {
		this.onNoteDragEnd = callback;
	}

	async setOnAddRowButtonClicked(callback: OnAddRowButtonClicked) {
		this.onAddRowButtonClicked = callback;
	}

	async setOnEntityDragEnd(callback: OnEntityDragEnd) {
		this.onEntityDragEnd = callback;
	}

	async renderNote(note: Note): Promise<Konva.Group> {
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

		return newNoteGroup;
	}

	async renderEntity(entity: Entity): Promise<Konva.Group> {
		const x = Number(entity.x);
		const y = Number(entity.y);

		const newEntityGroup = new Konva.Group({
			x,
			y,
			draggable: true
		});

		newEntityGroup.on('dragend', () => {
			entity.x = newEntityGroup.x().toString();
			entity.y = newEntityGroup.y().toString();
			this.onEntityDragEnd?.(entity);
		});

		const titleRowGroup = new Konva.Group({
			x,
			y
		});

		titleRowGroup.add(
			new Konva.Rect({
				width: ENTITY.ROW.DEFAULT_WIDTH,
				height: ENTITY.ROW.DEFAULT_HEIGHT,
				fill: ENTITY.TITLE_ROW.DEFAULT_COLOR,
				stroke: ENTITY.TITLE_ROW.DEFAULT_STROKE_COLOR,
				strokeWidth: ENTITY.TITLE_ROW.DEFAULT_STROKE_WIDTH
			})
		);

		const entityNameText = makeInputText(
			this.stage,
			new Konva.Text({
				width: ENTITY.ROW.DEFAULT_WIDTH,
				height: ENTITY.ROW.DEFAULT_HEIGHT,
				text: 'Empty',
				fill: 'white',
				fontSize: ENTITY.ROW.DEFAULT_FONT_SIZE
			}),
			() => {}
		);

		titleRowGroup.add(entityNameText);

		newEntityGroup.add(titleRowGroup);

		const addRowButton = new Konva.Label({
			opacity: 0.75
		});
		addRowButton.add(
			new Konva.Text({
				x,
				y: y - 30,
				text: '+',
				fontFamily: 'Calibri',
				fontSize: 25,
				padding: 2,
				fill: 'black'
			})
		);

		addRowButton.on('click', () => {
			this.onAddRowButtonClicked?.();
		});

		newEntityGroup.add(addRowButton);

		this.layer.add(newEntityGroup);

		return newEntityGroup;
	}
}
