<template>
        <v-row>
            <v-col lg="2"></v-col>
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
                </v-card>
            </v-col>
            <v-col lg="3" class="ml-5">
                <v-card class="p-3">
                    <v-card-title>Seite erstellen</v-card-title>
                    <v-text-field
                            label="Titel der Seite"
                            placeholder=" "
                    ></v-text-field>
                    <v-text-field
                            label="Veröffentlichen in Space"
                            placeholder=" "
                    ></v-text-field>
                    <v-btn
                            large
                            block
                            color="#FF8E3C"
                            to="/create-content">Erstellen</v-btn>
                </v-card>
                <v-card class="pa-3 mt-2">
                    <v-card-title>Space erstellen</v-card-title>
                    <v-text-field
                            label="Name des Space"
                            placeholder=" "
                    ></v-text-field>
                    <v-btn
                            large
                            block
                            color="#FF8E3C"
                            to="/spaces">Erstellen</v-btn>
                </v-card>
                <v-card class="pa-3 mt-2">
                    <v-card-title>Contenttyp erstellen</v-card-title>
                    <v-text-field
                            label="Name des Contenttyps"
                            placeholder=" "
                    ></v-text-field>
                    <v-btn
                            large
                            block
                            color="#FF8E3C"
                            to="create-contenttyp">Erstellen</v-btn>
                </v-card>
            </v-col>
        </v-row>
</template>

<script>
    import { mapGetters } from "vuex";
    export default {
        name: 'Dashboard',

        data: () => ({

        }),
        methods: {

        },
        computed: {
            // map `this.user` to `this.$store.getters.user`
            ...mapGetters({
                user: "user"
            })
        }

    }

</script>