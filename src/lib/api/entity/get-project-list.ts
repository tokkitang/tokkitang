import type { Entity } from '$lib/types/Entity';
import { mainApi, mainServerUrl } from '../setting';

export type GetEntityListItem = Entity;

export type GetEntityListResponse = {
	list: GetEntityListItem[];
};

export async function getEntityListByProjectId(
	access_token: string,
	projectId: string
): Promise<GetEntityListResponse> {
	const response = await mainApi.get(`project/${projectId}/entity/list`, {
		headers: {
			Authorization: `Bearer ${access_token}`
		}
	});

	return await response.json();
}

export async function getEntityListByProjectIdWithFetch(
	fetchObj: typeof fetch,
	access_token: string,
	projectId: string
): Promise<GetEntityListResponse> {
	const response = await fetchObj(`${mainServerUrl}/project/${projectId}/entity/list`, {
		headers: {
			Authorization: `Bearer ${access_token}`
		}
	});

	return await response.json();
}
