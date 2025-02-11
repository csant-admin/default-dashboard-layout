<template>
    <v-app>
        <v-app-bar
            density="compact"
            :class="isProduction ? 'prod-color' : 'dev-color'"
        >
            <v-app-bar-nav-icon 
                @click.stop="drawer = !drawer"
                >
            </v-app-bar-nav-icon>
            <v-toolbar-title>Dashboard</v-toolbar-title>
        </v-app-bar>
        <v-container fluid>
            <v-row no-gutters>
                <v-navigation-drawer
                    v-model="drawer"
                    :mini-variant.sync="mini"
                    permanent
                    :class="isProduction ? 'custom-drawer-layout-prod' : 'custom-drawer-layout-dev'"
                >
                    <v-list-item class="px-2">
                        <v-list-item-title>Dashboard</v-list-item-title>
                        <!-- <v-btn
                            icon
                            @click.stop="drawer = !drawer"
                        >
                            <v-icon>mdi-chevron-left</v-icon>
                        </v-btn> -->
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list dense>
                        <v-list-item
                            v-for="item in items"
                            :key="item.title"
                            link
                            >
                            <v-list-item-content>
                                <v-list-item-title
                                    v-if="item.title !== 'Logout'"
                                    class="ma-2"
                                    >
                                    <v-icon>{{ item.icon }}</v-icon>
                                    <span
                                        class="pa-2 nav-title"
                                        >{{ item.title }}
                                    </span>
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item 
                            v-if="items.some(item => item.title === 'Logout')" link>
                                <v-list-item-content>
                                    <v-list-item-title
                                        class="ma-2"
                                        >
                                        <v-icon>{{ items.find(item => item.title === 'Logout').icon }}</v-icon>
                                        <span
                                            class="pa-2 nav-title"
                                            >{{ items.find(item => item.title === 'Logout').title }}
                                        </span>
                                    </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-navigation-drawer>
                <v-main>
                    <v-container fluid>
                        <slot />
                    </v-container>
                </v-main>
            </v-row>
        </v-container>
    </v-app>
</template>
<script setup>
    import { ref } from 'vue'
    const drawer = ref(true)
    const mini = ref(false)
    const items = [
        { title: 'Dashboard', icon: 'mdi-view-dashboard' },
        { title: 'Account', icon: 'mdi-account' },
        { title: 'Settings', icon: 'mdi-cog' },
        { title: 'Logout', icon: 'mdi-logout' },
    ];

    const isProduction = import.meta.env.PROD;
</script>
<style scoped>
    .prod-color {
        background: #107DAC !important;
        color: white !important;
    }
    .dev-color {
        background: linear-gradient(to left, #9C27B0, #E1BEE7) !important;
        /* background: #000 !important; */
        color: #000 !important;
    }
    .custom-drawer-layout-prod {
        display: flex;
        background: #107DAC !important;
        border-top-right-radius: 5px !important;
        border-bottom-right-radius: 10px !important;
        box-shadow: 1px 2px 2px rgb(54, 53, 53) !important;
        color: white !important;
    }
    .custom-drawer-layout-dev {
        display: flex;
        /* background: linear-gradient(to bottom, #9C27B0, #E1BEE7) !important; */
        background: linear-gradient(to top, #9C27B0, #E1BEE7) !important;
        border-top-right-radius: 5px !important;
        border-bottom-right-radius: 10px !important;
        box-shadow: 1px 4px 4px rgb(54, 53, 53) !important;
        color: #000 !important;
    }
    .nav-title {
        font-weight: 600 !important;
    }
</style>
