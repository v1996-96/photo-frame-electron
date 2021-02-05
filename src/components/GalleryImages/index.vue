<template>
    <div>
        <v-virtual-scroll v-if="images.length" :items="imagesBy4" height="450" item-height="174">
            <template #default="{ item: imagesRow }">
                <div class="images-row">
                    <v-img
                        v-for="image in imagesRow"
                        :key="image.imageId"
                        :src="image.src"
                        height="150"
                        class="grey lighten-2"
                        @click="handleClickImage(image)"
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
import { propEq, findIndex } from 'ramda';
import { helpers as galleryHelpers } from '~/store/modules/gallery';

export default {
    name: 'GalleryImages',
    computed: {
        ...galleryHelpers.mapState(['images', 'imagesOrdered']),
        ...galleryHelpers.mapGetters(['imagesBy4']),
    },
    methods: {
        ...galleryHelpers.mapMutations(['setIsCarouselOpened', 'setActiveImageIndex']),

        handleClickImage({ imageId }) {
            const imageIndex = findIndex(propEq('imageId', imageId), this.imagesOrdered);
            this.setActiveImageIndex(imageIndex >= 0 ? imageIndex : 0);
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
