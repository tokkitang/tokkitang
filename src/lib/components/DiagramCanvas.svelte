<script lang="ts">
	import { onMount } from 'svelte';
	import Konva from 'konva';
	import { makeInputText } from '../utils/konva/makeInputText';
	import type { Entity } from '$lib/types/Entity';
	import type { Note } from '$lib/types/Note';
	import { createNote } from '../api/note/create-note';
	import { page } from '$app/stores';
	import { updateNote } from '../api/note/update-note';
	import { Renderer } from '../utils/konva/renderer';
	import { ENTITY } from '../constants/entity';
	import { NOTE } from '../constants/note';

	export const accessToken: string = $page.data.accessToken;
	export const projectId: string = $page.data.projectId;

	export let renderer: Renderer;

	export let entityList: Entity[];
	export let noteList: Note[];
	export let width: number | null;
	export let height: number | null;

	let stage: Konva.Stage;
	let layer: Konva.Layer;

	const entityMap: Map<string, Konva.Rect> = new Map();
	const noteMap: Map<string, Konva.Rect> = new Map();

	onMount(() => {
		stage = new Konva.Stage({
			container: 'canvas',
			width: width ?? window.innerWidth,
			height: height ?? window.innerHeight
		});

		// add canvas element
		layer = new Konva.Layer();
		stage.add(layer);

		renderer = new Renderer(stage, layer);
		renderer.setOnNoteDragEnd((note) => {
			updateNote(accessToken, note);
		});

		noteList.map((note) => renderer.renderNote(note));
	});

	export async function createEntity() {
		// create shape

		const newEntityGroup = new Konva.Group({
			x: ENTITY.POSITION.DEFAULT_START_X,
			y: ENTITY.POSITION.DEFAULT_START_Y,
			draggable: true
		});

		const titleRowGroup = new Konva.Group({
			x: ENTITY.POSITION.DEFAULT_START_X,
			y: ENTITY.POSITION.DEFAULT_START_Y
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
			stage,
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
				x: ENTITY.POSITION.DEFAULT_START_X,
				y: ENTITY.POSITION.DEFAULT_START_Y - 30,
				text: '+',
				fontFamily: 'Calibri',
				fontSize: 25,
				padding: 2,
				fill: 'black'
			})
		);

		addRowButton.on('click', () => {
			addRowToEntity(newEntityGroup);
		});

		newEntityGroup.add(addRowButton);

		layer.add(newEntityGroup);

		// TODO: 서버 연동시에는 서버에서 생성된 id를 받아와야 함
		// const entityId = Date.now().toString();

		// entityMap.set(entityId, newEntity);
	}

	// 엔티티에 행 추가
	export function addRowToEntity(entityGroup: Konva.Group) {
		const rowCount = entityGroup.getChildren().length;

		console.log(rowCount);

		const startX = ENTITY.POSITION.DEFAULT_START_X;
		const startY = ENTITY.TITLE_ROW.DEFAULT_HEIGHT + rowCount * ENTITY.ROW.DEFAULT_HEIGHT;

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
			stage,
			new Konva.Text({
				width: ENTITY.ROW.DEFAULT_WIDTH,
				height: ENTITY.ROW.DEFAULT_HEIGHT,
				text: 'Empty',
				fill: 'white',
				fontSize: ENTITY.ROW.DEFAULT_FONT_SIZE
			}),
			(foo) => console.log('text changed')
		);

		newRowGroup.add(text);

		entityGroup.add(newRowGroup);
	}

	// 노트 하나를 생성하고, 서버에 저장, 화면에 렌더링합니다.
	export async function newNote() {
		const x = NOTE.DEFAULT_START_X.toString();
		const y = NOTE.DEFAULT_START_Y.toString();
		const content = 'Empty';

		const createNoteResponse = await createNote(accessToken, projectId, content, x, y);
		const noteId = createNoteResponse.note_id;

		const note: Note = {
			id: noteId,
			content: content,
			x,
			y
		};

		await renderer.renderNote(note);
	}
</script>

<main class="split">
	<div class="left">
		<button on:click={createEntity} class="left-button">Create Entity</button>
		<button on:click={newNote} class="left-button">Create Note</button>
	</div>
	<div class="right">
		<div id="canvas" />
	</div>
</main>

<style>
	.split {
		display: flex;
		flex-direction: row;
		overflow: auto;
	}

	.left {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
	}

	.right {
		flex-grow: 1;
	}

	.left-button {
		display: grey;
		width: 80px;
		height: 70px;
		padding: 10px;
		border: none;
		border-radius: 5px;
		background-color: grey;
		color: #fff;
		font-size: 16px;
		cursor: pointer;
		transition: background-color 0.2s ease-in-out;
		margin: 5px;
	}
</style>
