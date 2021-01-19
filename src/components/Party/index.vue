<template>
    <div @click="loadParty">
        <v-icon v-if="!parrotLink" size="60" light>mdi-image-multiple</v-icon>
        <v-img v-if="parrotLink" contain max-height="60" max-width="60" :src="parrotLink" />
    </div>
</template>

<script>
import { getParty } from '~/handlers/party/renderer';

export default {
    name: 'Party',
    data: () => ({
        parrotLink: null,
        isLoading: false,
    }),
    methods: {
        async loadParty() {
            try {
                this.isLoading = true;
                this.parrotLink = await getParty();
                this.isLoading = false;
            } catch (error) {
                this.parrotLink = null;
                this.isLoading = false;
            }
        },
    },
    created() {
        this.loadParty();
    },
};
</script>
