import { writable, type Writable } from 'svelte/store';

export let isLoading: Writable<boolean> = writable(true);

export let accessToken: Writable<string | null> = writable(null);
