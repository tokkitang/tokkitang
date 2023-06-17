import Konva from 'konva';
import { ENTITY } from '../../constants/entity';
import { NOTE } from '../../constants/note';
import type { Column, Entity } from '../../types/Entity';
import type { Note } from '../../types/Note';
import { makeInputText } from './makeInputText';
import { v4 as uuidv4 } from 'uuid';

export type OnNoteChanged = (note: Note) => void | Promise<void>;
export type OnEntityChanged = (entity: Entity) => void | Promise<void>;

export class Renderer {
	private stage: Konva.Stage | undefined;
	private layer: Konva.Layer | undefined;
	private onNoteChanged: OnNoteChanged | null = null;
	private onEntityChanged: OnEntityChanged | null = null;

	constructor() {}

	init(stage: Konva.Stage, layer: Konva.Layer) {
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

		const noteText = makeInputText({
			stage: this.stage!,
			textNode: new Konva.Text({
				width: NOTE.INPUT.DEFAULT_WIDTH,
				height: NOTE.INPUT.DEFAULT_HEIGHT,
				text: note.content,
				fill: 'white',
				fontSize: NOTE.INPUT.DEFAULT_FONT_SIZE
			}),
			editCallback: (editText) => {
				note.content = editText;
				this.onNoteChanged?.(note);
			}
		});

		newNoteGroup.add(noteText);

		this.layer?.add(newNoteGroup);

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

		// Left side
		titleRowGroup.add(
			new Konva.Rect({
				x: 0,
				width: Math.floor(ENTITY.ROW.DEFAULT_WIDTH / 2),
				height: ENTITY.ROW.DEFAULT_HEIGHT,
				fill: ENTITY.TITLE_ROW.DEFAULT_COLOR,
				stroke: ENTITY.TITLE_ROW.DEFAULT_STROKE_COLOR,
				strokeWidth: ENTITY.TITLE_ROW.DEFAULT_STROKE_WIDTH
			})
		);

		titleRowGroup.add(
			makeInputText({
				stage: this.stage!,
				textNode: new Konva.Text({
					x: 0 + ENTITY.TITLE_ROW.DEFAULT_STROKE_WIDTH,
					y: 0 + ENTITY.TITLE_ROW.DEFAULT_STROKE_WIDTH,
					width: Math.floor(ENTITY.ROW.DEFAULT_WIDTH / 2),
					height: ENTITY.ROW.DEFAULT_HEIGHT,
					text: entity.logical_name,
					fill: 'white',
					fontSize: ENTITY.ROW.DEFAULT_FONT_SIZE
				}),
				editCallback: (editText) => {
					entity.physical_name = editText;
					this.onEntityChanged?.(entity);
				}
			})
		);

		// Right side
		titleRowGroup.add(
			new Konva.Rect({
				x: Math.floor(ENTITY.ROW.DEFAULT_WIDTH / 2),
				width: Math.floor(ENTITY.ROW.DEFAULT_WIDTH / 2),
				height: ENTITY.ROW.DEFAULT_HEIGHT,
				fill: ENTITY.TITLE_ROW.DEFAULT_COLOR,
				stroke: ENTITY.TITLE_ROW.DEFAULT_STROKE_COLOR,
				strokeWidth: ENTITY.TITLE_ROW.DEFAULT_STROKE_WIDTH
			})
		);

		titleRowGroup.add(
			makeInputText({
				stage: this.stage!,
				textNode: new Konva.Text({
					x: Math.floor(ENTITY.ROW.DEFAULT_WIDTH / 2),
					width: Math.floor(ENTITY.ROW.DEFAULT_WIDTH / 2),
					height: ENTITY.ROW.DEFAULT_HEIGHT,
					text: entity.physical_name,
					fill: 'white',
					fontSize: ENTITY.ROW.DEFAULT_FONT_SIZE
				}),
				editCallback: (editText) => {
					entity.physical_name = editText;
					this.onEntityChanged?.(entity);
				}
			})
		);

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
			console.log('addRowButton clicked');
			this.addColumnToEntity(entity);
			this.renderEntityColumn(newEntityGroup, entity, entity.columns.length - 1);
			this.onEntityChanged?.(entity);
		});

		newEntityGroup.add(addRowButton);

		this.layer?.add(newEntityGroup);

		// columns rendering
		let i = 0;
		for (const _column of entity.columns) {
			await this.renderEntityColumn(newEntityGroup, entity, i);
			i += 1;
		}

		return newEntityGroup;
	}

	async renderEntityColumn(entityGroup: Konva.Group, entity: Entity, index: number) {
		const column = entity.columns[index];

		const rowCount = entityGroup.getChildren().length;

		const logicalNameWidth = Math.floor(ENTITY.ROW.DEFAULT_WIDTH / 5);
		const physicalNameWidth = Math.floor(ENTITY.ROW.DEFAULT_WIDTH / 5);
		const typeWidth = Math.floor(ENTITY.ROW.DEFAULT_WIDTH / 5);
		const notNullWidth = Math.floor(ENTITY.ROW.DEFAULT_WIDTH / 5);
		const commentWidth = Math.floor(ENTITY.ROW.DEFAULT_WIDTH / 5);

		let startX = 0;
		const startY = (rowCount - 1) * ENTITY.ROW.DEFAULT_HEIGHT;

		const newRowGroup = new Konva.Group({
			x: startX,
			y: startY
		});

		// Logical name
		newRowGroup.add(
			new Konva.Rect({
				x: startX,
				width: logicalNameWidth,
				height: ENTITY.ROW.DEFAULT_HEIGHT,
				fill: 'black',
				stroke: ENTITY.ROW.DEFAULT_STROKE_COLOR,
				strokeWidth: ENTITY.ROW.DEFAULT_STROKE_WIDTH
			})
		);

		newRowGroup.add(
			makeInputText({
				stage: this.stage!,
				textNode: new Konva.Text({
					width: logicalNameWidth,
					height: ENTITY.ROW.DEFAULT_HEIGHT,
					text: column.logical_name,
					fill: 'white',
					fontSize: ENTITY.ROW.DEFAULT_FONT_SIZE
				}),
				editCallback: (editText) => {
					column.logical_name = editText;
					entity.columns[index] = column;
					this.onEntityChanged?.(entity);
				}
			})
		);

		entityGroup.add(newRowGroup);
		startX += logicalNameWidth;

		// Physical name
		newRowGroup.add(
			new Konva.Rect({
				x: startX,
				width: physicalNameWidth,
				height: ENTITY.ROW.DEFAULT_HEIGHT,
				fill: 'black',
				stroke: ENTITY.ROW.DEFAULT_STROKE_COLOR,
				strokeWidth: ENTITY.ROW.DEFAULT_STROKE_WIDTH
			})
		);

		newRowGroup.add(
			makeInputText({
				stage: this.stage!,
				textNode: new Konva.Text({
					x: startX,
					width: physicalNameWidth,
					height: ENTITY.ROW.DEFAULT_HEIGHT,
					text: column.physical_name,
					fill: 'white',
					fontSize: ENTITY.ROW.DEFAULT_FONT_SIZE
				}),
				editCallback: (editText) => {
					column.physical_name = editText;
					entity.columns[index] = column;
					this.onEntityChanged?.(entity);
				}
			})
		);

		entityGroup.add(newRowGroup);
		startX += physicalNameWidth;

		// type
		newRowGroup.add(
			new Konva.Rect({
				x: startX,
				width: typeWidth,
				height: ENTITY.ROW.DEFAULT_HEIGHT,
				fill: 'black',
				stroke: ENTITY.ROW.DEFAULT_STROKE_COLOR,
				strokeWidth: ENTITY.ROW.DEFAULT_STROKE_WIDTH
			})
		);

		newRowGroup.add(
			makeInputText({
				stage: this.stage!,
				textNode: new Konva.Text({
					x: startX,
					width: typeWidth,
					height: ENTITY.ROW.DEFAULT_HEIGHT,
					text: column.data_type,
					fill: 'white',
					fontSize: ENTITY.ROW.DEFAULT_FONT_SIZE
				}),
				editCallback: (editText) => {
					column.data_type = editText;
					entity.columns[index] = column;
					this.onEntityChanged?.(entity);
				}
			})
		);

		entityGroup.add(newRowGroup);
		startX += typeWidth;

		// not null
		newRowGroup.add(
			new Konva.Rect({
				x: startX,
				width: typeWidth,
				height: ENTITY.ROW.DEFAULT_HEIGHT,
				fill: 'black',
				stroke: ENTITY.ROW.DEFAULT_STROKE_COLOR,
				strokeWidth: ENTITY.ROW.DEFAULT_STROKE_WIDTH
			})
		);

		newRowGroup.add(
			makeInputText({
				stage: this.stage!,
				textNode: new Konva.Text({
					x: startX,
					width: notNullWidth,
					height: ENTITY.ROW.DEFAULT_HEIGHT,
					text: column.nullable ? 'Allow Null' : 'Not Null',
					fill: 'white',
					fontSize: ENTITY.ROW.DEFAULT_FONT_SIZE
				}),
				editCallback: (editText) => {
					column.nullable = !!editText; // TODO: change to boolean checkbox
					entity.columns[index] = column;
					this.onEntityChanged?.(entity);
				}
			})
		);

		entityGroup.add(newRowGroup);
		startX += notNullWidth;

		// comment
		newRowGroup.add(
			new Konva.Rect({
				x: startX,
				width: commentWidth,
				height: ENTITY.ROW.DEFAULT_HEIGHT,
				fill: 'black',
				stroke: ENTITY.ROW.DEFAULT_STROKE_COLOR,
				strokeWidth: ENTITY.ROW.DEFAULT_STROKE_WIDTH
			})
		);

		newRowGroup.add(
			makeInputText({
				stage: this.stage!,
				textNode: new Konva.Text({
					x: startX,
					width: commentWidth,
					height: ENTITY.ROW.DEFAULT_HEIGHT,
					text: column.comment,
					fill: 'white',
					fontSize: ENTITY.ROW.DEFAULT_FONT_SIZE
				}),
				editCallback: (editText) => {
					column.comment = editText;
					entity.columns[index] = column;
					this.onEntityChanged?.(entity);
				}
			})
		);

		entityGroup.add(newRowGroup);
		startX += commentWidth;
	}

	// 엔티티에 행 추가
	addColumnToEntity(entity: Entity) {
		const column: Column = {
			id: uuidv4(),
			logical_name: 'logical',
			physical_name: 'physical',
			comment: 'comment',
			data_type: 'type',
			nullable: false,
			is_primary_key: false,
			default_value: ''
		};

		entity.columns.push(column);
	}
}
