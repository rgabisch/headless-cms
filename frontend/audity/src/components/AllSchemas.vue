<template>
    <v-row>
        <v-col>
            <h1>Schemas</h1>
            <v-container v-if="schemas.length">
                <v-card v-for="schema in schemas"
                        :key="schema.id"
                        class="mt-3"
                        :to="{ name: 'schema', params: { id: schema.id }}"
                >
                    <v-card-title>{{schema.name}}</v-card-title>
                </v-card>
            </v-container>
            <v-container v-else>
                <v-card>
                    <v-card-text>Lass uns dein erstes
                        <router-link :to="{ name: 'createSchema'}">Schema erstellen</router-link>
                    </v-card-text>
                </v-card>
            </v-container>
        </v-col>
        <v-col lg="3" class="ml-5">
            <v-card class="p-3">
                <v-card-title>Aktionen</v-card-title>
            </v-card>
            <v-card class="p-3 mt-3">

            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import axios from "axios";

    export default {
        name: "AllSchemas",
        data: () => ({
            schemas : []
        }),
        mounted() {
            axios.get("http://localhost:3000/schemas",{headers: {'creatorId':1}})
                .then(response => {this.schemas = response.data.schemas})
                .catch(function(error){
                    console.log(error);

                });

        }
    }
</script>

<style scoped>

</style>