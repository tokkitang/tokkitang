import type { Authority } from '../../types/Authority';
import { mainApi, mainServerUrl } from '../setting';

export type GetTeamInfoItem = {
	id: string;
	name: string;
	description: string;
	thumbnail_url: string;
	authority: Authority;
};

export type GetTeamInfoResponse = {
	data: GetTeamInfoItem;
};

export async function getTeamInfo(
	access_token: string,
	teamId: string
): Promise<GetTeamInfoResponse> {
	const response = await mainApi.get(`team/${teamId}`, {
		headers: {
			Authorization: `Bearer ${access_token}`
		}
	});

	return await response.json();
}

export async function getTeamInfoWithFetch(
	fetchObj: typeof fetch,
	access_token: string,
	teamId: string
): Promise<GetTeamInfoResponse> {
	const response = await fetchObj(`${mainServerUrl}/team/${teamId}`, {
		headers: {
			Authorization: `Bearer ${access_token}`,
			'Content-Type': 'application/json'
		},
		method: 'GET'
	});

	return await response.json();
}
