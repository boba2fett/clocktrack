<script lang="ts">
	let url: string;
    let value: string;
    async function getSettings() {
        let settings = await browser.storage.local.get();
        value = settings.test as string || "";
    };

    getSettings();

	async function executeScript() {
		const tabs = await browser.tabs.query({active: true, currentWindow: true});
        if (tabs.length === 0) {
            console.log("No active tab to use.");
        }
		const tab = tabs[0];
		const result = await browser.tabs.executeScript(tab.id ,{code: "window.location.href;"});
		url = result[0] as any as string;
	}
</script>

<main>
	<button on:click={executeScript}>Exec Script</button>
    <p>{value}</p>
	{#if url}
		<p>{url}</p>
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>