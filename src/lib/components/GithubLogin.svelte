<script lang="ts">
	export let href: string;
	export let buttonText: string;
</script>

<main>
	<a {href}>
		<svg viewBox="0 0 24 24" fill="currentColor" class="github-icon">
			<path
				d="M12 0a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.4c-3.3.7-4-1.6-4-1.6-.5-1.3-1.2-1.6-1.2-1.6-.9-.6.1-.6.1-.6.8.1 1.2.7 1.2.7.7 1.2 1.9 1 2.4.7.1-.6.4-1.1.6-1.4-2.1-.2-4.3-1.1-4.3-4.9 0-1.1.4-2 1.2-2.7-.1-.2-.5-1.3.1-2.7 0 0 .8-.3 2.7 1a9.8 9.8 0 0 1 5.2 0c1.9-1.3 2.7-1 2.7-1 .6 1.4.2 2.5.1 2.7.8.7 1.2 1.5 1.2 2.7 0 3.8-2.2 4.6-4.3 4.9.3.3.8.8.8 1.8v2.7c0 .3.2.7.9.6A12 12 0 0 0 12 0"
			/>
		</svg>
		{buttonText}
	</a>
</main>

<style>
	.github-icon {
		width: 24px;
		height: 24px;
		margin-right: 5px;
		vertical-align: middle;
	}
	a {
		display: inline-flex;
		align-items: center;
		padding: 10px 20px;
		background-color: #333;
		color: #fff;
		text-decoration: none;
		font-size: 16px;
		border-radius: 5px;
		white-space: nowrap;
	}
	a:hover {
		background-color: #555;
	}
</style>
