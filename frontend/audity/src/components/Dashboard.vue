<template>
    <div>
        <v-app>
            <v-row>
                <v-col lg="2">
                    <v-card>
                        <v-navigation-drawer
                            v-model="drawer"
                        >
                            <v-list>
                                <v-list-item>
                                    <v-list-item-content>John Doe</v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-content>Dashboard</v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-treeview :items="items"></v-treeview>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-content>Dateien</v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-navigation-drawer>
                    </v-card>
                </v-col>
                <v-col lg="6" class="mr-2 ml-2">
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
                <v-col lg="3">
                        <v-card class="pa-3">
                            <v-card-title>Seite erstellen</v-card-title>
                            <v-text-field
                                    label="Titel der Seite"
                                    placeholder=" "
                            ></v-text-field>
                            <v-text-field
                                    label="Veröffentlichen in Space"
                                    placeholder=" "
                            ></v-text-field>
                            <v-btn to="/seiten" block>Erstellen</v-btn>
                        </v-card>
                        <v-card class="pa-3 mt-2">
                            <v-card-title>Space erstellen</v-card-title>
                            <v-text-field
                                    label="Name des Space"
                                    placeholder=" "
                            ></v-text-field>
                            <v-btn to="/spaces" block>Erstellen</v-btn>
                        </v-card>
                        <v-card class="pa-3 mt-2">
                            <v-card-title>Contenttyp erstellen</v-card-title>
                            <v-text-field
                                    label="Name des Contenttyps"
                                    placeholder=" "
                            ></v-text-field>
                            <v-btn to="create-contenttyp" block>Erstellen</v-btn>
                        </v-card>
                </v-col>
            </v-row>
        </v-app>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Dashboard',

        // [JNR] replace/send dummy data with CouchDB-Data.

        data: () => ({
            spaces: [
                {name: 'Scrum-Podcast'},
                {name: 'Mein Reisepodcast'}
            ],
            items: [
                {
                    id: 1,
                    name: 'Spaces',
                    children: [
                        {id: 2, name: 'Placeholder'},
                        {id: 3, name: 'Placeholder'},
                        {id: 4, name: 'Placeholder'},
                    ],
                },
                {
                    id: 2,
                    name: 'Seiten',
                    children: [
                        {id: 2, name: 'Placeholder'},
                        {id: 3, name: 'Placeholder'},
                        {id: 4, name: 'Placeholder'},
                    ],
                },
                {
                    id: 3,
                    name: 'Contenttypen',
                    children: [
                        {id: 2, name: 'Placeholder'},
                        {id: 3, name: 'Placeholder'},
                        {id: 4, name: 'Placeholder'},
                    ],
                }
            ],

            spaceName: ''
        }),
        methods: {
            addSpace() {
                console.log('Add:' + this.spaceName);
                // [JNR] check duplicates
                axios.post('http://localhost:3000/spaces', {name: this.spaceName, userid: '0'}).then((response) => {
                    if (response.data.ok) {
                        // [JNR] take back when server supports GET
                        //this.refresh();
                    } else {
                        console.log('please start server or check duplicate naming');
                    }
                })
                this.spaceName = "";

            },
            deleteSpace() {
                //To Do
            },
            getData() {
                axios.get('http://localhost:3000/spaces').then((response) => {
                    this.spaces = response.data.name;
                })
            }
        },
        // [JNR] take back when server supports GET

        /*
        // when the comonent is displayed, call this method to show all spaces
        mounted(){
            this.getData();
        }
        */
    }

</script>