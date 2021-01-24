<template>
    <v-app>
        <navigation />

        <v-main class="main">
            <router-view />
            <gallery-carousel />
        </v-main>
    </v-app>
</template>

<script>
import Navigation from '~/components/Navigation';
import GalleryCarousel from '~/components/GalleryCarousel';

export default {
    name: 'App',
    components: { Navigation, GalleryCarousel },
};
</script>

<style scoped>
.main {
    background-image: url(/sunrise.jpg);
    background-size: 100%;
    background-attachment: fixed;
}
</style>
