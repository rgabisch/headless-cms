<template>
    <v-app id="app">
        <v-app-bar app class="">
            <v-app-bar-nav-icon><a href="/"></a></v-app-bar-nav-icon>
            <v-toolbar-title>Demo</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn class="mr-2" :to="{ name: 'aboutMe', params: { sid: this.aboutMe.id, cid: this.aboutMe.content }}">Über mich</v-btn>
        </v-app-bar>

        <v-content transition="slide-x-transition">
            <router-view></router-view>

            <v-container fluid fill-height class="home-hero" style="max-height: 100vh; background-color: #3e65c0">
                <v-layout justify-center align-center column pa-5>
                    <div class="display-4 font-weight-black white--text text-xs-center">
                        DR. STRESS
                    </div>
                    <div class="display-1 font-weight-bold white--text text-xs-center pa-10">
                        Lieben Sie Ihren Stress! Sie brauchen ihn für alles, was Sie noch vorhaben!
                        <br>Denn ohne Stress gibt es keine Lebensfreude und keine Leistungsfähigkeit!
                    </div>
                    <v-btn fab class="mt-5 brown darken-4" href="#about">
                        <v-icon large color="white">mdi-chevron-double-down </v-icon>
                    </v-btn>
                </v-layout>
            </v-container>

            <v-container fluid class="lighten-4" id="about" style="background-color: #c4d1ed" >
                <v-container grid-list-lg>
                    <v-layout column>
                    </v-layout>
                </v-container>
            </v-container>

            <v-container  fluid v-for="space in podcast" grid-list-lg :key="space.space.id" style="background-color: #c4d1ed" >
                <v-layout row>
                    <v-flex xs12 class="text-xs-center display-1 font-weight-black my-5"
                    >{{space.space.name}}</v-flex>
                </v-layout>
                <v-layout row wrap class="meal-plans">
                    <v-flex v-for="content in space.content" :key="content.id" xs12 sm12 md4>
                        <v-card>

                        <v-card-title class="headline white--text">
                            {{content.title}}
                        </v-card-title>
                        <v-card-text class="grey--text">
                            {{content.creationDate}}
                        </v-card-text>


                            <v-card-text>
                                <div>
                                    <h3 class="headline mb-0">{{content.name}}</h3>
                                    <div>
                                        <audio></audio>
                                        {{content.description}}
                                    </div>
                                </div>
                            </v-card-text>

                            <v-card-actions>
                                <v-btn
                                        color="#f4bc03"
                                        :to="{ name: 'podcast', params: { sid: space.space.id, cid: content.id }}"
                                >
                                    Höre zu</v-btn
                                >
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>

                <v-container  fluid v-for="space in blogs" grid-list-lg :key="space.space.id" style="background-color: #c4d1ed" >
                    <v-layout row>
                        <v-flex xs12 class="text-xs-center display-1 font-weight-black my-5"
                        >{{space.space.name}}</v-flex>
                    </v-layout>
                    <v-layout row wrap class="meal-plans">
                        <v-flex v-for="content in space.content" :key="content.id" xs12 sm12 md4>
                            <v-card>

                                <v-card-title class="headline white--text">
                                    {{content.title}}
                                </v-card-title>
                                <v-card-text class="grey--text">
                                    {{content.creationDate}}
                                </v-card-text>


                                <v-card-text>
                                    <div>
                                        <h3 class="headline mb-0">{{content.name}}</h3>
                                        <div>
                                            <audio></audio>
                                            {{content.description}}
                                        </div>
                                    </div>
                                </v-card-text>

                                <v-card-actions>
                                    <v-btn
                                            color="#2dcf79"
                                            :to="{ name: 'blog', params: { sid: space.space.id, cid: content.id }}"
                                    >
                                        Höre zu</v-btn
                                    >
                                </v-card-actions>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>
        </v-content>
    </v-app>
    
</template>

<script>
    import axios from "axios";

    export default {
        name: "Demo",
        data: () => ({
            allSpaces: [],
            about: ''
        }),
        methods: {

            getData() {
                axios.get("http://localhost:3000/api/contents",{headers: {'creatorId':'tvV1kMaboBaVK7diK3ZAm493YXe2'}})
                    .then(response => {this.allSpaces = response.data})
                    .catch(function(error){
                        console.log(error);

                    });
            }

        },
        computed: {
            aboutMe() {
                let space =  this.allSpaces.filter(c => c.space.name === 'Person');
                let context = {};
                for (let i of space) {
                    context.id = i.space.id;
                    for (let j of  i.content){
                        context.content=j.id;
                    }
                }
                return context;
            },
            podcast() {
                return this.allSpaces.filter(c => c.space.name === 'Podcasts');
            },
            blogs() {
                return this.allSpaces.filter(c => c.space.name === 'Blogs');
            }
        },
        // when the comonent is displayed, call this method to show all spaces
        mounted(){
            this.getData();
        }
    }
</script>

<style scoped>

</style>