<template>
    <v-row class="pa-2">
        <v-col md="9" class="col-12">
            <v-card class="p-3">
                <h1>{{schema.name}}</h1>
            </v-card>
            <br />
            <v-card class="pa-3 text-center">
                <div class="pa-3" v-for="type in schema.types" :key="type.name">
                    <v-card>
                        <v-card-subtitle>{{type.name}}</v-card-subtitle>
                    </v-card>
                </div>
            </v-card>
        </v-col>
        <v-col md="3">
            <v-card class="pa-3">
                <v-card-title>Seite erstellen</v-card-title>
                <v-form @submit.prevent="storeContent">
                    <v-text-field
                            label="Titel der Seite"
                            placeholder=" "
                            v-model="newContentName"
                    ></v-text-field>
                    <v-select
                            label="Veröffentlichen in Space"
                            placeholder=" "
                            :items="spaces"
                            item-text="name"
                            return-object
                            v-model="selectedSpace"
                    >
                    </v-select>
                    <v-btn
                            block
                            color="#FF8E3C"
                            type="submit"
                    >
                        Erstellen
                    </v-btn>
                </v-form>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>

    export default {
        name: "Schema",
        props: ['id'],
        data: () => ({
            schema: '',
            spaces: [],
            newContentName: '',
            selectedSpace: ''
        }),
        computed: {
            schemaId() {
                return this.id
            }
        },
        methods: {
            storeContent() {
                let storeInfo = [this.newContentName, this.selectedSpace];
                this.$store.commit('SET_CONTENT', storeInfo);
                this.$router.push({name: 'createContent'});
            }
        },
        async mounted() {
            this.schema = await this.$store.dispatch('viewSchema', this.schemaId);
            this.spaces = await this.$store.dispatch('listAllSpaces');
        },
    }
</script>