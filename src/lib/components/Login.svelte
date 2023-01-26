<script lang="ts">
	import { login } from '../api/auth/login';
	import { setCookie } from '../utils/cookie'

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

			setCookie('access_token', loginResponse.access_token);
		} else {
			alert('로그인에 실패했습니다.');
		}
	}
</script>

<main>
	email: <input id="email" type="email" bind:value={email} /> <br />
	password: <input id="password" type="password" bind:value={password} /> <br />
	<button on:click={doLogin}>Login</button> <br />
</main>

<style>

</style>