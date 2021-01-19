import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import localforage from 'localforage';
import auth from './modules/auth';
import settings from './modules/settings';
import gallery from './modules/gallery';

const persist = new VuexPersistence({
    storage: localforage,
    asyncStorage: true,
});

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [persist.plugin],
    modules: {
        auth,
        settings,
        gallery,
    },
});
