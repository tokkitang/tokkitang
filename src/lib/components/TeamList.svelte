<script lang="ts">
	import type { Team } from '../types/Team';
	import TeamListItem from './TeamListItem.svelte';

	export let teamList: Team[];
</script>

<div class="teams">
	<h3>My Team List</h3>
	<ul>
		{#each teamList as team}
			<TeamListItem {team} />
		{/each}
	</ul>
</div>

<style>
	.teams {
		margin-bottom: 20px;
	}

	.teams h3 {
		font-size: 20px;
		font-weight: bold;
		margin-bottom: 20px;
	}

	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
</style>
