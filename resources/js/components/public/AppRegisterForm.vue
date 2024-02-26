<template>
    <div class="modal">
        <div class="modal-background" @click="$emit('close');"></div>
        <div class="modal-container">
            <div class="close" @click="$emit('close');"></div>
            <AppLoader v-if="loading" />
            <h2>Регистрация</h2>
            <div class="reg-info form-info">
                У вас должен быть аккаунт в Virtual Regatta, создать можно – <a class="underline link" href="https://www.virtualregatta.com/en/inshore-game/" target="_blank">здесь</a>
            </div>
            <TheRegisterFormWizard :validation-schema="schema" @submitForm="register" @switchReg="switchToLogIn" />
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import * as yup from "yup";
import TheRegisterFormWizard from "./TheRegisterFormWizard.vue";
import {useStore} from "vuex";
import AppLoader from "../ui/AppLoader.vue";

export default {
    name: "AppRegisterForm",
    emits: ['close', 'switchReg'],
    components: {
        TheRegisterFormWizard, AppLoader,
    },
    setup(_, {emit}) {
        const step = ref(0);
        const store = useStore();

        const loading = ref(false);

        const schema = [
            yup.object({
                email: yup.string().required('Введите E-mail').email('Не корректный E-mail'),
                password: yup.string().required('Введите пароль').min(8, 'Пароль от 8 символов'),
                password_confirmation: yup
                    .string()
                    .required('Введите пароль')
                    .oneOf([yup.ref('password')], 'Пароли должны совподать'),
            }),
            yup.object({
                surname: yup.string().required('Введите фамилию').min(2, 'От 2-х симвоволов'),
                name: yup.string().required('Введите имя').min(2, 'От 2-х симвоволов'),
                nickname: yup.string().required('Введите никнейм').min(2),
                university_id: yup.object().nullable(),
            }),
        ];
        const register = async (data) => {
            try {
                loading.value = true;
                await axios.get('/sanctum/csrf-cookie');
                data.university_id = data.university_id ? data.university_id.code : null;
                await axios.post('/register', data);
                store.dispatch('auth/login', {
                    email: data.email,
                    password: data.password,
                });
            } catch (e) {
                console.log(e.message);
                store.dispatch('notification/displayMessage', {
                    value: 'Ошибка! Попробуйте ввести другие данные или обновить страницу',
                    type: 'error',
                });
                loading.value = false;
            }
        };

        const switchToLogIn = () => {
            emit('switchReg');
        };
        return {
            register, step, loading,
            schema, switchToLogIn
        };
    }
}
</script>

<style scoped>

</style>
