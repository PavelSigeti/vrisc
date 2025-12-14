<template>
    <table v-if="props.users && props.users.length > 0" class="result-table">
        <thead>
            <tr>
                <th>#</th>
                <th>Яхтсмен</th>
                <th>Группа</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(user, i) in props.users" :key="user.id || i">
                <td>{{i+1}}</td>
                <td>
                    <div class="result-table__name">
                        {{user.surname}} {{user.name}}
                        <span class="result-table__nick">{{user.nickname}}</span>
                    </div>
                </td>
                <td>
                    <input 
                        class="split-number-input" 
                        type="number" 
                        v-model="result[user.id]"
                        min="1"
                    >
                </td>
            </tr>
        </tbody>
    </table>
    <button 
        class="btn btn-default btn-settings mt15" 
        @click="createGroup"
        v-if="props.users && props.users.length > 0"
    >
        Сформировать группы
    </button>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();

const props = defineProps({
    id: {
        type: [String, Number],
        required: true
    },
    users: {
        type: Array,
        default: () => []
    }
});

const emit = defineEmits(['upd']);

const result = ref({});

watch(() => props.users, (newUsers) => {
    result.value = {};
    newUsers.forEach(user => {
        if (user.group) {
            result.value[user.id] = user.group;
        } else {
            result.value[user.id] = 1;
        }
    });
}, { immediate: true, deep: true });

const isAllUsersGrouped = computed(() => {
    if (!props.users || props.users.length === 0) return false;
    
    return props.users.every(user => 
        result.value[user.id] !== undefined && 
        result.value[user.id] !== null && 
        result.value[user.id] >= 1
    );
});

const validateGroups = () => {
    if (!isAllUsersGrouped.value) {
        store.dispatch('notification/displayMessage', {
            type: 'error',
            value: 'Не все яхтсмены распределены по группам',
        });
        return false;
    }
    
    const groupNumbers = Object.values(result.value);
    const uniqueGroups = [...new Set(groupNumbers)].sort((a, b) => a - b);
    
    for (let i = 0; i < uniqueGroups.length; i++) {
        if (uniqueGroups[i] !== i + 1) {
            store.dispatch('notification/displayMessage', {
                type: 'error',
                value: `Номера групп должны начинаться с 1 и идти последовательно. Обнаружена группа №${uniqueGroups[i]}`,
            });
            return false;
        }
    }
    
    return true;
};

const createGroup = async () => {
    try {
        if (!validateGroups()) {
            return;
        }
        
        const groupsData = {};
        props.users.forEach(user => {
            groupsData[user.id] = parseInt(result.value[user.id]) || 1;
        });
        
        const ans = await axios.post(`/api/admin/stage/${props.id}/create-manual-groups`, {
            groups: groupsData,
        });

        if (ans.data.result) {
            emit('upd');
            store.dispatch('notification/displayMessage', {
                type: 'success',
                value: 'Группы успешно сформированы и этап начат',
            });

        } else {
            store.dispatch('notification/displayMessage', {
                type: 'error',
                value: ans.data.msg || ans.data.error || 'Ошибка при формировании групп',
            });
        }
    } catch (error) {
        console.error('Error creating groups:', error);
        store.dispatch('notification/displayMessage', {
            type: 'error',
            value: error.response?.data?.message || error.response?.data?.msg || 'Ошибка сервера',
        });
    }
};
</script>

<style scoped>
.split-number-input {
    width: 60px;
    height: 40px;
}
</style>