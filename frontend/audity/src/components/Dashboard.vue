<template>
    <v-row>
        <v-col>
            <v-row>
                <v-col>
                    <v-card class="pa-2">
                        <v-card-title>Aufrufe</v-card-title>
                        <div class="d-flex">
                            <p>0</p>
                            <v-spacer></v-spacer>
                            <p>0% &#8594;</p>
                        </div>
                    </v-card>
                </v-col>
                <v-col>
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
            <v-card height="500">
                <v-card-title>Aktive Seiten und Entwürfe</v-card-title>
                <SpaceOverview/>
            </v-card>
        </v-col>
        <v-col lg="3" class="ml-5">
            <v-card class="p-3">
                <v-card-title>Seite erstellen</v-card-title>
                <v-form>
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
                            v-model="spaceName"
                            >
                    </v-select>
                    <v-btn
                            large
                            block
                            color="#FF8E3C"
                            @click="storeContent"
                            to="/create-content"
                    >
                        Erstellen
                    </v-btn>
                </v-form>
            </v-card>
            <v-card class="pa-3 mt-2">
                <v-card-title>Space erstellen</v-card-title>
                <v-form>
                    <v-text-field
                            label="Name des Spaces"
                            placeholder=" "
                            v-model="spaceName">
                    </v-text-field>
                    <v-btn
                            large
                            block
                            color="#FF8E3C"
                            id="submit-btn"
                            @click="addSpace"
                    >
                        Erstellen
                    </v-btn>
                </v-form>
            </v-card>
            <v-card class="pa-3 mt-2">
                <v-card-title>Contenttyp erstellen</v-card-title>
                <v-text-field
                        label="Name des Contenttyps"
                        placeholder=" "
                        v-model="contenttypName"
                ></v-text-field>
                <v-btn
                        large
                        block
                        color="#FF8E3C"
                        @click="storeContentyp"
                        to="create-contenttyp">Erstellen</v-btn>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import  { mapGetters } from "vuex";
    import SpaceOverview from "../components/SpaceOverview";
    import store from "../store";

    export default {
        components: {SpaceOverview},
        name: 'Dashboard',
        data: () => ({
            spaceName: "",
            seiteName: "",
            contenttypName:"",
            //Replace creator ID with LoggedIn user
            creator: "1",
            spaces: []
        }),
        methods: {
            addSpace() {
                store.dispatch('openSpace', this.spaceName);
                // delete User-Input
                this.spaceName = "";
                this.$router.push('spaces');
            },
            async getSpaces() {
                this.spaces = await store.dispatch('listAllSpaces');
            },
            //Speichert Namen des Contentypen in Vuex
            storeContentyp() {
                var storeContenttypName = this.contenttypName
                this.$store.commit('SET_CONTENTTYPNAME', storeContenttypName)
            },
            //Speichert Name der Seite und Name des Spaces in Vuex
            storeContent() {
                var storePageInfo = [this.seiteName, this.spaceName]
                this.$store.commit('SET_CONTENT', storePageInfo)
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