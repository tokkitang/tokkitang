import { mainApi } from '../setting';

export type CreateNoteResponse = {
	success: boolean;
	note_id: string;
};

export async function createNote(
	access_token: string,
	project_id: string,
	content: string,
	x: string,
	y: string
): Promise<CreateNoteResponse> {
	const response = await mainApi.post(`note`, {
		headers: {
			Authorization: `Bearer ${access_token}`
		},
		json: {
			project_id,
			content,
			x,
			y
		}
	});

	return await response.json();
}
