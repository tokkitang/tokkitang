import { mainApi } from '../setting';

export type GetGithubTokenResponse = {
	access_token: string;
};

export async function getGithubAccessToken(code: string): Promise<GetGithubTokenResponse> {
	const response = await mainApi.post('auth/access-token/github', {
		json: { code }
	});

	return await response.json();
}
