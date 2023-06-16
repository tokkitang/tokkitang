<script lang="ts">
	import { onMount } from 'svelte';
	import Konva from 'konva';
	import { makeInputText } from '../utils/konva/makeInputText';
	import type { Column, Entity } from '$lib/types/Entity';
	import type { Note } from '$lib/types/Note';
	import { createNote } from '../api/note/create-note';
	import { page } from '$app/stores';
	import { updateNote } from '../api/note/update-note';
	import { Renderer } from '../utils/konva/renderer';
	import { ENTITY } from '../constants/entity';
	import { NOTE } from '../constants/note';
	import { createEntity } from '../api/entity/create-entity';
	import { updateEntity } from '../api/entity/update-entity';

	export const accessToken: string = $page.data.accessToken;
	export const projectId: string = $page.data.projectId;

	export let renderer: Renderer = new Renderer();

	export let entityList: Entity[];
	export let noteList: Note[];
	export let width: number | null;
	export let height: number | null;

	let stage: Konva.Stage;
	let layer: Konva.Layer;

	const entityMap: Map<string, [Entity, Konva.Group]> = new Map();
	const noteMap: Map<string, [Note, Konva.Group]> = new Map();

	onMount(async () => {
		stage = new Konva.Stage({
			container: 'canvas',
			width: width ?? window.innerWidth,
			height: height ?? window.innerHeight
		});

		layer = new Konva.Layer();
		stage.add(layer);

		renderer.init(stage, layer);
		renderer.setOnNoteChanged((note) => {
			updateNote(accessToken, note);
		});
		renderer.setOnEntityChanged((entity) => {
			updateEntity(accessToken, entity);
		});

		noteList.map((note) => renderer.renderNote(note));
		entityList.map((entity) => renderer.renderEntity(entity));
	});

	export async function newEntity() {
		const x = ENTITY.POSITION.DEFAULT_START_X.toString();
		const y = ENTITY.POSITION.DEFAULT_START_Y.toString();
		const comment = '';
		const logical_name = 'logical_name';
		const physical_name = 'physical_name';
		const columns: Column[] = [];

		const createEntityResponse = await createEntity(
			accessToken,
			projectId,
			logical_name,
			physical_name,
			comment,
			columns,
			x,
			y
		);
		const entityId = createEntityResponse.entity_id;

		const entity: Entity = {
			id: entityId,
			logical_name,
			physical_name,
			comment,
			columns,
			x,
			y
		};

		const newGroup = await renderer.renderEntity(entity);
		entityMap.set(entityId, [entity, newGroup]);
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

		const newGroup = await renderer.renderNote(note);
		noteMap.set(noteId, [note, newGroup]);
	}
</script>

<main class="split">
	<div class="left">
		<button on:click={newEntity} class="left-button">New Entity</button>
		<button on:click={newNote} class="left-button">New Note</button>
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
