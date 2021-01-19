<template>
    <v-container class="pt-4">
        <page-heading message="Настройки" />

        <v-card class="mb-4">
            <v-card-text>
                <backlight />
            </v-card-text>
            <v-card-actions>
                <v-btn @click="handleClickToggleFullscreen">Во весь экран</v-btn>
            </v-card-actions>
        </v-card>

        <v-expansion-panels>
            <v-expansion-panel>
                <v-expansion-panel-header>
                    Аккаунты
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <accounts />
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-container>
</template>

<script>
import PageHeading from '~/components/PageHeading';
import Backlight from '~/components/Backlight';
import Accounts from '~/components/Accounts';
import { toggleFullscreen } from '~/handlers/fullscreen/renderer';

export default {
    name: 'Settings',
    components: { PageHeading, Backlight, Accounts },
    methods: {
        handleClickToggleFullscreen() {
            toggleFullscreen();
        },
    },
};
</script>
