<script lang="ts">
import { readable } from 'svelte/store';

    import type { TimeRecord } from './global';

    export let timeRecording: TimeRecord;

    function getTimeString(timeRecording: TimeRecord, current: Date) {
        let timeSeconds = timeRecording.timeSeconds + (timeRecording.lastEndTime ? 0 : (current.getTime() - timeRecording.lastStartTime.getTime()) / 1000);
        let hours = Math.floor(timeSeconds / 3600).toString().padStart(2, '0');
        let minutes = Math.floor(timeSeconds % 3600 / 60).toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    const time = readable(new Date(), function start(set) {
        const interval = setInterval(() => {
            set(new Date());
        }, 1000);

        return function stop() {
            clearInterval(interval);
        };
    });

</script>
{getTimeString(timeRecording, $time)}