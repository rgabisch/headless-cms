<template>
    <v-row>
        <v-col lg="2"></v-col>
        <v-col>
            <h1>{{content.name}}</h1>
            <p>{{content.schema.name}}</p>
            <v-card class="p-3 mt-3 text-center">
                <div class="p-3" v-for="map in content.mapping" :key="map.type.name">
                    <v-card>
                        <v-card-subtitle>{{map.type.name}}</v-card-subtitle>
                        <v-card-text>{{map.content}}</v-card-text>
                    </v-card>
                </div>
            </v-card>
        </v-col>
        <v-col lg="3" class="ml-5">
            <v-card class="p-3">
                <v-card-title>Aktionen</v-card-title>
                <v-btn
                        class="mt-3"
                        block
                        color="#FF8E3C"
                >Veröffentlichen
                </v-btn>
            </v-card>
            <v-card class="p-3 mt-3">
                {{content}}
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import axios from "axios";

    export default {
        name: "Content",
        props: ['sid','cid'],
        data: () => ({
            content: '',

        }),
        computed: {
            contentId() {
                return this.cid
            },
            spaceId() {
                return this.sid
            },
        },
        mounted() {
            axios.get('http://localhost:3000/contents/'+ this.contentId +'/spaces/' + this.spaceId,
                {headers: {'creatorId':1}})
                .then(response => (this.content = response.data))
                .catch(function (error) {
                    console.log(error);
                });
        },

    }
</script>

<style scoped>

</style>