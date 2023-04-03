import type { RequestEvent } from '@sveltejs/kit';
import type { User } from '../../../lib/types/User';
import { getUserInfoWithFetch } from '../../../lib/api/user/get-user-info';
import type { Entity } from '$lib/types/Entity';
import { getEntityListByProjectIdWithFetch } from '$lib/api/entity/get-project-list';
import type { Note } from '$lib/types/Note';
import { getNoteListByProjectIdWithFetch } from '$lib/api/note/get-note-list';

export async function load(page: RequestEvent) {
	const projectId = page.params.projectId;

	const accessToken = page.cookies.get('access_token');
	let myUserInfo: User | null = null;
	let isLogin = false;
	let error: any = null;
	let entityList: Entity[] = [];
	let noteList: Note[] = [];

	if (accessToken && projectId) {
		try {
			const userInfoResponse = await getUserInfoWithFetch(page.fetch, accessToken);
			myUserInfo = { ...userInfoResponse };
			isLogin = true;

			const entityListResponse = await getEntityListByProjectIdWithFetch(page.fetch, accessToken, projectId);
			entityList = entityListResponse.list;

			const noteListResponse = await getNoteListByProjectIdWithFetch(page.fetch, accessToken, projectId);
			noteList = noteListResponse.list;
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
		entityList, noteList
	};
}
