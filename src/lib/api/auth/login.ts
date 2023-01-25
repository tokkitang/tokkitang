import ky from 'ky';
import { mainServerUrl } from '../setting';

export type LoginResponse = {
	success: boolean;
	access_token: string;
};

export async function login(email: string, password: string): Promise<LoginResponse> {
	const response = await ky.post('auth/login', {
		prefixUrl: 'api',
		json: { email, password }
	});

	return await response.json();
}
