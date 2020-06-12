<template>
    <v-row>
        <v-col>
            <h1>{{schema.name}}</h1>
            <v-card class="p-3 mt-3 text-center">
                <div class="p-3" v-for="type in schema.typeDefinition.definitions" :key="type.name">
                    <v-card>
                        <v-card-subtitle>{{type.name}} ({{type.type.id}})</v-card-subtitle>
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

            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import store from '../store';

    export default {
        name: "Schema",
        props: ['id'],
        data: () => ({
            schema: ''
        }),
        computed: {
            schemaId() {
                return this.id
            }
        },
        mounted() {
            this.schema = store.dispatch('viewSchema', this.schemaId);
        },
    }
</script>

<style scoped>

</style>