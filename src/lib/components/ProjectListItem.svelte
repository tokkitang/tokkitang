<script lang="ts">
	import projectPlaceholder from '$lib/images/project-placeholder.svg';
	import type { Project } from '../types/Project';

	export let project: Project;
</script>

<li class="project">
	<a class="project" href="/project/{project.id}">
		{#if project.thumbnail_url}
			<img class="project-image" src={project.thumbnail_url} alt="" />
		{:else}
			<img class="project-image" src={projectPlaceholder} alt="" />
		{/if}
		<p class="project-name">{project.name}</p></a
	>
</li>

<style>
	.project {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
	}

	.project-image {
		width: 100px;
		height: 100px;
		object-fit: cover;
		margin-right: 10px;
		border-radius: 20%;
	}

	.project-name {
		font-size: 16px;
	}

	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
</style>
