import { mainApi } from '../setting';

export type LoginResponse = {
	success: boolean;
	access_token: string;
};

export async function login(email: string, password: string): Promise<LoginResponse> {
	const response = await mainApi.post('auth/login', {
		json: { email, password }
	});

	return await response.json();
}
