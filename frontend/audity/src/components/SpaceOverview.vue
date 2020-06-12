<template>
    <v-list>
        <v-treeview
                :items="allSpaces"
                item-key="name"
                shaped
                hoverable
                activatable
        >
            <template
                    v-slot:prepend="{ item }"
                    class="v-treeviewStyle"
            >
                <router-link :to="{ name: 'listAllContents', params: {sid: item.id}}"
                             v-on:click.capture="commitID(allSpaces.name)">
                    <v-icon
                            v-if="item.children && item.id"
                            v-text="`mdi-${item.id === 1 ? 'home-variant' : 'folder'}`"
                    ></v-icon>
                </router-link>
            </template>
        </v-treeview>
    </v-list>
</template>

<script>
    import axios from "axios";

    export default {
        name: "SpaceOverview",

        data: () => ({
            spaceName: "",
            //Replace creator ID with LoggedIn user
            creator: "1",
            dataChecker: "",
            allSpaces: [],
            allSpacesName: '',
            allContents: {},
            componentLoaded: false,
            spaces: ""
        }),
        methods: {
            addSpace() {
                let Space = {
                    name: this.spaceName,
                    userid: this.creator
                };

                console.log(JSON.stringify(Space));
                axios.post("http://localhost:3000/spaces", Space).then(
                    response => {
                        console.log(response);
                        this.dataChecker = "created";
                    },
                    error => {
                        console.log(error);
                        this.dataChecker = "fail";
                    }
                );

                // delete User-Input
                this.spaceName = "";
                // refresh list
                //this.getData();
            },

            deleteSpace() {
                //To Do
            },

            commitID(name) {
                this.$store.commit("SET_SPACEID", name);
            },
            getData() {
                axios
                    .get("http://localhost:3000/contents", {headers: {creatorId: 1}})
                    .then(response => {
                        this.spaces = response.data;

                        for (var i = 0; i < this.spaces.length; i++) {
                            this.allSpaces.push(this.spaces[i].space)
                            this.allSpaces[i].children = []
                            if(this.spaces[i].content[0]){
                                for(var j = 0; j < this.spaces[i].content.length; j ++){
                                    this.allSpaces[i].children.push(this.spaces[i].content[j])
                                }
                            }
                        }

                    })
            },

        },
        created() {
            this.getData();
            this.componentLoaded = true;
        },

        // when the comonent is displayed, call this method to show all spaces
        mounted() {
        }
    }
</script>

<style scoped>

</style>