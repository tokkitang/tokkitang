<script lang="ts">
	import type { Project } from '../types/Project';
	import ProjectListItem from './ProjectListItem.svelte';

	export let projectList: Project[];
</script>

<div class="projects">
	<h3>Project List</h3>
	<ul>
		{#if projectList.length === 0}
			<li>No Projects found</li>
		{/if}
		{#each projectList as project}
			<ProjectListItem {project} />
		{/each}
	</ul>
</div>

<style>
	.projects {
		margin-bottom: 20px;
	}

	.projects h3 {
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
