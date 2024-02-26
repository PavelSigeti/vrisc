<template>
    <AppHeader>Личный кабинет</AppHeader>
    <main>
        <div class="container-fluid g-0">
            <div class="row">
<!--                <div class="col-lg-6 col-xl-5 col-xxl-4">-->
<!--                    <TheTeamSettings />-->
<!--                </div>-->
                <div class="col-lg-12">
                    <div class="dashboard-item">
                        <h3>Актуальные гонки</h3>
                        <div class="dash-stage__container">
                            <AppDashActualStages></AppDashActualStages>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import TheTeamSettings from "../components/user/team/TheTeamSettings.vue";
import AppDashActualStages from "../components/user/dash/AppDashActualStages.vue";
import AppHeader from "@/components/ui/AppHeader.vue";

export default {
    name: "Dashboard",
    components: {
        TheTeamSettings, AppDashActualStages, AppHeader,
    },
    setup() {
        return {
        }
    }
}
</script>

