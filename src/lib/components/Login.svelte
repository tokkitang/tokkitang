<script lang="ts">
	import { login } from '../api/auth/login';
	import { setCookie } from '../utils/cookie';
	import GithubLogin from './GithubLogin.svelte';

	export let email: string | null = null;
	export let password: string | null = null;

	export async function doLogin() {
		if (!email) {
			alert('이메일을 입력해주세요');
		}
		if (!password) {
			alert('비밀번호를 입력해주세요');
		}

		if (email !== null && password !== null) {
			const loginResponse = await login(email, password);
			if (loginResponse.success) {
				alert('로그인에 성공했습니다.');
				console.log(loginResponse.access_token);

				setCookie('access_token', loginResponse.access_token);
			} else {
				alert('로그인에 실패했습니다.');
			}
		}
	}
</script>

<main class="container">
	<form class="login-form">
		<div class="normal-login">
			<h1>Login</h1>
			<div class="email-div form-control">
				<label for="email">Email</label>
				<input id="email" type="email" bind:value={email} />
			</div>
			<div class="password-div form-control">
				<label for="password">Password</label>
				<input id="password" type="password" autoComplete="off" bind:value={password} />
			</div>

			<button on:click={doLogin}>Login</button> <br />

			Don't have an account?<br /> If not, <a class="simple-link" href="/signup">"Sign up"</a>.
		</div>

		<div class="center" />

		<div class="sso">
			<h1>Login with SSO</h1>
			<div class="github">
				<GithubLogin
					href="https://github.com/login/oauth/authorize?client_id=09c53661153af8c5b13c&redirect_uri=https://ksauqt5f5er2djql3atquzas4e0ofpla.lambda-url.ap-northeast-2.on.aws/redirect/github"
					buttonText="Login with Github"
				/>
			</div>
		</div>
	</form>
</main>

<style>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		max-width: none;
	}

	.login-form {
		background-color: #fff;
		padding: 40px;
		border-radius: 10px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		display: flex;
		width: 700px;
	}

	.normal-login {
		float: left;
		width: 20%;
	}

	.normal-login {
		flex: 1;
	}

	.center {
		border-right: 1.5px solid #e2e2e2;
		margin: 0 20px;
		float: left;
	}

	.sso {
		flex: 1;
		justify-content: center;
		align-items: center;
	}

	.github {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 40px;
	}

	h1 {
		font-size: 24px;
		text-align: center;
		margin-bottom: 20px;
	}

	.form-control {
		margin-bottom: 20px;
	}

	label {
		display: block;
		font-size: 14px;
		margin-bottom: 5px;
	}

	input {
		width: 100%;
		padding: 10px;
		border: none;
		border-radius: 5px;
		background-color: #f2f2f2;
		font-size: 16px;
		color: #333;
	}

	button {
		display: block;
		width: 100%;
		padding: 10px;
		border: none;
		border-radius: 5px;
		background-color: #333;
		color: #fff;
		font-size: 16px;
		cursor: pointer;
		transition: background-color 0.2s ease-in-out;
	}

	button:hover {
		background-color: #555;
	}

	.simple-link {
		text-decoration: none;
	}
</style>
