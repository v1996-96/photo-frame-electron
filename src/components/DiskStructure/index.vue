<template>
    <div>
        <v-skeleton-loader v-if="!items.length" type="paragraph" class="pa-2" />

        <v-treeview
            v-if="items.length"
            dense
            transition
            :items="items"
            :load-children="fetchChildren"
        >
            <template #prepend="{ item }">
                <v-simple-checkbox
                    color="red"
                    :value="isSelected(item)"
                    @input="handleSelect(item, $event)"
                />
            </template>
        </v-treeview>
    </div>
</template>

<script>
import { nanoid } from 'nanoid';
import { getResources } from '~/handlers/yandex-disk/renderer';

export default {
    name: 'DiskStructure',
    model: {
        prop: 'selectedPaths',
        event: 'change',
    },
    props: {
        account: {
            type: Object,
            required: true,
        },
        selectedPaths: {
            type: Array,
            default: () => [],
        },
    },
    data: () => ({
        isLoading: false,
        items: [],
    }),
    watch: {
        async account() {
            if (this.account) {
                this.items = await this.fetchDirs();
            }
        },
    },
    methods: {
        isSelected(item) {
            return this.selectedPaths.includes(item.path);
        },
        handleSelect(item, isSelected) {
            let newSelectedPaths = this.selectedPaths;

            if (isSelected) {
                newSelectedPaths = [...this.selectedPaths, item.path];
            } else {
                newSelectedPaths = this.selectedPaths.filter(path => path !== item.path);
            }

            this.$emit('change', newSelectedPaths);
        },
        fetchChildren(item) {
            return this.fetchDirs(item.path).then(children => {
                item.children = children;

                return item;
            });
        },
        async fetchDirs(path = '/') {
            try {
                this.isLoading = true;

                const response = await getResources({
                    token: this.account.credentials.accessToken,
                    params: {
                        limit: 10000,
                        offset: 0,
                        path,
                    },
                });

                this.isLoading = false;
                const rawItems = response?.embedded?.items || [];

                const dirs = rawItems
                    .filter(({ type }) => type === 'dir')
                    .map(item => ({
                        pathId: nanoid(),
                        name: item.name,
                        path: item.path,
                        created: item.created,
                        modified: item.modified,
                        type: item.type,
                        children: [],
                    }));

                return dirs;
            } catch (error) {
                console.log(error);
                this.isLoading = false;
                return [];
            }
        },
    },
    async created() {
        if (this.account) {
            this.items = await this.fetchDirs();
        }
    },
};
</script>
