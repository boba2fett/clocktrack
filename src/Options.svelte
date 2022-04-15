<script lang="ts">
    import Plus from "svelte-material-icons/Plus.svelte";
    import ContentSave from "svelte-material-icons/ContentSave.svelte";
    import Delete from "svelte-material-icons/Delete.svelte";
    import type { Predefined, Settings } from "./global";

    const predefineds: Predefined[] = [
        {
            name: "jira",
            regex: ".*/browse/([^/\?]+).*"
        },
        {
            name: "salesforce",
            regex: ".*/Case/([^/\?]+).*"
        },
        {
            name: "stackoverflow",
            regex: ".*/questions/([^/\?]+).*"
        },
    ];

    const defaultUrlRule = [{
        baseUri: "https://stackoverflow.com/",
        regex: predefineds.find(x => x.name === "stackoverflow").regex
    }];

	let settings: Settings;
    async function getSettings() {
        settings = await browser.storage.local.get() as any as Settings;
        if (!settings.urlRules) {
            settings.urlRules = defaultUrlRule;
        }
    };
    getSettings();

	async function setSettings() {
		browser.storage.local.set(settings as any as browser.storage.StorageObject);
        await getSettings();
	}

    async function setDvSettings() {
        settings.urlRules = [
            {
                baseUri: "https://jira.d-velop.de",
                regex: predefineds.find(x => x.name === "jira").regex
            },
            {
                baseUri: "https://dvelop.lightning.force.com/",
                regex: predefineds.find(x => x.name === "salesforce").regex
            }
        ];
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
</script>

<h2>BaseUri To Regex</h2>

{#if settings?.urlRules}
    {#each settings.urlRules as urlRule, index}
        <div class="urlregex">
            <label for={"url_" + index}>URL</label>
            <input id={"url_" + index} bind:value={urlRule.baseUri}>
            <label for={"regex_" + index}>REGEX</label>
            <input id={"regex_" + index} bind:value={urlRule.regex}>
            <select bind:value={urlRule.regex}>
                {#each predefineds as predefined}
                    <option value={predefined.regex}>
                        {predefined.name}
                    </option>
                {/each}
            </select>

            <div class="buttons">
                <button on:click={() => removeSetting(index)}><Delete /></button>
            </div>
        </div>
    {/each}
{/if}

<div class="buttons">
    <button on:click={addSetting}><Plus /></button>
    <button on:click={setSettings}><ContentSave /></button>
    <button on:click={setDvSettings}>Use d.velop settings</button>
</div>

<style>
    .buttons {
        display: flex;
    }

    .urlregex {
        display: flex;
        flex-direction: column;
        margin-bottom: 1em;
    }
</style>