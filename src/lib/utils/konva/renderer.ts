import Konva from 'konva';
import { ENTITY } from '../../constants/entity';
import { NOTE } from '../../constants/note';
import type { Column, Entity } from '../../types/Entity';
import type { Note } from '../../types/Note';
import { makeInputText } from './makeInputText';

export type OnNoteChanged = (note: Note) => void | Promise<void>;
export type OnEntityChanged = (entity: Entity) => void | Promise<void>;

export class Renderer {
	private stage: Konva.Stage;
	private layer: Konva.Layer;
	private onNoteChanged: OnNoteChanged | null = null;
	private onEntityChanged: OnEntityChanged | null = null;

	constructor(stage: Konva.Stage, layer: Konva.Layer) {
		this.stage = stage;
		this.layer = layer;
	}

	async setOnNoteChanged(callback: OnNoteChanged) {
		this.onNoteChanged = callback;
	}

	async setOnEntityChanged(callback: OnEntityChanged) {
		this.onEntityChanged = callback;
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
			console.log('note.x', note.x);
			console.log('note.y', note.y);
			this.onNoteChanged?.(note);
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
				this.onNoteChanged?.(note);
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
			console.log('entity.x', entity.x);
			console.log('entity.y', entity.y);
			this.onEntityChanged?.(entity);
		});

		const titleRowGroup = new Konva.Group({
			x: 0,
			y: 0
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
			(editText) => {
				entity.physical_name = editText;
				this.onEntityChanged?.(entity);
			}
		);

		titleRowGroup.add(entityNameText);

		newEntityGroup.add(titleRowGroup);

		const addRowButton = new Konva.Label({
			opacity: 0.75
		});
		addRowButton.add(
			new Konva.Text({
				x: 0,
				y: -30,
				text: '+',
				fontFamily: 'Calibri',
				fontSize: 25,
				padding: 2,
				fill: 'black'
			})
		);

		addRowButton.on('click', () => {
			this.addColumnToEntity(entity);
			this.renderEntityColumn(newEntityGroup, entity, entity.columns.length - 1);
		});

		newEntityGroup.add(addRowButton);

		this.layer.add(newEntityGroup);

		// columns rendering
		let i = 0;
		for (const column of entity.columns) {
			await this.renderEntityColumn(newEntityGroup, entity, i);
			i += 1;
		}

		return newEntityGroup;
	}

	async renderEntityColumn(entityGroup: Konva.Group, entity: Entity, index: number) {
		const column = entity.columns[index];

		const rowCount = entityGroup.getChildren().length;

		const startX = 0;
		const startY = (rowCount - 1) * ENTITY.ROW.DEFAULT_HEIGHT;

		const newRowGroup = new Konva.Group({
			x: startX,
			y: startY
		});

		newRowGroup.add(
			new Konva.Rect({
				width: ENTITY.ROW.DEFAULT_WIDTH,
				height: ENTITY.ROW.DEFAULT_HEIGHT,
				fill: 'black',
				stroke: 'black',
				strokeWidth: 4
			})
		);

		const text = makeInputText(
			this.stage,
			new Konva.Text({
				width: ENTITY.ROW.DEFAULT_WIDTH,
				height: ENTITY.ROW.DEFAULT_HEIGHT,
				text: column.logical_name,
				fill: 'white',
				fontSize: ENTITY.ROW.DEFAULT_FONT_SIZE
			}),
			(editText) => {
				column.logical_name = editText;
				entity.columns[index] = column;
				this.onEntityChanged?.(entity);
			}
		);

		newRowGroup.add(text);

		entityGroup.add(newRowGroup);
	}

	// 엔티티에 행 추가
	addColumnToEntity(entity: Entity) {
		const column: Column = {
			id: '',
			logical_name: 'logical',
			physical_name: 'physical',
			comment: '',
			data_type: '',
			nullable: false,
			is_primary_key: false,
			default_value: ''
		};

		entity.columns.push(column);
	}
}
