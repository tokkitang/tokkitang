<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import type { User } from '../../../lib/types/User';
	import { getCookie } from '../../../lib/utils/cookie';
	import { getUserInfo } from '../../../lib/api/user/get-user-info';
	import teamPlaceholder from '$lib/images/team-placeholder.svg';
	import type { Team } from '../../../lib/types/Team';

	export let myInfo: User | null = null;
	export const teamId = $page.params.teamId;
	export let team: Team | null = null;

	onMount(async () => {
		const accessToken = getCookie('access_token');

		if (accessToken) {
			try {
				const userInfoResponse = await getUserInfo(accessToken);
				myInfo = { ...userInfoResponse };
			} catch (error) {
				console.error(error);
			}
		}
	});
</script>

<div class="container">
	<div class="profile">
		{#if team?.thumbnail_url}
			<img class="profile-image" src={team?.thumbnail_url} alt="" />
		{:else}
			<img class="profile-image" src={teamPlaceholder} alt="" />{/if}

		<h2 class="nickname">{team?.name}</h2>
		<p class="email">{team?.description}</p>
	</div>
</div>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	.container {
		max-width: 800px;
		margin: 30px auto;
		padding: 30px;
		background-color: #ffffff;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	}

	.profile {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 20px;
	}

	.profile-image {
		width: 150px;
		height: 150px;
		border-radius: 20%;
		object-fit: cover;
	}

	.nickname {
		font-size: 24px;
		font-weight: bold;
		margin-top: 10px;
	}

	.email {
		font-size: 16px;
		color: #777;
		margin-top: 5px;
	}
</style>
