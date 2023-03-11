<script lang="ts">
	import { login } from '../api/auth/login';
	import { setCookie } from '../utils/cookie';

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

<main>
	<form>
		email: <input id="email" type="email" bind:value={email} /> <br />
		password: <input id="password" type="password" autoComplete="off" bind:value={password} />
		<br />
	</form>
	<button on:click={doLogin}>Login</button> <br />
</main>

<style>
</style>
