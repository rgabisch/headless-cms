<template>
    <v-content transition="slide-x-transition">
        <router-view></router-view>

            <v-container fluid fill-height class="home-hero" style="background-color: #f4bc03">
                <v-layout justify-center align-center column pa-5>
                    <div class="display-4 font-weight-black white--text text-xs-center">
                        DR. STRESS
                    </div>
                    <div class="display-1 font-weight-bold white--text text-xs-center pa-4">
                        {{content.name}}
                    </div>
                    <div class="font-weight-light white--text text-xs-center pa-4">
                        {{content.creationDate}}
                    </div>
                    <div class="mt-5 pa-6" v-for="map in content.mapping" :key="map.type.name">
                        <v-card class="text-center">
                            <div><audio v-if="map.contentURL" controls :src="map.contentURL" class="controlBar"></audio></div>
                            <v-card-text v-html="map.content">{{map.content}}</v-card-text>
                        </v-card>
                    </div>

                </v-layout>
            </v-container>

    </v-content>
</template>

<script>
    import axios from "axios";

    export default {
        name: "Podcast",
        props: ["sid", "cid"],
        data: () => ({
            content: ''
        }),
        methods: {

            getData() {
                axios.get(`http://localhost:3000/api/contents/${this.contentId}/spaces/${this.spaceId}`,{headers: {'creatorId':'5BfgV1AzBNPmb7l2qIX3ur80aLM2'}})
                    .then(response => {this.content = response.data})
                    .catch(function(error){
                        console.log(error);

                    });
            },

        },
        computed: {
            contentId() {
                return this.cid;
            },
            spaceId() {
                return this.sid;
            }
        },
        // when the comonent is displayed, call this method to show all spaces
        async mounted(){
            this.getData();
        }
    }
</script>

<style scoped>

</style>