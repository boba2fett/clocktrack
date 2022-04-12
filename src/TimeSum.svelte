<script lang="ts">
import { readable } from 'svelte/store';

    import type { TimeRecord } from './global';

    export let timeRecordings: TimeRecord[];

    function getTimeString(timeRecordings: TimeRecord[], current: Date) {
        let timeSeconds = timeRecordings.map(timeRecording => timeRecording.timeSeconds + (timeRecording.lastEndTime ? 0 : (current.getTime() - timeRecording.lastStartTime.getTime()) / 1000)).reduce((a, b) => a + b, 0);
        let hours = Math.floor(timeSeconds / 3600).toString().padStart(2, '0');
        let minutes = Math.floor(timeSeconds % 3600 / 60).toString().padStart(2, '0');
        let seconds = Math.floor(timeSeconds % 3600 % 60).toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
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
{getTimeString(timeRecordings, $time)}