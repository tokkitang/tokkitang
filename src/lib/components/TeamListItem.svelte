<script lang="ts">
	import teamPlaceholder from '$lib/images/team-placeholder.svg';
	import type { Team } from '../types/Team';

	export let team: Team;
</script>

<li class="team">
	{#if team.thumbnail_url}
		<img class="team-image" src={team.thumbnail_url} alt="" />
	{:else}
		<img class="team-image" src={teamPlaceholder} alt="" />
	{/if}
	<p class="team-name">{team.name}</p>
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
	}

	.team-name {
		font-size: 16px;
	}
</style>
