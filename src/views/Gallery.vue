<template>
    <v-container class="pt-4">
        <page-heading message="Галерея">
            <v-btn
                v-if="!showSettings"
                fab
                color="accent"
                class="mr-2"
                @click="setIsCarouselOpened(true)"
            >
                <v-icon dark>
                    mdi-play
                </v-icon>
            </v-btn>

            <v-btn fab @click="showSettings = !showSettings">
                <v-icon dark>
                    mdi-cog
                </v-icon>
            </v-btn>
        </page-heading>

        <gallery-images v-if="!showSettings" />
        <gallery-settings v-if="showSettings" />
    </v-container>
</template>

<script>
import { helpers as galleryHelpers } from '~/store/modules/gallery';
import PageHeading from '~/components/PageHeading';
import GallerySettings from '~/components/GallerySettings';
import GalleryImages from '~/components/GalleryImages';

export default {
    name: 'Gallery',
    components: { PageHeading, GallerySettings, GalleryImages },
    data: () => ({
        showSettings: false,
    }),
    methods: {
        ...galleryHelpers.mapMutations(['setIsCarouselOpened']),
    },
};
</script>
