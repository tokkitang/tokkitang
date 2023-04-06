import type { Column, Entity } from '../../types/Entity';
import { mainApi } from '../setting';

export type UpdateEntityResponse = {};

export async function updateEntity(
	access_token: string,
	entity: Entity
): Promise<UpdateEntityResponse> {
	const response = await mainApi.put(`entity/${entity.id}`, {
		headers: {
			Authorization: `Bearer ${access_token}`
		},
		json: {
			logical_name: entity.logical_name,
			physical_name: entity.physical_name,
			comment: entity.comment,
			columns: entity.columns,
			x: entity.x,
			y: entity.y
		}
	});

	return await response.json();
}
