import ky from 'ky';

export type GetGithubTokenResponse = {
	access_token: string;
};

export async function getGithubAccessToken(code: string): Promise<GetGithubTokenResponse> {
	const response = await ky.post('/api/auth/access-token/github', {
		json: { code }
	});

	return await response.json();
}
