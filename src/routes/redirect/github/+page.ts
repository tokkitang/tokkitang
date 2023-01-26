import { dev } from '$app/environment';
import { redirect, type LoadEvent } from '@sveltejs/kit';
import { getGithubAccessToken } from '../../../lib/api/auth/get-github-token';
import { getGithubUser } from '../../../lib/api/auth/get-github-user';
import { githubLogin } from '../../../lib/api/auth/github-login';
import { githubSignup } from '../../../lib/api/auth/github-signup';
import { setCookie } from '../../../lib/utils/cookie';

export const prerender = true;

export async function load({ url }: LoadEvent) {
	const code = url.searchParams?.get?.('code');
	console.log('code', code);

	if (!code) {
		throw redirect(302, '/');
	}

	// 1. github code로 access token 획득
	// 2. access token으로 정보 조회
	// 3.
	//    3.1. 정보가 온전한 경우 가입 API 바로 전송
	//    3.2. 정보가 온전하지 않은 경우 기존의 가입페이지를 띄움

	try {
		const githubTokenResponse = await getGithubAccessToken(code);
		const githubAccessToken = githubTokenResponse.access_token;

		const githubLoginResponse = await githubLogin(githubAccessToken);

		if (githubLoginResponse.success) {
			setCookie('access_token', githubLoginResponse.access_token);
		} else {
			if (githubLoginResponse.need_signup) {
				const githubUserInfo = await getGithubUser(githubAccessToken);
				if (
					githubUserInfo.email != null &&
					githubUserInfo.name != null &&
					githubUserInfo.id != null
				) {
					const githubSignupResponse = await githubSignup(
						githubUserInfo.name,
						githubUserInfo.email,
						githubAccessToken
					);

					if (githubSignupResponse.success) {
						setCookie('access_token', githubSignupResponse.access_token);
					} else if (githubSignupResponse.email_duplicate) {
						alert('이미 가입된 이메일입니다.');
						throw redirect(302, '/');
					} else {
						alert('가입 실패');
						throw redirect(302, '/');
					}
				} else {
					let query = `?github=true`;

					if (githubUserInfo.email != null) {
						query += `&email=${githubUserInfo.email}`;
					}
					if (githubUserInfo.name != null) {
						query += `&nickname=${githubUserInfo.name}`;
					}

					throw redirect(302, `/signup${query}`);
				}
			} else {
				alert('로그인 실패. 존재하지 않는 계정');
				throw redirect(302, '/');
			}
		}
	} catch (error) {
		console.error(error);
	}
}
