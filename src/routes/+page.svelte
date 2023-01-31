<script>
	import DiagramCanvas from '$lib/components/DiagramCanvas.svelte';
</script>

<h1 class="text-3xl font-bold underline">Hello world!</h1>
<DiagramCanvas />

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}
</style>
