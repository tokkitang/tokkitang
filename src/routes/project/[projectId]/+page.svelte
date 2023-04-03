<script lang="ts">
	import { isLoading } from '../../../lib/store';
	import DiagramCanvas from '$lib/components/DiagramCanvas.svelte';
	import type { Entity } from '$lib/types/Entity';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	export let entityList: Entity[] = $page.data.entityList;

	onMount(() => {});

	export async function create() {
		try {
		} catch (error) {
			console.error(error);
		}
	}
</script>

<main class="container">
	<DiagramCanvas width={null} height={null} {entityList} />
</main>

<style>
</style>
