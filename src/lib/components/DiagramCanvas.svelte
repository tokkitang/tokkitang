<script lang="ts">
	import { onMount } from 'svelte';
	import Konva from 'konva';

	onMount(() => {
		var stage = new Konva.Stage({
			container: 'canvas',
			width: window.innerWidth,
			height: window.innerHeight
		});

		// add canvas element
		var layer = new Konva.Layer();
		stage.add(layer);

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

		// add cursor styling
		box.on('mouseover', function () {
			document.body.style.cursor = 'pointer';
		});
		box.on('mouseout', function () {
			document.body.style.cursor = 'default';
		});
	});
</script>

<main>
	<div id="canvas" />

	<script>
	</script>
</main>

<style>
</style>
