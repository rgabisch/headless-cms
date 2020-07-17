<template>
    <div>
        <v-data-table
                :headers="headers"
                :items="allContents"
                :items-per-page="5"
                class="elevation-1"
                @click:row="openContent"
        >
            <template v-slot:item.online="{ item }">
                <v-chip :color="item.online === 'no' ? 'red' : 'blue'" dark>{{item.online}}</v-chip>
            </template>
        </v-data-table>
    </div>
</template>

<script>

    export default {
        name: "SpaceOverview",

        data: () => ({
            spaces: [],
            allContents: [],
            componentLoaded: false,
            headers: [{
                text: 'Seite',
                align: 'start',
                sortable: true,
                value: 'name',
            },
                { text: 'Space', value: 'space' },
                { text: 'Erstellt am', value: 'creationDate' },
                { text: 'Geändert am', value: 'editDate' }
            ]
        }),
        methods: {
            async getData() {
                this.spaces = await this.$store.dispatch('listAllContents')
                for (let i = 0; i < this.spaces.length; i++) {
                    for(let content of this.spaces[i].content){
                        content.space = this.spaces[i].space.name
                        content.spaceId = this.spaces[i].space.id
                        content.online = 'no'
                        this.allContents.push(content)
                    }
                }
            },
            openContent(value) {
                this.$router.push(
                    {
                        name: 'content',
                        params: {
                            sid: value.spaceId,
                            cid: value.id
                        }
                    }
                );
            },
        },

        // when the comonent is displayed, call this method to show all spaces
        mounted() {
            this.getData()
        }
    }
</script>

<style scoped>
    .elevation-1{
        cursor: pointer;
    }
</style>