<template>
    <v-container class="pt-4">
        <page-heading message="До рождения пупсеньки" />
        <timer
            :endsAt="new Date(2022, 1, 26).getTime()"
            :startsAt="new Date(2021, 4, 23).getTime()"
        />
    </v-container>
</template>

<script>
import PageHeading from '~/components/PageHeading';
import Timer from '~/components/Timer';

export default {
    name: 'FamilyTimer',
    components: { PageHeading, Timer },
};
</script>
