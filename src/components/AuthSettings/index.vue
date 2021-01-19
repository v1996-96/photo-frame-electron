<template>
    <v-form>
        <v-text-field
            :value="secrets.clientId"
            @input="handleInput($event, 'clientId')"
            label="ClientId"
        />
        <v-text-field
            :value="secrets.clientSecret"
            @input="handleInput($event, 'clientSecret')"
            label="Client Secret"
        />
        <v-text-field
            :value="secrets.deviceId"
            @input="handleInput($event, 'deviceId')"
            label="DeviceId"
        />
        <v-text-field
            :value="secrets.deviceName"
            @input="handleInput($event, 'deviceName')"
            label="Device Name"
        />
    </v-form>
</template>

<script>
import { helpers as authHelpers } from '~/store/modules/auth';

export default {
    name: 'AuthSettings',
    computed: {
        ...authHelpers.mapState(['secrets']),
    },
    methods: {
        ...authHelpers.mapMutations(['updateSecrets']),

        handleInput(value, name) {
            this.updateSecrets({ name, value });
        },
    },
};
</script>
