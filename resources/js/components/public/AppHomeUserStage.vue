<template>
    <div class="user-stage">
        <div  class="user-stage__header">
            <router-link :to="`/stage/${stage.id}`" class="user-stage__title">{{stage.title}}</router-link>
            <div class="user-stage__tournament">{{stage.tournament}}</div>
            <div class="user-stage__participant" v-if="stage.users_exists">Вы участвуете</div>
        </div>
        <div v-if="stage.excerpt" class="user-stage__excerpt content" v-html="stage.excerpt"></div>
        <div class="user-stage__date">
            <span>Начало регистрации: {{time(stage.register_start)}}</span>
            <span>Окончание регистрации: {{time(stage.register_end)}}</span>
            <span>Начало гонок: {{time(stage.race_start)}}</span>
        </div>
        <div class="user-stage__info" v-if="stage.register_start > now">
            Регистрация не началась
        </div>
        <div class="user-stage__info" v-else-if="stage.race_start <= now && stage.status !== 'finished'">
            Регата проходит
        </div>
        <div class="user-stage__info" v-else-if="stage.status === 'active' && stage.register_end > now">
            Регистрация открыта
        </div>
        <div class="user-stage__info" v-else-if="stage.status === 'finished'">
            Регата закончилась
        </div>
        <div class="user-stage__info" v-else>
            Ожидайте
        </div>
        <router-link :to="`/stage/${stage.id}`" class="btn btn-border btn-settings-280 mt10">Подробнее</router-link>
    </div>
</template>

<script>
import {ref} from 'vue';
import useMoscowDateTime from "@/composables/moscowDateTime.js";
import {time} from "@/utils/time.js";

export default {
    name: "AppHomeUserStage",
    components: {
    },
    props: [
        'stage',
    ],
    setup(props) {
        const stage = ref(props.stage);

        const now = useMoscowDateTime();

        return {
            stage, time,
            now,
        };
    }
}
</script>

<style scoped>

</style>
