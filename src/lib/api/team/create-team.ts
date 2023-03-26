import { mainApi } from '../setting';

export async function createTeam(
	access_token: string,
	name: string,
	description: string,
	thumbnail_url: string | null
): Promise<any> {
	const response = await mainApi.post('team', {
		headers: {
			Authorization: `Bearer ${access_token}`
		},
		json: {
			name,
			description,
			thumbnail_url
		}
	});

	return await response.json();
}
