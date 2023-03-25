<script lang="ts">
	export const message: string = 'Loading...';
</script>

<div class="loading">
	<svg class="loading-icon" viewBox="0 0 24 24">
		<circle cx="12" cy="12" r="10" fill="none" stroke-width="2" stroke-miterlimit="10" />
		<line x1="12" y1="6" x2="12" y2="10" />
		<line x1="12" y1="14" x2="12" y2="18" />
	</svg>
	<p class="loading-message">{message}</p>
</div>

<style>
	.loading {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		width: 100vw;
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(255, 255, 255, 0.8);
		z-index: 9999;
	}

	.loading-icon {
		width: 60px;
		height: 60px;
		margin-bottom: 16px;
		animation: spin 2s linear infinite;
	}

	.loading-message {
		font-size: 16px;
		font-weight: bold;
		color: #333;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
