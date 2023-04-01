import type { RequestEvent } from '@sveltejs/kit';
import type { User } from '../../../lib/types/User';
import { getUserInfoWithFetch } from '../../../lib/api/user/get-user-info';
import type { Entity } from '$lib/types/Entity';
import { getEntityListByProjectIdWithFetch } from '$lib/api/entity/get-project-list';

export async function load(page: RequestEvent) {
	const projectId = page.params.projectId;

	const accessToken = page.cookies.get('access_token');
	let myUserInfo: User | null = null;
	let isLogin = false;
	let error: any = null;
	let entityList: Entity[] = [];

	if (accessToken && projectId) {
		try {
			const userInfoResponse = await getUserInfoWithFetch(page.fetch, accessToken);
			myUserInfo = { ...userInfoResponse };
			isLogin = true;

			const entityListResponse = await getEntityListByProjectIdWithFetch(page.fetch, accessToken, projectId);
			entityList = entityListResponse.list;
		} catch (e) {
			error = String(e);
			console.error(e);
		}
	}

	return {
		accessToken,
		myUserInfo,
		isLogin,
		error, entityList
	};
}
