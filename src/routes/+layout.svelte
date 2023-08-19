<script>
	import '../app.css';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import Body from '$lib/components/Body.svelte';
</script>

<div class="app">
	<Header />
	<Body>
		<slot />
	</Body>
	<Footer />
</div>

<style>
	:global(html) {
		background-color: #e0eee0;
		width: 100%;
		height: 100%;
	}

</style>
