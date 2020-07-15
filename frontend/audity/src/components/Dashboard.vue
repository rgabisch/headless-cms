<template>
    <v-row class="pa-2">
        <v-col md="9" class="col-12">
            <v-row>
                <v-col class="pt-0">
                    <v-card class="pa-2">
                        <v-card-title>Aufrufe</v-card-title>
                        <div class="d-flex">
                            <p>0</p>
                            <v-spacer></v-spacer>
                            <p>0% &#8594;</p>
                        </div>
                    </v-card>
                </v-col>
                <v-col class="pt-0">
                    <v-card class="pa-2">
                        <v-card-title>Kommentare</v-card-title>
                        <div class="d-flex justify-xl-space-between">
                            <p>0</p>
                            <v-spacer></v-spacer>
                            <p>0% &#8594;</p>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
            <v-card class="mt-3">
                <v-card-title>Aktive Seiten und Entwürfe</v-card-title>
                <ContentsOverview/>
            </v-card>
        </v-col>
        <v-col md="3">
            <v-card class="pa-3">
                <v-card-title>Seite erstellen</v-card-title>
                <v-form @submit.prevent="storeContent">
                    <v-text-field
                            label="Titel der Seite"
                            placeholder=" "
                            v-model="seiteName"
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
                            @click="storeContent"
                    >
                        Erstellen
                    </v-btn>
                </v-form>
            </v-card>
            <v-card class="pa-3 mt-2">
                <v-card-title>Space erstellen</v-card-title>
                <v-form @submit.prevent="addSpace">
                    <v-text-field
                            label="Name des Spaces"
                            placeholder=" "
                            v-model="spaceName">
                    </v-text-field>
                    <v-btn
                            block
                            color="#FF8E3C"
                            id="submit-btn"
                            type="submit"
                    >
                        Erstellen
                    </v-btn>
                </v-form>
            </v-card>
            <v-card class="pa-3 mt-2">
                <v-card-title>Schema erstellen</v-card-title>
                <v-form @submit.prevent="storeSchema">
                    <v-text-field
                            label="Name des Schemas"
                            placeholder=" "
                            v-model="schemaName"
                    ></v-text-field>
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
    import  { mapGetters } from "vuex";
    import ContentsOverview from "./ContentsOverview";

    export default {
        components: {ContentsOverview},
        name: 'Dashboard',
        data: () => ({
            spaceName: "",
            seiteName: "",
            schemaName:"",
            selectedSpace: "",
            spaces: []
        }),
        methods: {
            addSpace() {
                this.$store.dispatch('openSpace', this.spaceName);
                // delete User-Input
                this.spaceName = "";
                this.$router.push('spaces');
            },
            async getSpaces() {
                this.spaces = await this.$store.dispatch('listAllSpaces');
            },
            //Speichert Namen des Schemas in Vuex
            storeSchema() {
                this.$store.commit('SET_SCHEMA', this.schemaName);
                this.$router.push('create-schema');

            },
            //Speichert Name der Seite und Name des Spaces in Vuex
            storeContent() {
                let storePageInfo = [this.seiteName, this.selectedSpace];
                this.$store.commit('SET_CONTENT', storePageInfo);
                this.$router.push('create-content');
            }
        },
        mounted() {
           this.getSpaces()
        },
        computed: {
            // map `this.user` to `this.$store.getters.user`
            ...mapGetters({
                user: "user"
            })
        }
    }
</script>