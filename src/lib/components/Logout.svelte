<script lang="ts">
	import { movePage } from '../utils/movePage';
	import { deleteCookie } from '../utils/cookie';

	export async function doLogout() {
		deleteCookie('access_token');
		movePage('/');
	}
</script>

<main class="container">
	<button on:click={doLogout}>logout</button>
</main>

<style>
	.container {
		overflow: hidden;
	}

	button {
		background-color: #808080;
		color: #fff;
		border: none;
		padding: 10px 20px;
		border-radius: 5px;
		cursor: pointer;
		float: right;
	}
</style>
