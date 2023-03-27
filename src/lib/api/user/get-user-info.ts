import { mainApi, mainServerUrl } from '../setting';

export type UserInfoResponse = {
	nickname: string;
	email: string;
	id: string;
	thumbnail_url: string | null;
};

export async function getUserInfo(access_token: string): Promise<UserInfoResponse> {
	const response = await mainApi.get('user/my/info', {
		headers: {
			Authorization: `Bearer ${access_token}`
		}
	});

	return await response.json();
}

export async function getUserInfoWithFetch(
	fetchObj: typeof fetch,
	access_token: string
): Promise<UserInfoResponse> {
	const response = await fetchObj(`${mainServerUrl}/user/my/info`, {
		headers: {
			Authorization: `Bearer ${access_token}`
		}
	});

	return await response.json();
}
