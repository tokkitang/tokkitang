<script lang="ts">
	import { onMount } from 'svelte';
	import { getUserInfo } from '../../lib/api/user/get-user-info';
	import type { User } from '../../lib/types/User';
	import { getCookie } from '../../lib/utils/cookie';
	import profilePlaceholder from '$lib/images/profile-placeholder.svg';
	import type { Team } from '../../lib/types/Team';
	import { getMyTeamList } from '../../lib/api/team/get-my-team-list';

	export let isLogin: boolean = false;
	export let myInfo: User | null = null;
	export let teamList: Team[] = [];

	onMount(async () => {
		const accessToken = getCookie('access_token');

		if (accessToken) {
			try {
				const userInfoResponse = await getUserInfo(accessToken);
				myInfo = { ...userInfoResponse };
				isLogin = true;

				const teamListResponse = await getMyTeamList(accessToken);
				teamList = teamListResponse.list;
			} catch (error) {
				console.error(error);
			}
		}
	});
</script>

<div class="container">
	<div class="profile">
		{#if myInfo?.thumbnail_url}
			<img class="profile-image" src={myInfo?.thumbnail_url} alt="" />
		{:else}
			<img class="profile-image" src={profilePlaceholder} alt="" />{/if}

		<h2 class="nickname">{myInfo?.nickname}</h2>
		<p class="email">{myInfo?.email}</p>
	</div>
	<div class="teams">
		<h3>My Team List</h3>
		<ul>
			<li class="team">
				<img
					class="team-image"
					src="https://static.tokkitang.com/thumbnail/user/1678887724_thumbnail_asdf.png"
					alt="/src/lib/images/team-placeholder.svg"
				/>
				<p class="team-name">팀2 이름</p>
			</li>
			<!-- 추가적인 팀 목록을 넣으려면 위의 <li> 요소를 복사하고 팀 이름과 이미지 URL을 수정하세요. -->
		</ul>
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
		border-radius: 50%;
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

	.teams {
		margin-bottom: 20px;
	}

	.teams h3 {
		font-size: 20px;
		font-weight: bold;
		margin-bottom: 10px;
	}

	.team {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
	}

	.team-image {
		width: 100px;
		height: 100px;
		object-fit: cover;
		margin-right: 10px;
	}

	.team-name {
		font-size: 16px;
	}
</style>
