<template>
    <div>
        <v-list v-if="isAuthorized || !authorizationData.userCode">
            <v-list-item v-for="account in accounts" :key="account.id">
                <v-list-item-avatar>
                    <v-avatar color="primary" size="56">
                        <img :src="account.avatarUrl" />
                    </v-avatar>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title>{{ account.realName }}</v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                    <v-btn depressed @click="removeAccount(account)">Выйти</v-btn>
                </v-list-item-action>
            </v-list-item>

            <v-list-item v-if="!authorizationData.userCode" @click="handleClickGetCode">
                <v-list-item-avatar>
                    <v-avatar size="56">
                        <v-icon>
                            mdi-plus
                        </v-icon>
                    </v-avatar>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title>Добавить аккаунт</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>

        <v-card v-if="authorizationData.userCode" elevation="0" class="mt-4">
            <v-card-title>
                Авторизуйтесь, перейдя по ссылке
                <v-spacer />
                <a class="text-body-1 text-decoration-none">
                    {{ authorizationData.verificationUrl }}
                </a>
            </v-card-title>
            <v-card-text>
                <h3 class="text-h3">{{ authorizationData.userCode }}</h3>
            </v-card-text>
            <v-card-actions>
                <v-btn text color="primary" @click="handleClickGetCode">Обновить код</v-btn>
                <v-btn text @click="clearAuthorizationData">Отменить</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import { LongPolling } from '~/utils/long-polling';
import { helpers as authHelpers } from '~/store/modules/auth';

export default {
    name: 'Auth',
    data: () => ({
        pollingInstance: null,
    }),
    computed: {
        ...authHelpers.mapState(['authorizationData', 'accounts']),
        ...authHelpers.mapGetters(['isAuthorized']),
    },
    methods: {
        ...authHelpers.mapMutations(['clearAuthorizationData', 'removeAccount']),
        ...authHelpers.mapActions(['getCode', 'checkAuth']),

        handleClickGetCode() {
            this.getCode().then(() => this.startPolling());
        },
        checkAuthWraper() {
            const { expiresAt, userCode } = this.authorizationData;

            if (!userCode || new Date().getTime() > expiresAt) {
                this.pollingInstance.stop();
            } else {
                this.checkAuth();
            }
        },
        startPolling() {
            const { interval, expiresAt } = this.authorizationData;
            const timeout = interval * 1000;

            if (!expiresAt) {
                return;
            }

            if (!this.pollingInstance) {
                this.pollingInstance = new LongPolling(this.checkAuthWraper, timeout, {
                    ignoreFailures: true,
                });
            }

            this.pollingInstance.stop();
            this.pollingInstance.setTimeout(timeout);
            this.pollingInstance.start();
        },
    },
    beforeDestroy() {
        if (this.pollingInstance) {
            this.pollingInstance.stop();
        }
    },
};
</script>
