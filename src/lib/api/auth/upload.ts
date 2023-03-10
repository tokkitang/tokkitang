import { mainApi } from '../setting';

export type UploadImageResponse = {
	success: boolean;
	image_url: string;
};

export async function uploadUserThumbnail(formData: FormData): Promise<UploadImageResponse> {
	const response = await mainApi.post('utils/image/upload/user-thumbnail', {
		body: formData
	});

	return await response.json();
}
