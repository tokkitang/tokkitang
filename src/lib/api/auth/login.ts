import ky from 'ky';

export type LoginResponse = {
	success: boolean;
	access_token: string;
};

export async function login(email: string, password: string): Promise<LoginResponse> {
	const response = await ky.post('/api/auth/login', {
		json: { email, password }
	});

	return await response.json();
}
