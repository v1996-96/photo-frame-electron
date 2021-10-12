import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import duration from 'dayjs/plugin/duration';

dayjs.locale('ru');
dayjs.extend(duration);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App),
}).$mount('#app');
