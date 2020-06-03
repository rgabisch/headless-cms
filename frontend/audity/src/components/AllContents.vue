<template>
    <v-row>
        <v-col lg="2"></v-col>
        <v-col>
            <h1>{Space name}</h1>
            <v-container v-if="contents.length">
                <v-card v-for="content in contents"
                        :key="content.id"
                        class="mt-3"
                        :to="{ name: 'content', params: { cid: content.id }}"
                >
                    <v-card-title>{{content.name}}</v-card-title>
                </v-card>
            </v-container>
            <v-container v-else>
                <v-card>
                    <v-card-text>Lass uns deinen ersten
                        <router-link :to="{ name: 'createContent'}">Content erstellen</router-link>
                    </v-card-text>
                </v-card>
            </v-container>
        </v-col>
        <v-col lg="3" class="ml-5">
            <v-card class="p-3">
                <v-card-title>Aktionen</v-card-title>
            </v-card>
            <v-card class="p-3 mt-3">
                {{contents}}
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "AllContents",
        props: ['sid'],
        data: () => ({
            contents: []
        }),
        computed: {
            spaceId() {
                return this.sid
            }
        },
        mounted() {
            axios
                .get('http://localhost:3000/contents/spaces/'+ this.spaceId, {headers: {'creatorId':1}})
                .then(response => (this.contents = response.data))
                .catch(function (error) {
                    console.log(error);
                    alert(error)
                });
            //TODO getSpaceById() for {{ Space name }}
        }
    }
</script>

<style scoped>

</style>