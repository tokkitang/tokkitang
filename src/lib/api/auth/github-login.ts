import { mainApi } from '../setting';

export type GithubLoginResponse = {
	success: boolean;
	access_token: string;
	need_signup: boolean;
};

export async function githubLogin(access_token: string): Promise<GithubLoginResponse> {
	const response = await mainApi.post('auth/login/github', {
		json: { access_token }
	});

	return await response.json();
}
