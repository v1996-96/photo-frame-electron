<template>
    <v-slider
        hide-details
        :label="`Яркость ${percentage}`"
        :value="backlightValue"
        :min="200"
        :max="1000"
        :step="10"
        @change="handleChangeBacklight"
    />
</template>

<script>
import { setBacklight } from '~/handlers/rpi/renderer';
import { helpers as settingsHelpers } from '~/store/modules/settings';

export default {
    name: 'Backlight',
    computed: {
        ...settingsHelpers.mapState(['settings']),
        backlightValue() {
            return this.settings.backlight?.value || 1000;
        },
        percentage() {
            return `${Math.ceil(((this.backlightValue - 200) / 800) * 100)}%`;
        },
    },
    methods: {
        ...settingsHelpers.mapMutations(['updateSettings']),
        handleChangeBacklight(value) {
            this.updateSettings({ backlight: { value } });
            setBacklight(value);
        },
    },
};
</script>
