<script lang="ts">
	import teamPlaceholder from '$lib/images/team-placeholder.svg';
	import type { Team } from '../types/Team';

	export let team: Team;
</script>

<li class="team">
	<a class="team" href="/team/{team.id}">
		{#if team.thumbnail_url}
			<img class="team-image" src={team.thumbnail_url} alt="" />
		{:else}
			<img class="team-image" src={teamPlaceholder} alt="" />
		{/if}
		<p class="team-name">{team.name}</p></a
	>
</li>

<style>
	.team {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
	}

	.team-image {
		width: 100px;
		height: 100px;
		object-fit: cover;
		margin-right: 10px;
		border-radius: 20%;
	}

	.team-name {
		font-size: 16px;
	}

	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
</style>
