<template>
    <v-row class="pa-2">
        <v-col lg="9" class="col-12">
            <v-card class="p-3">
                <h1>Schemas</h1>
            </v-card>
            <br />
            <v-card>
                <v-card-subtitle>Übersicht</v-card-subtitle>
                <v-card-text v-if="!schemas.length">
                    <strong>Hinweis:</strong>Erstelle zuerst ein Schema.
                </v-card-text>
                <v-col lg="12">
                    <v-list-item
                        v-for="schema in schemas"
                        :key="schema.id"
                        class="mt-3"
                        :to="{ name: 'schema', params: { id: schema.id }}"
                        color="warning">
                        <v-list-item-icon>
                            <v-icon>mdi-gesture</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="schema.name"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-col>
            </v-card>
        </v-col>
        <v-col lg="3">
        <v-card class="pa-3">
            <v-card-title>Schema erstellen</v-card-title>
            <v-text-field
                    label="Name des Schemas"
                    placeholder=" "
                    v-model="newSchemaName"
            ></v-text-field>
            <v-btn
                    block
                    color="#FF8E3C"
                    @click="storeSchema"
                    >Erstellen</v-btn>
        </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import store from '../store'

    export default {
        name: "AllSchemas",
        data: () => ({
            schemas: [],
            newSchemaName: ""
        }),
        methods: {
            storeSchema() {
                this.$store.commit('SET_SCHEMA', this.newSchemaName);
                this.$router.push('create-schema');
            }
        },
        async mounted() {
            this.schemas = await store.dispatch('listAllSchemas')
            this.newSchemaName = ""
        }
    }
</script>

<style scoped>
    a{
        text-decoration: none;
    }
</style>