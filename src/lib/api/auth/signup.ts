import ky from 'ky';

export type SignupResponse = {
	user_id: string;
	email_duplicate: boolean;
};

export async function login(
	nickname: string,
	email: string,
	password: string
): Promise<SignupResponse> {
	const response = await ky.post('user/signup', {
		prefixUrl: 'api',
		json: { email, password, nickname }
	});

	return await response.json();
}
