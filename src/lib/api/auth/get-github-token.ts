import ky from 'ky';

export type GetGithubTokenResponse = {
	access_token: string;
};

export async function getGithubAccessToken(code: string): Promise<GetGithubTokenResponse> {
	const response = await ky.post('auth/access-token/github', {
		prefixUrl: 'api',
		json: { code }
	});

	return await response.json();
}
