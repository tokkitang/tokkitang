<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { uploadProjectThumbnail } from '../../../lib/api/auth/upload';
	import { createProject } from '../../../lib/api/project/create-project';
	import { getCookie } from '../../../lib/utils/cookie';
	import { movePage } from '../../../lib/utils/movePage';

	export let teamId = $page.url.searchParams.get('team_id');
	export let name: string = '';
	export let description: string = '';
	export let isPublic: boolean = false;
	export let thumbnail_url: string | null = null;
	export let files: FileList | null = null;

	onMount(async () => {});

	export async function create() {
		try {
			if (name == '') {
				alert('이름을 입력해주세요');
			}

			if (!teamId) {
				alert('팀을 선택해주세요.');
				movePage('/mypage');
			}

			if (files !== null && files?.[0] !== null) {
				await uploadImage();
			}

			if (files !== null && files?.[0] !== null) {
				await uploadImage();
			}

			if (name !== null && description !== null && teamId !== null) {
				const accessToken = getCookie('access_token');

				if (!accessToken) {
					alert('로그인이 필요합니다.');
					return;
				}

				await createProject(accessToken, teamId, name, description, isPublic, thumbnail_url);

				alert('프로젝트 생성에 성공했습니다.');
				movePage(`/team/${teamId}`);
			}
		} catch (error) {
			console.error(error);
			alert('프로젝트 생성에 실패했습니다.');
		}
	}

	export async function uploadImage() {
		if (files?.[0]) {
			const formData = new FormData();
			formData.append('thumbnail', files[0]);

			const response = await uploadProjectThumbnail(formData);

			if (response.success) {
				// alert('이미지 업로드에 성공했습니다.');
				thumbnail_url = response.image_url;
				console.log(response.image_url);
			} else {
				alert('이미지 업로드에 실패했습니다.');
			}
		}
	}
</script>

<main class="container">
	<form class="input-form">
		<div class="normal-input">
			<h1>New Project</h1>

			<div class="name-div form-control">
				<label for="name">Project Name</label>
				<input id="name" type="text" bind:value={name} />
			</div>

			<div class="description-div form-control">
				<label for="description">Description</label>
				<input id="description" type="text" bind:value={description} />
			</div>

			<div class="public-div form-control">
				<label for="image">Is Public Project</label>
				<input id="isPublic" type="checkbox" bind:checked={isPublic} />
			</div>

			<div class="image-div form-control">
				<label for="image">Project Thumbnail</label>
				<input id="image" type="file" bind:files />
			</div>

			<button on:click={create}>Create</button> <br />
		</div>

		<div class="center" />
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

	.input-form {
		background-color: #fff;
		padding: 40px;
		border-radius: 10px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		display: flex;
		width: 700px;
	}

	.normal-input {
		float: left;
		width: 20%;
	}

	.normal-input {
		flex: 1;
	}

	.center {
		border-right: 1.5px solid #e2e2e2;
		margin: 0 20px;
		float: left;
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

	button {
		margin-top: 40px;
	}
</style>
