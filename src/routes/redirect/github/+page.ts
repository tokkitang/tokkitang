import { dev } from '$app/environment';
import { redirect, type LoadEvent } from '@sveltejs/kit';

export const prerender = true;

export function load({ url }: LoadEvent) {
    const code = url.searchParams?.get?.('code');

    if (!code) {
        throw redirect(302, '/');
    }

    // TODO: code로 access token 획득
    // TODO: access token으로 정보 조회
    // TODO: 
    //    1. 정보가 온전한 경우 가입 API 바로 전송
    //    2. 정보가 온전하지 않은 경우 기존의 가입페이지를 띄움 
}