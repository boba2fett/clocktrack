<h1>BaseUri To Regex</h1>

<script lang="ts">
    import type { Settings } from "./global";
	let settings: Settings;
    async function getSettings() {
        settings = await browser.storage.local.get() as any as Settings;
        if (!settings.urlRules) {
            settings.urlRules = [];
        }
    };
    getSettings();

	async function setSettings() {
		browser.storage.local.set(settings as any as browser.storage.StorageObject);
        await getSettings();
	}

    function addSetting() {
		settings.urlRules = settings.urlRules.concat({
            baseUri: "",
            regex: "",
        });
	}

    function removeSetting(index: number) {
		settings.urlRules.splice(index, 1);
        settings.urlRules = settings.urlRules;
	}

    function testSetting(baseUrl: string, regex: string) {
        try{
            new URL(baseUrl);
            new RegExp(regex);
        }
        catch(e) {
            
        }
    }
</script>
{#if settings?.urlRules}
    {#each settings.urlRules as urlRule, index}
        <input bind:value={urlRule.baseUri}>
        <input bind:value={urlRule.regex}>
        <button on:click={() => removeSetting(index)}>Delete</button>
        <button on:click={() => testSetting(urlRule.baseUri, urlRule.regex)}>Test</button>
    {/each}
{/if}

<button on:click={addSetting}>Add</button>
<button on:click={setSettings}>Save</button>