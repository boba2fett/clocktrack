<script lang="ts">
	import Options from "./Options.svelte";
	import Popup from "./Popup.svelte";
</script>

<main>
	{#if window.location.href.endsWith("popup.html")}
		<Popup />
	{:else}
		<Options />
	{/if}
</main>