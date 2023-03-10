<script lang="ts">
	import { signup } from '../api/auth/signup';
	import { uploadUserThumbnail } from '../api/auth/upload';
	import { setCookie } from '../utils/cookie';

	export let nickname: string | null = null;
	export let email: string | null = null;
	export let password: string | null = null;
	export let files: FileList | null = null;

	export async function doSignup() {
		if (!nickname) {
			alert('닉네임을 입력해주세요');
		}
		if (!email) {
			alert('이메일을 입력해주세요');
		}
		if (!password) {
			alert('비밀번호를 입력해주세요');
		}

		const signupResponse = await signup(nickname, email, password);
		if (signupResponse.success) {
			alert('회원가입에 성공했습니다.');
			console.log(signupResponse.access_token);

			setCookie('access_token', signupResponse.access_token);
		} else if (signupResponse.email_duplicate) {
			alert('이미 존재하는 계정입니다.');
		} else {
			alert('회원가입에 실패했습니다.');
		}
	}

	export async function uploadImage() {
		console.log('버튼 눌림');
		if (files?.[0]) {
			const formData = new FormData();
			formData.append('thumbnail', files[0]);

			const response = await uploadUserThumbnail(formData);

			if (response.success) {
				alert('이미지 업로드에 성공했습니다.');
				console.log(response.image_url);
			} else {
				alert('이미지 업로드에 실패했습니다.');
			}
		}
	}
</script>

<main>
	<form>
		nickname: <input id="nickname" type="text" bind:value={nickname} /> <br />
		email: <input id="email" type="email" bind:value={email} /> <br />
		password: <input id="password" type="password" autoComplete="off" bind:value={password} />
		<br />

		image: <input id="image" type="file" bind:files />
		{#if files?.[0]}
			<p>
				{files[0].name}
			</p>
		{/if}
	</form>

	<button on:click={uploadImage}>이미지만 업로드 테스트</button>

	<button on:click={doSignup}>Sign up</button> <br />
</main>

<style>
</style>
