import ky from 'ky';

export type UploadImageResponse = {
	success: boolean;
	image_url: string;
};

export async function uploadUserThumbnail(formData: FormData): Promise<UploadImageResponse> {
	const response = await ky.post('/api/utils/image/upload/user-thumbnail', {
		body: formData
	});

	return await response.json();
}
