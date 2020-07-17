<template>
    <v-container fluid fill-height class="home-hero" style="background-color: #3e65c0">
        <v-layout justify-center align-center column pa-5>
            <div class="display-4 font-weight-black white--text text-xs-center">
                {{content.name}}
            </div>
            <div class="mt-5 pa-6" v-for="map in content.mapping" :key="map.type.name">
                <v-card class="text-center" style="background-color: #c4d1ed">
                    <v-card-text v-html="map.content">{{map.content}}</v-card-text>
                </v-card>
            </div>

        </v-layout>
    </v-container>
</template>

<script>
    import axios from "axios";

    export default {
        name: "About",
        props: ["sid", "cid"],
        data: () => ({
            content: ''
        }),
        methods: {

            getData() {
                axios.get(`http://localhost:3000/api/contents/${this.contentId}/spaces/${this.spaceId}`,{headers: {'creatorId':'tvV1kMaboBaVK7diK3ZAm493YXe2'}})
                    .then(response => {this.content = response.data})
                    .catch(function(error){
                        console.log(error);

                    });
            },

        },
        computed: {
            contentId() {
                console.log(this.cid)
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