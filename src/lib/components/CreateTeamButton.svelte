<script lang="ts">
	import { movePage } from '../utils/movePage';

	export async function onClicked() {
		try {
			movePage('/team/new');
		} catch (error) {
			console.error(error);
		}
	}
</script>

<div class="teams">
	<button on:click={onClicked}>new Team</button>
</div>

<style>
	button {
		display: block;
		width: 100%;
		padding: 10px;
		border: none;
		border-radius: 5px;
		background-color: #333;
		color: #fff;
		font-size: 16px;
		cursor: pointer;
		transition: background-color 0.2s ease-in-out;
	}
</style>
