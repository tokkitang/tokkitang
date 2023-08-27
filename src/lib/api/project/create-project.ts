import { mainApi } from '../setting';

export async function createProject(
	access_token: string,
	team_id: string,
	name: string,
	description: string,
	is_public: boolean,
	thumbnail_url: string | null
): Promise<any> {
	const response = await mainApi.post('project', {
		headers: {
			Authorization: `Bearer ${access_token}`
		},
		json: { team_id, name, description, thumbnail_url, is_public }
	});

	return await response.json();
}
