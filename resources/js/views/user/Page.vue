<template>
    <AppHeader>{{page.title}}</AppHeader>
    <main>
        <div class="container-fluid g-0">
            <div class="row">
                <div class="col-12 page-text" v-html="page.text"></div>
            </div>
        </div>
    </main>
</template>

<script setup>
import {onBeforeMount, ref} from "vue";
import {useRoute} from "vue-router";
import AppHeader from "@/components/ui/AppHeader.vue";

const page = ref({});
const route = useRoute();

onBeforeMount(async ()=>{
    const data = await axios.get(`/api/page/${route.params.slug}`);
    page.value = data.data;
});
</script>

<style scoped lang="scss">

</style>
