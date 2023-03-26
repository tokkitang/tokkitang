<script lang="ts">
	import { page } from '$app/stores';
	import logo from '$lib/images/rabbit-logo.svg';
	import profilePlaceholder from '$lib/images/profile-placeholder.svg';
	import login from '$lib/images/login.svg';
	import type { User } from '../types/User';
	import { onMount } from 'svelte';
	import { getCookie } from '../utils/cookie';
	import { getUserInfo } from '../api/user/get-user-info';
	import { movePage } from '../utils/movePage';
	import { accessToken, isLoading } from '../../lib/store';
	import Loading from './Loading.svelte';

	export let isLogin: boolean = false;
	export let myInfo: User | null = null;

	onMount(async () => {
		const token = getCookie('access_token');

		$accessToken = token;

		if (token) {
			try {
				const userInfoResponse = await getUserInfo(accessToken);
				myInfo = { ...userInfoResponse };
				isLogin = true;
			} catch (error) {
				console.error(error);
			}
		} else {
			const path = window.location.pathname;
			if (['/mypage'].includes(path)) {
				movePage('/login');
			} else if (path.startsWith('/team')) {
				movePage('/login');
			} else if (path.startsWith('/project')) {
				movePage('/login');
			}
		}

		$isLoading = false;
	});
</script>

<header>
	{#if $isLoading}
		<Loading />
	{/if}

	<div class="corner">
		<a href="/">
			<img src={logo} alt="SvelteKit" />
		</a>
	</div>

	<nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				<a href="/about">About</a>
			</li>
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>

	<div class="corner">
		{#if isLogin}
			<a href="/mypage">
				{#if myInfo?.thumbnail_url}
					<img class="thumb" src={myInfo.thumbnail_url} alt="GitHub" />
				{:else}
					<img class="thumb" src={profilePlaceholder} alt="GitHub" />
				{/if}
			</a>
		{:else}
			<a href="/login">
				<img src={login} alt="GitHub" />
			</a>
		{/if}
	</div>
</header>

<style>
	.thumb {
		max-width: 40px;
		max-height: 40px;
	}

	header {
		display: flex;
		justify-content: space-between;
	}

	.corner {
		width: 3em;
		height: 3em;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}
</style>
