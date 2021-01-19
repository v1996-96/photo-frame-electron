<template>
    <div v-if="images.length">
        <v-virtual-scroll :items="imagesBy4" height="600" item-height="174">
            <template #default="{ item }">
                <v-row :key="item[0]._id">
                    <v-col
                        v-for="image in item"
                        :key="image._id"
                        class="d-flex child-flex"
                        cols="3"
                    >
                        <delayed :wait="100">
                            <v-img :src="image.src" height="150" class="grey lighten-2" />
                        </delayed>
                    </v-col>
                </v-row>
            </template>
        </v-virtual-scroll>
    </div>
</template>

<script>
import { helpers as galleryHelpers } from '~/store/modules/gallery';
import Delayed from '~/components/Delayed';

export default {
    name: 'GalleryImages',
    components: { Delayed },
    computed: {
        ...galleryHelpers.mapState(['images']),
        ...galleryHelpers.mapGetters(['imagesBy4']),
    },
};
</script>
