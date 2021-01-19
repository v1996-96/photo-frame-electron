import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '~/store';
import Home from '~/views/Home';
import Settings from '~/views/Settings';
import Gallery from '~/views/Gallery';
import News from '~/views/News';
import Weather from '~/views/Weather';
import Todos from '~/views/Todos';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/gallery',
        name: 'Gallery',
        component: Gallery,
    },
    {
        path: '/news',
        name: 'News',
        component: News,
    },
    {
        path: '/weather',
        name: 'Weather',
        component: Weather,
    },
    {
        path: '/todos',
        name: 'Todos',
        component: Todos,
    },
    {
        path: '/settings',
        name: 'Settings',
        component: Settings,
    },
];

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes,
});

// Подождать восстановления сторы перед показом страниц
router.beforeEach(async (to, from, next) => {
    await store.restored;
    next();
});

export default router;
