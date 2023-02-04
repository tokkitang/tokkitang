<script lang="ts">
	import { onMount } from 'svelte';
	import Konva from 'konva';

	let stage: Konva.Stage;
	let layer: Konva.Layer;

	onMount(() => {
		stage = new Konva.Stage({
			container: 'canvas',
			width: window.innerWidth,
			height: window.innerHeight
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
		var box = new Konva.Rect({
			x: 50,
			y: 50,
			width: 100,
			height: 50,
			fill: '#00D2FF',
			stroke: 'black',
			strokeWidth: 4,
			draggable: true
		});
		layer.add(box);
	}
</script>

<main>
	<button on:click={createEntity}>Create Entity</button>
	<div id="canvas" />
</main>

<style>
</style>
