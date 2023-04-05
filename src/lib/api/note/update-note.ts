import type { Note } from '../../types/Note';
import { mainApi } from '../setting';

export type UpdateNoteResponse = {};

export async function updateNote(access_token: string, note: Note): Promise<UpdateNoteResponse> {
	const response = await mainApi.put(`note/${note.id}`, {
		headers: {
			Authorization: `Bearer ${access_token}`
		},
		json: {
			content: note.content,
			x: note.x,
			y: note.y
		}
	});

	return await response.json();
}
