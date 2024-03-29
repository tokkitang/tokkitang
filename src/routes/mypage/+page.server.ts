import type { RequestEvent } from '@sveltejs/kit';
import type { User } from '../../lib/types/User';
import { getUserInfo, getUserInfoWithFetch } from '../../lib/api/user/get-user-info';
import { getMyTeamList, getMyTeamListWithFetch } from '../../lib/api/team/get-my-team-list';
import type { Team } from '../../lib/types/Team';

export async function load(page: RequestEvent) {
	const accessToken = page.cookies.get('access_token');
	let myUserInfo: User | null = null;
	let isLogin = false;
	let teamList: Team[] = [];
	let error: any = null;

	if (accessToken) {
		try {
			const userInfoResponse = await getUserInfoWithFetch(page.fetch, accessToken);
			myUserInfo = { ...userInfoResponse };
			isLogin = true;

			const teamListResponse = await getMyTeamListWithFetch(page.fetch, accessToken);
			teamList = teamListResponse.list;
		} catch (e) {
			error = String(e);
			console.error(e);
		}
	}

	return {
		accessToken,
		myUserInfo,
		isLogin,
		error,
		teamList
	};
}
