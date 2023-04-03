
import type { Note } from '$lib/types/Note';
import { mainApi, mainServerUrl } from '../setting';

export type GetNoteListItem = Note;

export type GetNoteListResponse = {
	list: GetNoteListItem[];
};

export async function getNoteListByProjectId(
	access_token: string,
	projectId: string
): Promise<GetNoteListResponse> {
	const response = await mainApi.get(`project/${projectId}/note/list`, {
		headers: {
			Authorization: `Bearer ${access_token}`
		}
	});

	return await response.json();
}

export async function getNoteListByProjectIdWithFetch(
	fetchObj: typeof fetch,
	access_token: string,
	projectId: string
): Promise<GetNoteListResponse> {
	const response = await fetchObj(`${mainServerUrl}/project/${projectId}/note/list`, {
		headers: {
			Authorization: `Bearer ${access_token}`
		}
	});

	return await response.json();
}
