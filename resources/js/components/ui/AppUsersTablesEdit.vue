<template>
    <table v-if="props.users && props.users.length > 0" class="result-table">
        <thead>
            <tr>
                <th>#</th>
                <th>Яхтсмен</th>
                <th>Группа</th>
                <th>Удаление</th>
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
                <td>
                    <button class="btn btn-default btn-settings" @click="remove(user.id)">Удалить</button>
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
    }, 
    status: {
        type: String,
        required: true
    }
});

const emit = defineEmits(['create-groups', 'users-updated']);
const status = ref(props.status);
const result = ref({});

const init = (usersArray) => {
    const groups = {};
    
    if (usersArray && usersArray.length > 0) {
        usersArray.forEach(user => {
            groups[user.id] = 1;
        });
    }
    
    result.value = groups;
};

init(props.users);

const validateGroups = () => {
    const allUsersGrouped = props.users.every(user => 
        result.value[user.id] !== undefined && 
        result.value[user.id] !== null && 
        result.value[user.id] >= 1
    );
    
    if (!allUsersGrouped) {
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
            status.value = ans.data.status;
            emit('create-groups', ans.data.status);
            store.dispatch('notification/displayMessage', {
                type: 'primary',
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

const remove = async (userId) => {
    const ans = await axios.post(`/api/admin/stage/${props.id}/remove-user/${userId}`);
    if (ans.data.result) {
        emit('users-updated');
        store.dispatch('notification/displayMessage', {
            type: 'primary',
            value: 'Участник удален'
        });
    } else {
        store.dispatch('notification/displayMessage', {
            type: 'error',
            value: ans.data.msg,
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