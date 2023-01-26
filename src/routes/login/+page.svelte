<script lang="ts">
	import GithubLogin from '../../lib/components/GithubLogin.svelte';
	import Login from '../../lib/components/Login.svelte';
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="text-column">
	<h1>Login Page</h1>

	<hr>

	<Login/>

	<hr>

	<GithubLogin href="https://github.com/login/oauth/authorize?client_id=09c53661153af8c5b13c&redirect_uri=https://ksauqt5f5er2djql3atquzas4e0ofpla.lambda-url.ap-northeast-2.on.aws/redirect/github"/>
</div>
