import {onBeforeUnmount, onMounted, ref} from 'vue';

const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Moscow',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
});

function currentMoscowDateTime() {
    const parts = formatter.formatToParts(new Date());
    const {year, month, day, hour, minute} = Object.fromEntries(
        parts.map(({type, value}) => [type, value])
    );

    // Match the YYYY-MM-DDTHH:mm format used for stage dates by the API.
    return `${year}-${month}-${day}T${hour}:${minute}`;
}

export default function useMoscowDateTime() {
    const now = ref(currentMoscowDateTime());
    let timer;

    onMounted(() => {
        timer = setInterval(() => {
            now.value = currentMoscowDateTime();
        }, 1000);
    });
    onBeforeUnmount(() => clearInterval(timer));

    return now;
}
