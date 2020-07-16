<template>
    <v-row class="pa-2">
        <v-col lg="9" class="col-12">
            <v-card class="p-3">
                <h1>{{content.name}} bearbeiten</h1>
                <p v-if="content.schema !== undefined">{{content.schema.name}}</p>
                <time>{{content.creationDate}}</time>
            </v-card>
            <br/>
            <v-card class="pa-5 mt-3 text-center">
                <div v-if="content.mapping !== ''">
                    <div class="p-3" v-for="type in content.mapping" :key="type.type.name">
                        <type v-if="type.type.id === '6'"
                              :id="'1'"
                              :label="type.type.name"
                              :value="type.content"
                              @update:value="handleData($event, type)">
                        </type>
                        <type v-else
                              :id="type.type.id"
                              :label="type.type.name"
                              :value="type.content"
                              @update:value="handleData($event, type)">
                        </type>
                    </div>
                </div>

            </v-card>
        </v-col>
        <v-col lg="3">
            <v-card class="p-3">
                <v-card-title>Aktionen</v-card-title>
                <v-btn
                        block
                        color="#FF8E3C"
                        @click="editContent"
                >Speichern
                </v-btn>
                <v-btn
                        class="mt-3"
                        block
                        color="#FF8E3C"
                >Veröffentlichen
                </v-btn>
            </v-card>
        </v-col>
    </v-row>
</template>
<script>

    import {mapGetters} from "vuex";
    import Type from './Type.vue'
    import store from '../store';

    export default {
        name: 'EditContent',
        props: ['contentId', 'spaceId'],
        components: {Type},
        data: () => ({
            spaces: [],
            content: {},
            selectedSchema: {},
            selectedSpace: '',
            formValid: false,
            rules: {
                required: [value => !!value || "Required"]
            }
        }),
        methods: {
            async editContent() {

                const typeMapping = [];
                for (let map of this.content.mapping) {
                    typeMapping.push({typeId: map.type.id, name: map.type.name, content: map.content})
                }

                let Content = {
                    name: this.content.name,
                    schemaId: this.selectedSchema.id,
                    content: typeMapping
                }

                const formData = new FormData()
                formData.append('json', JSON.stringify(Content))
                if (Content.content.filter(c => c.typeId === '6').length) {
                    let audioFile = Content.content.filter(c => c.typeId === '6')[0]
                    formData.append(audioFile.name, audioFile.content)
                }
                Content = formData
                console.log()
                await store.dispatch(
                    'editContent',
                    {
                        spaceId: this.selectedSpace.id,
                        contentId: this.content.id,
                        content: Content
                    }
                );
                this.$store.commit("SET_SPACE", this.selectedSpace);
                await this.$router.push({name: 'listAllContents', params: {sid: this.selectedSpace.id}});
            },
            handleData: function (e, type) {
                type.content = e
            }
        },
        async mounted() {
            this.content = await store.dispatch(
                'viewContent',
                {content: this.contentId, space: this.spaceId}
            );
            this.spaces = await store.dispatch(
                'listAllSpaces'
            );

            this.selectedSchema = await store.dispatch('viewSchema', this.content.schema.id);
            this.selectedSpace = this.spaces.find(space => space.id === this.spaceId);
        },

        computed: {
            // map `this.user` to `this.$store.getters.user`
            ...mapGetters({
                user: "user"
            })
        }
    }
</script>
<style scoped>
    #drop-text {
        text-align: center;
        vertical-align: middle;
        line-height: 250px;
        font-size: 2rem;
        color: #dcd9d9;
        position: static;
    }
</style>