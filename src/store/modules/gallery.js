import { nanoid } from 'nanoid';
import { groupBy, pathOr, prop, splitEvery } from 'ramda';
import { createNamespacedHelpers } from 'vuex';
import { VIEW_ORDER, VIEW_ORDER_HANDLERS } from '~/config/gallery';
import { getResources } from '~/handlers/yandex-disk/renderer';

const state = {
    selectedPaths: [],
    images: [],
    imagesOrdered: [],
    isLoadingImages: false,

    isCarouselOpened: false,
    activeImageIndex: null,
    interval: 30 * 60 * 1000,
    shouldCycle: true,
    viewOrder: VIEW_ORDER.default,
};

const getters = {
    selectedPathsGroupedByAccounts(state) {
        return groupBy(prop('accountId'), state.selectedPaths);
    },
    selectedPathsByAccountId: state => accountId => {
        return (
            state.selectedPaths
                .filter(path => path.accountId === accountId)
                .map(({ path }) => path) || []
        );
    },
    imagesBy4(state) {
        return splitEvery(4, state.images);
    },
};

const mutations = {
    setSelectedPaths(state, selectedPaths) {
        state.selectedPaths = selectedPaths;
    },
    clearSelectedPathsByAccountId(state, accountId) {
        state.selectedPaths = state.selectedPaths.filter(path => path.accountId !== accountId);
    },
    addSelectedPaths(state, { paths, accountId }) {
        const newSelectedPaths = paths.map(path => ({
            path,
            accountId,
            pathId: nanoid(),
        }));

        state.selectedPaths = [...state.selectedPaths, ...newSelectedPaths];
    },
    removeSelectedPath(state, { pathId }) {
        state.selectedPaths = state.selectedPaths.filter(path => path.pathId !== pathId);
    },

    setIsLoadingImages(state, value) {
        state.isLoadingImages = value;
    },
    addImages(state, images) {
        state.images = [...state.images, ...images];
    },
    clearImages(state) {
        state.images = [];
    },
    setImagesOrdered(state, imagesOrdered) {
        state.imagesOrdered = imagesOrdered;
    },
    addImagesOrdered(state, images) {
        state.imagesOrdered = [...state.imagesOrdered, ...images];
    },

    setIsCarouselOpened(state, isCarouselOpened) {
        state.isCarouselOpened = isCarouselOpened;
    },
    setActiveImageIndex(state, activeImageIndex) {
        state.activeImageIndex = activeImageIndex;
    },
    setInterval(state, interval) {
        state.interval = interval;
    },
    setShouldCycle(state, shouldCycle) {
        state.shouldCycle = shouldCycle;
    },
    setViewOrder(state, viewOrder) {
        state.viewOrder = viewOrder;
    },
};

const actions = {
    async loadImages({ commit, dispatch, state, rootGetters }) {
        commit('clearImages');
        commit('setImagesOrdered', []);
        commit('setIsLoadingImages', true);

        for (const selectedPath of state.selectedPaths) {
            const { path, pathId, accountId } = selectedPath;
            const account = rootGetters['auth/getAccountById'](accountId);

            const response = await getResources({
                token: account.credentials.accessToken,
                params: {
                    path,
                    limit: 10000,
                    offset: 0,
                    preview_crop: true,
                    preview_size: 'XXL',
                },
            });

            const files = pathOr([], ['embedded', 'items'], response);
            const images = files
                .filter(({ mediaType }) => mediaType === 'image')
                .map(file => ({
                    ...file,
                    src: `${file.preview}&token=${account.credentials.accessToken}`,
                    imageId: nanoid(),
                    pathId,
                    accountId,
                }));

            commit('addImages', images);
            commit('addImagesOrdered', images);
        }

        await dispatch('setViewOrderAsync', state.viewOrder);

        commit('setIsLoadingImages', false);
    },
    setViewOrderAsync({ commit, state }, viewOrder) {
        return new Promise(resolve => {
            commit('setViewOrder', viewOrder);
            commit('setActiveImageIndex', null);
            commit('setImagesOrdered', VIEW_ORDER_HANDLERS[state.viewOrder](state.images));
            resolve();
        });
    },
};

export const NAMESPACE = 'gallery';

export const helpers = createNamespacedHelpers(NAMESPACE);

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
