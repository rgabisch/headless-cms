<template>
    <v-app>
        <v-app-bar app class="m-2">
            <v-app-bar-nav-icon class="m-1"><a href="/"><img :src='images.logo' alt="Audity logo" height="30px"></a></v-app-bar-nav-icon>
            <v-spacer></v-spacer>
            <v-btn class="mr-2" fab small href="https://github.com/rgabisch/headless-cms">
               <img :src='images.github' alt="Audity logo" height="30px">
            </v-btn>
            <v-btn class="mr-2" to="/login">Anmelden</v-btn>
            <v-btn color="#FF8E3C" to="/register">Registrieren</v-btn>
        </v-app-bar>

            <v-container class="fill-height" fluid>
                <router-view></router-view>
                <v-row align="center">
                    <v-col class="order-1 mt-10 pa-5" md="7">
                        <v-img :src='images.main' alt="Landing Page Image. Audio Transciption" ></v-img>
                    </v-col>
                    <v-col class="order-2" md="5">
                        <h1 class="display-4 font-weight-light mb-4">Audity</h1>
                        <br/>
                        <h2 class="subheading font-weight-light">Das Headless-CMS,
                            <br>was das Transkribieren
                            <br>von Audiodatein einfach macht.
                        </h2>
                        <br/>
                        <v-btn class="mr-2"
                               color="#FF8E3C"
                               to="/login">
                            Starte jetzt
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
    </v-app>
</template>

<script>
    export default {
        name: "Index",
        data: () => ({
            images: {
                main: require('../assets/img/landing-page.png'),
                logo: require('../assets/img/logo.png'),
                github: require('../assets/img/icon-github.png'),
            }
        })
    }
</script>

<style scoped>
    a {
        text-decoration: none;
    }
</style>