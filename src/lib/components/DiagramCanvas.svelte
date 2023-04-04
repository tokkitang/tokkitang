<script lang="ts">
	import { onMount } from 'svelte';
	import Konva from 'konva';
	import { makeInputText } from '../utils/konva/makeInputText';
	import type { Entity } from '$lib/types/Entity';
	import type { Note } from '$lib/types/Note';

	export let entityList: Entity[];
	export let noteList: Note[];
	export let width: number | null;
	export let height: number | null;

	let stage: Konva.Stage;
	let layer: Konva.Layer;

	// 엔티티가 스폰되는 시작 위치
	let startX = 50;
	let startY = 50;

	// 엔티티의 첫번째 타이틀 행 정보
	let titleRowHeight = 30;
	let titleRowFontSize = 20;

	// 엔티티 나머지 행의 세로 크기
	let rowHeight = 25;
	let rowFontSize = 17;

	// 엔티티의 기본 가로 크기
	let rowDefaultWidth = 300;

	const NOTE = {
		DEFAULT_WIDTH: 200,
		DEFAULT_HEIGHT: 100,
		DEFAULT_COLOR: 'grey',
		DEFAULT_STROKE_COLOR: 'grey',
		DEFAULT_STROKE_WIDTH: 4
	};

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

		// // add cursor styling
		// box.on('mouseover', function () {
		// 	document.body.style.cursor = 'pointer';
		// });
		// box.on('mouseout', function () {
		// 	document.body.style.cursor = 'default';
		// });
	});

	export async function createEntity() {
		// create shape

		const newEntityGroup = new Konva.Group({
			x: startX,
			y: startY,
			draggable: true
		});

		const titleRowGroup = new Konva.Group({
			x: startX,
			y: startY
		});

		titleRowGroup.add(
			new Konva.Rect({
				width: rowDefaultWidth,
				height: titleRowHeight,
				fill: 'black',
				stroke: 'black',
				strokeWidth: 4
			})
		);

		const entityNameText = makeInputText(
			stage,
			new Konva.Text({
				width: rowDefaultWidth,
				height: titleRowHeight,
				text: 'Empty',
				fill: 'white',
				fontSize: titleRowFontSize
			})
		);

		titleRowGroup.add(entityNameText);

		newEntityGroup.add(titleRowGroup);

		const addRowButton = new Konva.Label({
			opacity: 0.75
		});
		addRowButton.add(
			new Konva.Text({
				x: startX,
				y: startY - 30,
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

		const startY = titleRowHeight + rowCount * rowHeight;

		const newRowGroup = new Konva.Group({
			x: startX,
			y: startY
		});

		newRowGroup.add(
			new Konva.Rect({
				width: rowDefaultWidth,
				height: rowHeight,
				fill: 'black',
				stroke: 'black',
				strokeWidth: 4
			})
		);

		const text = makeInputText(
			stage,
			new Konva.Text({
				width: rowDefaultWidth,
				height: rowHeight,
				text: 'Empty',
				fill: 'white',
				fontSize: rowFontSize
			})
		);

		newRowGroup.add(text);

		entityGroup.add(newRowGroup);
	}

	export async function createNote() {
		// create shape

		const newNoteGroup = new Konva.Group({
			x: startX,
			y: startY,
			draggable: true
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
			stage,
			new Konva.Text({
				width: rowDefaultWidth,
				height: titleRowHeight,
				text: 'Empty',
				fill: 'white',
				fontSize: titleRowFontSize
			})
		);

		newNoteGroup.add(noteText);

		layer.add(newNoteGroup);

		// TODO: 서버 연동시에는 서버에서 생성된 id를 받아와야 함
		// const entityId = Date.now().toString();

		//entityMap.set(entityId, newEntity);
	}
</script>

<main class="split">
	<div class="left">
		<button on:click={createEntity} class="left-button">Create Entity</button>
		<button on:click={createNote} class="left-button">Create Note</button>
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
