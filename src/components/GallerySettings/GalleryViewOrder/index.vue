<template>
    <v-card>
        <v-card-text>
            <v-row align="center" no-gutters>
                <v-col cols="6 text-body-1">
                    Порядок просмотра
                </v-col>

                <v-col cols="6">
                    <v-select
                        :value="viewOrder"
                        :items="VIEW_ORDER_LIST"
                        item-text="label"
                        item-value="value"
                        hide-details
                        solo
                        flat
                        @change="setViewOrderAsync"
                    />
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
import { VIEW_ORDER_LIST } from '~/config/gallery';
import { helpers as galleryHelpers } from '~/store/modules/gallery';

export default {
    name: 'GalleryViewOrder',
    computed: {
        ...galleryHelpers.mapState(['viewOrder']),
    },
    methods: {
        ...galleryHelpers.mapActions(['setViewOrderAsync']),
    },
    created() {
        this.VIEW_ORDER_LIST = VIEW_ORDER_LIST;
    },
};
</script>
