import { mainApi } from '../setting';

export type SignupResponse = {
	success: boolean;
	access_token: string;
	email_duplicate: boolean;
};

export async function signup(
	nickname: string,
	email: string,
	password: string,
	thumbnail_url: string | null
): Promise<SignupResponse> {
	const response = await mainApi.post('user/signup', {
		json: { email, password, nickname, thumbnail_url }
	});

	return await response.json();
}
