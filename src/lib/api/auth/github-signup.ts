import { mainApi } from '../setting';

export type GithubSignupResponse = {
	success: boolean;
	access_token: string;
	email_duplicate: boolean;
};

export async function githubSignup(
	nickname: string,
	email: string,
	access_token: string
): Promise<GithubSignupResponse> {
	const response = await mainApi.post('user/signup/github', {
		json: { email, access_token, nickname }
	});

	return await response.json();
}
