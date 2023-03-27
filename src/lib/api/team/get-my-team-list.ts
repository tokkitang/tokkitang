import type { Team } from '../../types/Team';
import { mainApi, mainServerUrl } from '../setting';

export type GetMyTeamListItem = Team;

export type GetMyTeamListResponse = {
	list: GetMyTeamListItem[];
};

export async function getMyTeamList(access_token: string): Promise<GetMyTeamListResponse> {
	const response = await mainApi.get('team/my/list', {
		headers: {
			Authorization: `Bearer ${access_token}`
		}
	});

	return await response.json();
}

export async function getMyTeamListWithFetch(
	fetchObj: typeof fetch,
	access_token: string
): Promise<GetMyTeamListResponse> {
	const response = await fetchObj(`${mainServerUrl}/team/my/list`, {
		headers: {
			Authorization: `Bearer ${access_token}`
		}
	});

	return await response.json();
}
