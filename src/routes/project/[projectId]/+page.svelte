<script lang="ts">
	import { isLoading } from '../../../lib/store';
	import DiagramCanvas from '$lib/components/DiagramCanvas.svelte';
	import type { Entity } from '$lib/types/Entity';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import type { Note } from '$lib/types/Note';

	export let entityList: Entity[] = $page.data.entityList;
	export let noteList: Note[] = $page.data.noteList;

	onMount(() => {});

	export async function create() {
		try {
		} catch (error) {
			console.error(error);
		}
	}
</script>

<main class="container">
	<DiagramCanvas width={null} height={null} {entityList} {noteList} />
</main>

<style>
</style>
