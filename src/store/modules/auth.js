import { clone } from 'ramda';
import { createNamespacedHelpers } from 'vuex';
import { nanoid } from 'nanoid';
import { getCode, getToken } from '~/handlers/yandex-auth/renderer';
import { getAccount } from '~/handlers/yandex-login/renderer';

const defaultAuthorizationData = {
    interval: 5,
    expiresAt: null,
    userCode: null,
    deviceCode: null,
    verificationUrl: null,
};

const state = {
    secrets: {
        clientId: null,
        clientSecret: null,
        deviceId: null,
        deviceName: null,
    },
    accounts: [],
    authorizationData: defaultAuthorizationData,
};

const getters = {
    isAuthorized(state) {
        return Boolean(state.accounts.length);
    },
    getAccountById: state => targetAccountId => {
        return state.accounts.find(({ accountId }) => accountId === targetAccountId) || {};
    },
};

const mutations = {
    setAuthorizationData(state, data) {
        state.authorizationData = {
            ...data,
            expiresAt: new Date().getTime() + data.expiresIn * 1000,
        };
    },
    clearAuthorizationData(state) {
        state.authorizationData = clone(defaultAuthorizationData);
    },
    addAccount(state, account) {
        state.accounts.push(account);
    },
    removeAccount(state, account) {
        state.accounts = state.accounts.filter(({ accountId }) => accountId !== account.accountId);
    },
    updateSecrets(state, { name, value }) {
        state.secrets[name] = value;
    },
};

const actions = {
    getCode({ commit, state }) {
        return getCode({ ...state.secrets }).then(data => {
            commit('setAuthorizationData', data);
        });
    },
    async checkAuth({ state, commit }) {
        try {
            const credentials = await getToken({
                deviceCode: state.authorizationData.deviceCode,
                ...state.secrets,
            });
            const account = await getAccount(credentials.accessToken);

            commit('addAccount', {
                ...account,
                accountId: nanoid(),
                credentials,
                avatarUrl: `https://avatars.yandex.net/get-yapic/${account.defaultAvatarId}/islands-retina-50`,
            });
            commit('clearAuthorizationData');

            return true;
        } catch (error) {
            return false;
        }
    },
};

export const NAMESPACE = 'auth';

export const helpers = createNamespacedHelpers(NAMESPACE);

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
