<script lang="ts">
    import Plus from "svelte-material-icons/Plus.svelte";
    import Stop from "svelte-material-icons/Stop.svelte";
    import Delete from "svelte-material-icons/Delete.svelte";
	import type { Settings } from "./global";
    let settings: Settings;
    async function getSettings() {
        settings = await browser.storage.local.get() as any as Settings;
        if (!settings.urlRules) {
            settings.urlRules = [];
        }
        if (!settings.timeRecordings) {
            settings.timeRecordings = [];
        }
        settings.timeRecordings.sort((a,b) => a.startTime.getTime() - b.startTime.getTime());
    };
    getSettings();

    async function addTask(task: string) {
        if (!task) {
            task = await executeScript();
        }
        if (!task) {
            return;
        }
        settings.timeRecordings = settings.timeRecordings.concat([{
            task: task,
            startTime: new Date(),
            endTime: null,
        }]);
        await browser.storage.local.set(settings as any as browser.storage.StorageObject);
        taskName = "";
    }

    async function removeTask(index: number) {
		settings.timeRecordings.splice(index, 1);
        settings.timeRecordings = settings.timeRecordings;
        await browser.storage.local.set(settings as any as browser.storage.StorageObject);
	}

    async function stopTask(index: number) {
		settings.timeRecordings[index].endTime = new Date();
        settings.timeRecordings = settings.timeRecordings;
        await browser.storage.local.set(settings as any as browser.storage.StorageObject);
	}

	async function executeScript(): Promise<string> {
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
            return matches[1];
        }
        return null;
    }

    let taskName = "";

</script>

<main>
    <div class="task">
        <label for={"task"}>Task</label>
        <input id={"task"} bind:value={taskName}>
        <button on:click={() => addTask(taskName)}><Plus /></button>
    </div>
    {#if settings?.timeRecordings}
        {#each settings.timeRecordings as timeRecording, index}
            <div class="timerecording">
                <span>{timeRecording.task}</span>
                <span>{timeRecording.startTime.toLocaleString()}</span>
                <span>{
                    Math.floor(((
                        timeRecording.endTime?.getTime() || new Date().getTime())
                        - timeRecording.startTime.getTime())
                        / 3600000).toString().padStart(2, '0')
                    + ":" +
                    Math.floor((((
                        timeRecording.endTime?.getTime() || new Date().getTime())
                        - timeRecording.startTime.getTime())
                        % 3600000) / 60000).toString().padStart(2, '0')
                        }</span>
                {#if !timeRecording.endTime}
                    <button on:click={() => stopTask(index)}><Stop /></button>
                {/if}
                <button on:click="{() => removeTask(index)}"><Delete /></button>
            </div>
        {/each}
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

    .task {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .timerecording {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
</style>