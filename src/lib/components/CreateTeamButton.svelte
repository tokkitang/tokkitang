<script lang="ts">
	import { mainApi } from '../api/setting';
	import type { Team } from '../types/Team';

	export async function onClicked() {
		const response = await mainApi('/api/team', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: 'New Team'
			})
		});

		if (response.ok) {
			const team: Team = await response.json();
			window.location.href = `/team/${team.id}`;
		}
	}
</script>

<div class="teams">
	<button>new Team</button>
</div>

<style>
</style>
