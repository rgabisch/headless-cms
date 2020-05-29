<template>
    <v-row>
        <v-col lg="2"></v-col>
        <v-col>
            <h1>Schemas</h1>
            <v-container v-if="schemas.length">
                <v-card v-for="schema in schemas"
                        :key="schema.id"
                        class="mt-3"
                        :to="{ name: 'schema', params: { id: schema.schemaId }}"
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
                {{schemas}}
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    //import axios from "axios";

    export default {
        name: "AllSchemas",
        data: () => ({
            schemas: [
                {
                    'schemaId': '1',
                    'creatorId': '1',
                    'name': 'Podcast',
                    'types': [
                        {
                            'id': '1',
                            'name': 'Podcast Title'
                        },
                        {
                            'id': '1',
                            'name': 'Description'
                        },
                        {
                            'id': '6',
                            'name': 'Podcast'
                        }
                    ]
                },
                {
                    'schemaId': '2',
                    'creatorId': '1',
                    'name': 'Post',
                    'types': [
                        {
                            'id': '1',
                            'name': 'Title'
                        },
                        {
                            'id': '1',
                            'name': 'Description'
                        }
                    ]
                },
                {
                    'schemaId': '3',
                    'creatorId': '1',
                    'name': 'Vodcast',
                    'types': [
                        {
                            'id': '1',
                            'name': 'Vodcast Title'
                        },
                        {
                            'id': '1',
                            'name': 'Description'
                        },
                        {
                            'id': '6',
                            'name': 'Vodcast'
                        }
                    ]
                },
            ]
        }),
        mounted() {
            //axios

        }
    }
</script>

<style scoped>

</style>