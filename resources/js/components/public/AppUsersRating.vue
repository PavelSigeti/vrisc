<template>
    <div class="dashboard-item" :aria-busy="loading">
        <div class="rating-header">
            <h3>Личный зачет</h3>
            <label v-if="years.length" class="rating-season">
                Сезон
                <select class="form-input" :value="selectedYear" @change="changeSeason">
                    <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
                    <option value="all">Всё время</option>
                </select>
            </label>
        </div>

        <p v-if="loading && !data" role="status">Загружаем рейтинг…</p>
        <p v-else-if="data && !data.data.length" role="status">В рейтинге пока нет результатов.</p>
        <div class="rating-item" v-for="(item, idx) in data?.data" :key="item.user_id">
            <div class="rating-position">#{{idx+1}}</div>
            <div class="rating-title">
                <div class="rating-name"><div class="rating-nickname">{{ item.nickname }}</div>&nbsp;{{item.name}} {{item.surname}}</div>
            </div>
            <div class="rating-score">{{item.total}}</div>
        </div>
        <p v-if="loadFailed" role="alert">Не удалось загрузить рейтинг.</p>
        <button v-if="loadFailed && !data" type="button" class="btn btn-border btn-settings" @click="load()">
            Повторить
        </button>
        <div v-if="data && data.current_page < data.last_page" class="jcc">
            <button type="button" class="btn btn-default btn-settings-280 mt10"
                    :disabled="loading" @click="load(data.current_page + 1)">
                {{ loading ? 'Загрузка…' : 'Показать ещё' }}
            </button>
        </div>
    </div>
</template>

<script setup>
import {onBeforeUnmount, onMounted, ref} from 'vue';

const loading = ref(false);
const loadFailed = ref(false);
const data = ref(null);
const selectedYear = ref('current');
const years = ref([]);
let requestNumber = 0;

async function load(page = 1) {
    const request = ++requestNumber;
    loading.value = true;
    loadFailed.value = false;

    try {
        const { data: rating } = await axios.get('/api/rating/users', {
            params: { year: selectedYear.value, page },
        });
        if (request !== requestNumber) return;

        if (page > 1) {
            rating.data = [...data.value.data, ...rating.data];
        }
        data.value = rating;
        years.value = rating.years;
        selectedYear.value = rating.year;
    } catch {
        if (request === requestNumber) loadFailed.value = true;
    } finally {
        if (request === requestNumber) loading.value = false;
    }
}

function changeSeason(event) {
    selectedYear.value = event.target.value;
    data.value = null;
    load();
}

onMounted(() => load());
onBeforeUnmount(() => { requestNumber++; });
</script>

<style scoped>
.rating-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px 20px;
    margin-bottom: 20px;
}

.rating-header h3 {
    margin-bottom: 0;
}

.rating-season {
    display: flex;
    align-items: center;
    gap: 10px;
}

.rating-season select {
    height: 42px;
}

.rating-season select:focus-visible, button:focus-visible {
    outline: 2px solid #242424;
    outline-offset: 3px;
}
</style>
