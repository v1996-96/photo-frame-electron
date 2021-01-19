<template>
    <v-container class="pt-4">
        <page-heading message="Галерея" />

        <div class="mb-10">
            <v-btn color="accent" x-large class="mr-4" @click="showCarousel = !showCarousel">
                Показать фоточки
            </v-btn>
            <v-btn color="info" x-large class="mr-4" @click="showSettings = !showSettings">
                {{ showSettings ? 'Закрыть настройки' : 'Настроить' }}
            </v-btn>
            <v-btn x-large :loading="isLoadingImages" @click="loadImages">Сбросить кэш</v-btn>
        </div>

        <gallery-images v-if="!showSettings && !showCarousel" />
        <gallery-carousel v-model="showCarousel" />
        <gallery-settings v-if="showSettings" />
    </v-container>
</template>

<script>
import { helpers as galleryHelpers } from '~/store/modules/gallery';
import PageHeading from '~/components/PageHeading';
import GallerySettings from '~/components/GallerySettings';
import GalleryImages from '~/components/GalleryImages';
import GalleryCarousel from '~/components/GalleryCarousel';

export default {
    name: 'Gallery',
    components: { PageHeading, GallerySettings, GalleryImages, GalleryCarousel },
    data: () => ({
        showSettings: false,
        showCarousel: false,
    }),
    computed: {
        ...galleryHelpers.mapState(['isLoadingImages']),
    },
    methods: {
        ...galleryHelpers.mapActions(['loadImages']),
    },
};
</script>
