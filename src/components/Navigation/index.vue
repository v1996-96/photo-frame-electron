<template>
    <v-navigation-drawer app mini-variant permanent>
        <v-list>
            <v-list-item to="/">
                <v-list-item-icon>
                    <v-icon>mdi-home</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>Главная</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item to="/gallery">
                <v-list-item-icon>
                    <v-icon>mdi-image-multiple</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>Галерея</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item to="/family-timer">
                <v-list-item-icon>
                    <v-icon>mdi-nature-people</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>Галерея</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item to="/news">
                <v-list-item-icon>
                    <v-icon>mdi-newspaper</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>Новости</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item to="/weather">
                <v-list-item-icon>
                    <v-icon>mdi-white-balance-sunny</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>Погода</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item to="/todos">
                <v-list-item-icon>
                    <v-icon>mdi-playlist-check</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>Напоминалки</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>

        <template v-slot:append>
            <v-list>
                <v-list-item to="settings">
                    <v-list-item-icon>
                        <v-icon>mdi-cog</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>Настройки</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </template>
    </v-navigation-drawer>
</template>

<script>
export default {
    name: 'Navigation',
};
</script>
