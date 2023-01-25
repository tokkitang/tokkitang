<script lang="ts">
	import { login } from '../../lib/api/auth/login';
	import GithubLogin from '../../lib/components/GithubLogin.svelte';

	export let email: string;
	export let password: string;

	export async function doLogin() {
		if (!email) {
			alert('이메일을 입력해주세요');
		}
		if (!password) {
			alert('비밀번호를 입력해주세요');
		}
		const loginResponse = await login(email, password);
		if (loginResponse.success) {
			alert('로그인에 성공했습니다.');
			console.log(loginResponse.access_token);
		} else {
			alert('로그인에 실패했습니다.');
		}
	}
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="text-column">
	<h1>Login Page</h1>

	email<input id="email" type="email" bind:value={email} /> <br />
	password<input id="password" type="password" bind:value={password} /> <br />
	<button on:click={doLogin}>Login</button> <br />

	<GithubLogin/>
	<a
		href="https://github.com/login/oauth/authorize?client_id=09c53661153af8c5b13c&redirect_uri=https://ksauqt5f5er2djql3atquzas4e0ofpla.lambda-url.ap-northeast-2.on.aws/redirect/github"
		>Login with Github</a
	>
</div>
