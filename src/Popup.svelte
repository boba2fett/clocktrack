<script lang="ts">
    let value: string;

	import type { Settings } from "./global";
    let settings: Settings;
    async function getSettings() {
        settings = await browser.storage.local.get() as any as Settings;
        if (!settings.urlRules) {
            settings.urlRules = [];
        }
    };
    getSettings();

	async function executeScript() {
		const tabs = await browser.tabs.query({active: true, currentWindow: true});
        if (tabs.length === 0) {
            console.log("No active tab to use.");
        }
		const tab = tabs[0];
		const result = await browser.tabs.executeScript(tab.id ,{code: "window.location.href;"});
		let url = result[0] as any as string;

        const urlRules = settings.urlRules.filter(urlRule => url.startsWith(urlRule.baseUri));
        if (urlRules.length === 0) {
            console.log("No matching url rule found.");
            return;
        }
        const urlRegex = new RegExp(urlRules[0].regex);
        const matches = url.match(urlRegex);
        if (matches?.length > 1) {
            value = matches[1];
        }
    }
</script>

<main>
	<button on:click={executeScript}>Exec Script</button>
    {#if value}
        <p>{value}</p>
    {/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		width: 280px;
		height: 280px;
		margin: 0 auto;
	}
</style>