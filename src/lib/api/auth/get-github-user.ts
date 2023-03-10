import { mainApi } from '../setting';

export type GithubUserResponse = {
	id: number;
	name: string;
	email: string;
};

export async function getGithubUser(access_token: string): Promise<GithubUserResponse> {
	const response = await mainApi.get('https://api.github.com/user', {
		headers: { Authorization: `Bearer ${access_token}`, 'User-Agent': 'tokkitang' }
	});

	return await response.json();
}
