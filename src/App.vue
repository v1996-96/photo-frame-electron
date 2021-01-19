<template>
    <v-app>
        <navigation />

        <v-main class="main">
            <router-view v-if="true" />

            <v-container v-if="false" class="pt-4">
                <v-alert prominent type="error">
                    <v-row align="center">
                        <v-col class="grow">
                            Произошла какая-то ошибка :(
                        </v-col>
                        <v-col class="shrink">
                            <v-btn @click="loadPrerequisites">Перезагрузить</v-btn>
                        </v-col>
                    </v-row>
                </v-alert>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import Navigation from '~/components/Navigation';

export default {
    name: 'App',
    components: { Navigation },
};
</script>

<style scoped>
.main {
    background-image: url(/sunrise.jpg);
    background-size: 100%;
    background-attachment: fixed;
}
</style>
