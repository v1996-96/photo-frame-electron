<template>
    <v-slider
        hide-details
        :label="label"
        :value="interval"
        :min="min"
        :max="max"
        :step="step"
        @change="setInterval"
    />
</template>

<script>
import { helpers as galleryHelpers } from '~/store/modules/gallery';

export default {
    name: 'GalleryInterval',
    props: {
        withLabel: {
            type: Boolean,
            default: false,
        },
    },
    data: () => ({
        min: 5 * 60 * 1000,
        max: 60 * 60 * 1000,
        step: 5 * 60 * 1000,
    }),
    computed: {
        ...galleryHelpers.mapState(['interval']),
        minutes() {
            return Math.ceil(this.interval / (60 * 1000));
        },
        label() {
            return this.withLabel ? `Скорость прокрутки ${this.minutes} мин` : '';
        },
    },
    methods: {
        ...galleryHelpers.mapMutations(['setInterval']),
    },
};
</script>
