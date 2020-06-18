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
    import store from "../store";

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
            spaces: []
        }),
        methods: {
            commitID(name) {
                this.$store.commit("SET_SPACEID", name);
            },
            async getData() {
                this.spaces = await store.dispatch('listAllContents')
                for (let i = 0; i < this.spaces.length; i++) {
                    this.allSpaces.push(this.spaces[i].space)
                    this.allSpaces[i].children = []
                    if(this.spaces[i].content[0]){
                        for(let j = 0; j < this.spaces[i].content.length; j ++){
                            this.allSpaces[i].children.push(this.spaces[i].content[j])
                        }
                    }
                }
            },
            // @SR What does this do?
            created() {
                this.getData();
                this.componentLoaded = true;
            }
        },

        // when the comonent is displayed, call this method to show all spaces
        mounted() {
            this.getData()
        }
    }
</script>

<style scoped>

</style>