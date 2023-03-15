import type { LoadEvent } from '@sveltejs/kit';
import { getGithubAccessToken } from '../../../lib/api/auth/get-github-token';
import { getGithubUser } from '../../../lib/api/auth/get-github-user';
import { githubLogin } from '../../../lib/api/auth/github-login';
import { githubSignup, type GithubSignupResponse } from '../../../lib/api/auth/github-signup';
import { setCookie } from '../../../lib/utils/cookie';
import { HTTPError } from 'ky';
import { movePage } from '../../../../../../../../../Users/sssan/Code/Svelte/tokkitang/src/lib/utils/movePage';

export const ssr = false;
export const csr = true;

export async function load({ url }: LoadEvent) {
	const code = url.searchParams?.get?.('code');
	console.log('code', code);

	if (code === null) {
		movePage('/');
	} else {
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

				movePage('/mypage');
			} else {
				if (githubLoginResponse.need_signup) {
					const githubUserInfo = await getGithubUser(githubAccessToken);
					if (
						githubUserInfo.email != null &&
						githubUserInfo.name != null &&
						githubUserInfo.id != null
					) {
						try {
							const githubSignupResponse = await githubSignup(
								githubUserInfo.name,
								githubUserInfo.email,
								githubAccessToken
							);
							if (githubSignupResponse.success) {
								setCookie('access_token', githubSignupResponse.access_token);
								movePage('/mypage');
							} else {
								alert('가입 실패');
								movePage('/');
							}
						} catch (error: any) {
							if (error instanceof HTTPError) {
								const githubSignupFailResponse: GithubSignupResponse = await error.response.json();

								if (githubSignupFailResponse.email_duplicate) {
									alert('이미 이메일로 가입된 계정입니다.');
									movePage('/');
								}
							}

							console.error(error);
							movePage('/');
						}
					} else {
						let query = `?github=true`;
						if (githubUserInfo.email != null) {
							query += `&email=${githubUserInfo.email}`;
						}
						if (githubUserInfo.name != null) {
							query += `&nickname=${githubUserInfo.name}`;
						}
						movePage(`/signup${query}`);
					}
				} else {
					alert('로그인 실패. 존재하지 않는 계정');
					movePage('/');
				}
			}
		} catch (error) {
			console.error(error);
		}
	}
}
