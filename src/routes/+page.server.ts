import type { RequestEvent } from '@sveltejs/kit';
import type { User } from '../lib/types/User';
import { getUserInfoWithFetch } from '../lib/api/user/get-user-info';

export async function load(page: RequestEvent) {
	const accessToken = page.cookies.get('access_token');
	let myUserInfo: User | null = null;
	let isLogin = false;
	let error: any = null;

	if (accessToken) {
		try {
			const userInfoResponse = await getUserInfoWithFetch(page.fetch, accessToken);
			myUserInfo = { ...userInfoResponse };
			isLogin = true;
		} catch (e) {
			error = String(e);
			console.error(e);
		}
	}

	return {
		accessToken,
		myUserInfo,
		isLogin,
		error
	};
}
