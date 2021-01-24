<template>
    <div>
        <v-card class="mb-4">
            <v-card-text>
                <gallery-interval with-label />
            </v-card-text>
        </v-card>

        <v-card>
            <v-tabs v-model="selectedTab">
                <v-tab>
                    Выбранные папки
                </v-tab>
                <v-tab v-for="account in accounts" :key="account.id">
                    <v-avatar color="primary" size="30" class="mr-3">
                        <img :src="account.avatarUrl" />
                    </v-avatar>
                    {{ account.realName }}
                </v-tab>
            </v-tabs>

            <v-tabs-items v-model="selectedTab">
                <v-tab-item>
                    <template v-if="!selectedPaths.length">
                        <v-card>
                            <v-card-text>
                                Выберите папки с фото
                            </v-card-text>
                        </v-card>
                    </template>

                    <template v-for="accountId in Object.keys(groupedPaths)">
                        <v-list
                            v-if="groupedPaths[accountId] && groupedPaths[accountId].length"
                            :key="accountId"
                            subheader
                            dense
                        >
                            <v-subheader>{{ getAccountById(accountId).realName }}</v-subheader>

                            <v-list-item
                                v-for="selectedPath in groupedPaths[accountId]"
                                :key="selectedPath.path"
                            >
                                <v-list-item-content>{{ selectedPath.path }}</v-list-item-content>

                                <v-list-item-action class="ma-0">
                                    <v-btn icon @click="removeSelectedPath(selectedPath)">
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                </v-list-item-action>
                            </v-list-item>
                        </v-list>
                    </template>
                </v-tab-item>

                <v-tab-item v-for="account in accounts" :key="account.accountId">
                    <disk-structure
                        :account="account"
                        :selected-paths="getPathsByAccountId(account.accountId)"
                        @change="handleChangeSelectedPaths($event, account.accountId)"
                    />
                </v-tab-item>
            </v-tabs-items>

            <v-card-actions v-if="selectedPaths.length" class="mt-4">
                <v-btn color="secondary" :loading="isLoadingImages" @click="loadImages">
                    Загрузить фотографии
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import { helpers as authHelpers } from '~/store/modules/auth';
import { helpers as galleryHelpers } from '~/store/modules/gallery';
import DiskStructure from '~/components/DiskStructure';
import GalleryInterval from '~/components/GalleryInterval';

export default {
    name: 'GallerySettings',
    components: { DiskStructure, GalleryInterval },
    data: () => ({
        selectedTab: null,
    }),
    computed: {
        ...galleryHelpers.mapState(['selectedPaths', 'isLoadingImages']),
        ...galleryHelpers.mapGetters({
            groupedPaths: 'selectedPathsGroupedByAccounts',
            getPathsByAccountId: 'selectedPathsByAccountId',
        }),
        ...authHelpers.mapState(['accounts']),
        ...authHelpers.mapGetters(['isAuthorized', 'getAccountById']),
    },
    methods: {
        ...galleryHelpers.mapActions(['loadImages']),
        ...galleryHelpers.mapMutations([
            'addSelectedPaths',
            'clearSelectedPathsByAccountId',
            'removeSelectedPath',
        ]),

        handleChangeSelectedPaths(paths, accountId) {
            this.clearSelectedPathsByAccountId(accountId);
            this.addSelectedPaths({ paths, accountId });
        },
    },
};
</script>
