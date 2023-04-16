import type { Column } from '../../types/Entity';
import { mainApi } from '../setting';

export type CreateEntityResponse = {
	success: boolean;
	entity_id: string;
};

export async function createEntity(
	access_token: string,
	project_id: string,
	logical_name: string,
	physical_name: string,
	comment: string,
	columns: Column[],
	x: string,
	y: string
): Promise<CreateEntityResponse> {
	const response = await mainApi.post(`entity`, {
		headers: {
			Authorization: `Bearer ${access_token}`
		},
		json: {
			project_id,
			logical_name,
			physical_name,
			comment,
			columns,
			x,
			y
		}
	});

	return await response.json();
}
