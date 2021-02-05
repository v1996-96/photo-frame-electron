<template>
    <v-dialog
        fullscreen
        content-class="carousel-dialog"
        :value="isCarouselOpened"
        @input="setIsCarouselOpened"
    >
        <v-card>
            <v-carousel
                v-if="imagesOrdered.length"
                :key="viewOrder"
                hide-delimiters
                continuous
                height="600"
                :value="activeImageIndex"
                :interval="interval"
                :cycle="shouldCycle"
                :show-arrows="false"
                @change="setActiveImageIndex"
            >
                <v-carousel-item
                    v-for="image in imagesOrdered"
                    :key="image.imageId"
                    :src="image.src"
                    contain
                />
            </v-carousel>

            <div class="overlay" @click="showControls = !showControls" />

            <v-bottom-sheet v-model="showControls" inset hide-overlay>
                <v-sheet class="sheet">
                    <div class="d-flex pa-3">
                        <v-btn icon class="mr-3" @click="setActiveImageIndex(activeImageIndex - 1)">
                            <v-icon>mdi-rewind</v-icon>
                        </v-btn>
                        <v-btn icon class="mr-3" @click="setShouldCycle(!shouldCycle)">
                            <v-icon v-if="shouldCycle">mdi-pause</v-icon>
                            <v-icon v-else>mdi-play</v-icon>
                        </v-btn>
                        <v-btn icon @click="setActiveImageIndex(activeImageIndex + 1)">
                            <v-icon>mdi-fast-forward</v-icon>
                        </v-btn>

                        <v-spacer />

                        <v-btn icon @click="setIsCarouselOpened(false)">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </div>
                </v-sheet>
            </v-bottom-sheet>
        </v-card>
    </v-dialog>
</template>

<script>
import { helpers as galleryHelpers } from '~/store/modules/gallery';

export default {
    name: 'GalleryCarousel',
    data: () => ({
        showControls: false,
    }),
    computed: {
        ...galleryHelpers.mapState([
            'isCarouselOpened',
            'activeImageIndex',
            'interval',
            'shouldCycle',
            'viewOrder',
            'imagesOrdered',
        ]),
    },
    methods: {
        ...galleryHelpers.mapMutations([
            'setIsCarouselOpened',
            'setActiveImageIndex',
            'setInterval',
            'setShouldCycle',
        ]),
    },
};
</script>

<style>
.carousel-dialog {
    overflow: hidden !important;
}

.overlay {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 5;
    cursor: none;
}

.sheet {
    overflow: hidden;
}
</style>
