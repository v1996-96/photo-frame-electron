<template>
    <div>
        <v-virtual-scroll v-if="images.length" :items="imagesBy4" height="450" item-height="174">
            <template #default="{ item: imagesRow, index: rowIndex }">
                <div class="images-row">
                    <v-img
                        v-for="(image, imageIndex) in imagesRow"
                        :key="image.imageId"
                        :src="image.src"
                        height="150"
                        class="grey lighten-2"
                        @click="handleClickImage(rowIndex, imageIndex)"
                    />
                </div>
            </template>
        </v-virtual-scroll>

        <v-alert v-if="!images.length" type="info">
            Выберите папки с фотографиями и загрузите список фотографий в настройках.
        </v-alert>
    </div>
</template>

<script>
import { helpers as galleryHelpers } from '~/store/modules/gallery';

export default {
    name: 'GalleryImages',
    computed: {
        ...galleryHelpers.mapState(['images']),
        ...galleryHelpers.mapGetters(['imagesBy4']),
    },
    methods: {
        ...galleryHelpers.mapMutations(['setIsCarouselOpened', 'setActiveImageIndex']),

        handleClickImage(rowIndex, imageIndex) {
            this.setActiveImageIndex(rowIndex * 4 + imageIndex);
            this.setIsCarouselOpened(true);
        },
    },
};
</script>

<style scoped>
.images-row {
    columns: 4;
    column-gap: 24px;
}
</style>
