<script lang="ts">
	import { movePage } from '../../../lib/utils/movePage';
	import { isLoading } from '../../../lib/store';
	import DiagramCanvas from '$lib/components/DiagramCanvas.svelte';

	export async function create() {
		try {
		} catch (error) {
			console.error(error);
		}
	}
</script>

<main class="container">
	<DiagramCanvas />
</main>

<style>
</style>
