import { writable, type Writable } from 'svelte/store';
import type { User } from '../types/User';

export let isLoading: Writable<boolean> = writable(true);
