import ky from 'ky';

export type GithubLoginResponse = {
	success: boolean;
	access_token: string;
	need_signup: boolean;
};

export async function githubLogin(access_token: string): Promise<GithubLoginResponse> {
	const response = await ky.post('/api/auth/login/github', {
		json: { access_token }
	});

	return await response.json();
}
