import { mainApi } from '../setting';

export type CheckUserEmailDuplicateResponse = {
	duplicate: boolean;
};

export async function checkUserEmailDuplicate(
	email: string
): Promise<CheckUserEmailDuplicateResponse> {
	const response = await mainApi.get('user/email/duplicate', {
		searchParams: { email }
	});

	return await response.json();
}
