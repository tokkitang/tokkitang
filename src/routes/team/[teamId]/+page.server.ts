import type { RequestEvent } from '@sveltejs/kit';
import type { User } from '../../../lib/types/User';
import { getUserInfo } from '../../../lib/api/user/get-user-info';
import { getTeamInfo } from '../../../lib/api/team/get-team-info';
import type { Team } from '../../../lib/types/Team';

export async function load(page: RequestEvent) {
	const teamId: string = page.params.teamId!!;

	const accessToken = page.cookies.get('access_token');
	let myUserInfo: User | null = null;
	let isLogin = false;
	let team: Team | null = null;

	if (accessToken) {
		try {
			const userInfoResponse = await getUserInfo(accessToken);
			myUserInfo = { ...userInfoResponse };
			isLogin = true;

			const teamInfoResponse = await getTeamInfo(accessToken, teamId);
			team = {
				id: teamInfoResponse.data.id,
				name: teamInfoResponse.data.name,
				description: teamInfoResponse.data.description,
				thumbnail_url: teamInfoResponse.data.thumbnail_url
			};
		} catch (error) {
			console.error(error);
		}
	}

	return {
		accessToken,
		myUserInfo,
		isLogin,
		team
	};
}