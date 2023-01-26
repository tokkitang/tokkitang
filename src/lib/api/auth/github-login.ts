import ky from 'ky';

export type GithubLoginResponse = {
	success: boolean;
	access_token: string;
	need_signup: boolean;
};

export async function githubLogin(access_token: string): Promise<GithubLoginResponse> {
	const response = await ky.post('auth/login/github', {
		prefixUrl: 'api',
		json: { access_token }
	});

	return await response.json();
}
