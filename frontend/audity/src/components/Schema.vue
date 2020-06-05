<template>
    <v-row>
        <v-col>
            <h1>{{schema.name}}</h1>
            <v-card class="p-3 mt-3 text-center">
                <div class="p-3" v-for="type in schema.types" :key="type.name">
                    <v-card>
                        <v-card-subtitle>{{type.name}}</v-card-subtitle>
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
                {{schema}}
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    //import axios from "axios";

    export default {
        name: "Schema",
        props: ['id'],
        data: () => ({
            schema: {
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
        }),
        computed: {
            schemaId() {
                return this.id
            }
        },
        mounted() {
            //axios

        },
    }
</script>

<style scoped>

</style>