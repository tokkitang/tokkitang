import type { Project } from '../../types/Project';
import { mainApi, mainServerUrl } from '../setting';

export type GetProjectListItem = Project;

export type GetProjectListResponse = {
	list: GetProjectListItem[];
};

export async function getProjectListByTeamId(
	access_token: string,
	teamId: string
): Promise<GetProjectListResponse> {
	const response = await mainApi.get(`team/${teamId}/project/list`, {
		headers: {
			Authorization: `Bearer ${access_token}`
		}
	});

	return await response.json();
}

export async function getProjectListByTeamIdWithFetch(
	fetchObj: typeof fetch,
	access_token: string,
	teamId: string
): Promise<GetProjectListResponse> {
	const response = await fetchObj(`${mainServerUrl}/team/${teamId}/project/list`, {
		headers: {
			Authorization: `Bearer ${access_token}`
		}
	});

	return await response.json();
}
