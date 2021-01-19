import { mergeDeepRight } from 'ramda';
import { createNamespacedHelpers } from 'vuex';

const state = {
    settings: {
        backlight: {
            value: 1000,
        },
    },
};

const getters = {};

const mutations = {
    setSettings(state, settings) {
        state.settings = settings;
    },
    updateSettings(state, settings) {
        state.settings = mergeDeepRight(state.settings, settings);
    },
};

const actions = {};

export const NAMESPACE = 'settings';

export const helpers = createNamespacedHelpers(NAMESPACE);

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
