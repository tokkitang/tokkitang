<script lang="ts">
	import { signup } from '../api/auth/signup';
	import { uploadUserThumbnail } from '../api/auth/upload';
	import { checkUserEmailDuplicate } from '../api/user/check-user-email-duplicate';
	import { setCookie } from '../utils/cookie';
	import { movePage } from '../utils/movePage';
	import GithubLogin from './GithubLogin.svelte';

	export let nickname: string | null = null;
	export let email: string | null = null;
	export let emailDuplicate: boolean = false;
	export let password: string | null = null;
	export let thumbnail_url: string | null = null;
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
		if (emailDuplicate) {
			alert('이메일이 중복됩니다.');
		}

		if (files !== null && files?.[0] !== null) {
			await uploadImage();
		}

		if (nickname !== null && email !== null && password !== null) {
			const signupResponse = await signup(nickname, email, password, thumbnail_url);
			if (signupResponse.success) {
				alert('회원가입에 성공했습니다.');
				console.log(signupResponse.access_token);

				setCookie('access_token', signupResponse.access_token);
				movePage('/mypage');
			} else if (signupResponse.email_duplicate) {
				alert('이미 존재하는 계정입니다.');
			} else {
				alert('회원가입에 실패했습니다.');
			}
		}
	}

	export async function uploadImage() {
		if (files?.[0]) {
			const formData = new FormData();
			formData.append('thumbnail', files[0]);

			const response = await uploadUserThumbnail(formData);

			if (response.success) {
				// alert('이미지 업로드에 성공했습니다.');
				thumbnail_url = response.image_url;
				console.log(response.image_url);
			} else {
				alert('이미지 업로드에 실패했습니다.');
			}
		}
	}

	export async function emailFocusOut(_: any) {
		try {
			if (email !== null) {
				const response = await checkUserEmailDuplicate(email);
				if (response.duplicate) {
					emailDuplicate = true;
				} else {
					emailDuplicate = false;
				}
			}
		} catch (error) {
			console.log(error);
		}
	}
</script>

<main class="container">
	<form class="login-form">
		<div class="normal-login">
			<h1>Sign up</h1>
			<div class="email-div form-control">
				<label for="email">Email</label>
				<input id="email" type="email" bind:value={email} on:focusout={emailFocusOut} />

				{#if emailDuplicate}<p class="reject-message">Email already exists</p>{/if}
			</div>
			<div class="password-div form-control">
				<label for="password">Password</label>
				<input id="password" type="password" autoComplete="off" bind:value={password} />
			</div>
			<div class="nickname-div form-control">
				<label for="nickname">Nickname</label>
				<input id="nickname" type="text" bind:value={nickname} />
			</div>

			<div class="image-div form-control">
				<label for="image">Profile Thumbnail</label>
				<input id="image" type="file" bind:files />
			</div>

			<button on:click={doSignup}>Sign up</button> <br />

			Do you have an account?<br /> If so, go to <a class="simple-link" href="/login">"Login"</a>.
		</div>

		<div class="center" />

		<div class="sso">
			<h1>Sign up with SSO</h1>
			<div class="github">
				<GithubLogin
					href="https://github.com/login/oauth/authorize?client_id=09c53661153af8c5b13c&redirect_uri=https://ksauqt5f5er2djql3atquzas4e0ofpla.lambda-url.ap-northeast-2.on.aws/redirect/github?redirect_url={window
						.location.origin}/redirect/github"
					buttonText="Sign up with Github"
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

	.reject-message {
		color: red;
		font-size: small;
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
