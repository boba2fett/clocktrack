<h1>Options</h1>

<script lang="ts">
	let settings: browser.storage.StorageObject;

    let value: string;

    async function getSettings() {
        settings = await browser.storage.local.get();
        value = settings.test as string || "";
    };

    getSettings();

	async function setSettings() {
		browser.storage.local.set({test: value});
        await getSettings();
	}
</script>

<input bind:value={value}>
<button on:click={setSettings}>Test</button>
<p>{settings?.test}</p>