import { dev } from '$app/environment';
import { redirect, type LoadEvent } from '@sveltejs/kit';
import { getGithubAccessToken } from '../../../lib/api/auth/get-github-token';
import { githubLogin } from '../../../lib/api/auth/github-login';
import { setCookie } from '../../../lib/utils/cookie';

export const prerender = true;

export async function load({ url }: LoadEvent) {
	const code = url.searchParams?.get?.('code');
	console.log('code', code);

	if (!code) {
		throw redirect(302, '/');
	}

	try {
		const githubTokenResponse = await getGithubAccessToken(code);
		const githubAccessToken = githubTokenResponse.access_token;

		const githubLoginResponse = await githubLogin(githubAccessToken);

		if (githubLoginResponse.success) {
			setCookie('access_token', githubLoginResponse.access_token);
		} else {
			if (githubLoginResponse.need_signup) {
				throw redirect(302, '/signup?github=true');
			} else {
				alert('로그인 실패. 존재하지 않는 계정');
				throw redirect(302, '/');
			}
		}
	} catch (error) {
		console.error(error);
	}

	// TODO: code로 access token 획득
	// TODO: access token으로 정보 조회
	// TODO:
	//    1. 정보가 온전한 경우 가입 API 바로 전송
	//    2. 정보가 온전하지 않은 경우 기존의 가입페이지를 띄움
}
