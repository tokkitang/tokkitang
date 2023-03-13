<script lang="ts">
	import GithubLogin from '../../lib/components/GithubLogin.svelte';
	import Login from '../../lib/components/Login.svelte';
</script>

<div class="text-column">
	<hr />

	<Login />

	<hr />

	<GithubLogin
		href="https://github.com/login/oauth/authorize?client_id=09c53661153af8c5b13c&redirect_uri=https://ksauqt5f5er2djql3atquzas4e0ofpla.lambda-url.ap-northeast-2.on.aws/redirect/github"
		buttonText="Login with Github"
	/>
</div>

<style>
</style>
