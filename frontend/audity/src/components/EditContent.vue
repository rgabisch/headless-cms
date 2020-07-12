<template>
    <v-row class="pa-2">
        <v-col lg="9" class="col-12">
            <v-card class="p-3">
                <h1>Seite bearbeiten</h1>
                <p>Zurück</p>
                <v-text-field
                        label="Name der Seite"
                        filled
                        dense
                        v-model="name"
                        :rules="rules.required"
                ></v-text-field>
                <v-select
                        label="Veröffentlichen in Space"
                        filled
                        dense
                        :items="spaces"
                        item-text="name"
                        item-value="id"
                        v-model="selectedSpace"
                ></v-select>
            </v-card>
            <br/>
            <v-card class="pa-5 mt-3 text-center">
                <v-card-title id="schema-type">{{ cardTitle }}</v-card-title>

                <div v-if="selectedSchema.types !== ''">
                    <div class="p-3" v-for="type in selectedSchema.types" :key="type.name">
                        <type v-if="type.typeId === 6"
                              :id="1"
                              :label="text">
                        </type>
                        <type v-else
                              :id="type.typeId"
                              :label="type.name"
                              @input="handleData($event, type)">
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
            name: '',
            schemas: [],
            spaces: [],
            selectedSchema: {},
            selectedSpace: '',
            cardTitle: '',
            formValid: false,
            rules: {
                required: [value => !!value || "Required"]
            }
        }),
        methods: {
            async editContent() {
                await store.dispatch(
                    'writeContent',
                    {
                        space: this.selectedSpace.id,
                        content: {
                            name: this.name,
                            schemaId: this.selectedSchema.id,
                            content: this.selectedSchema.types
                        }
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
            const content = await store.dispatch(
                'viewContent',
                {content: this.contentId, space: this.spaceId}
            );
            this.spaces = await store.dispatch(
                'listAllSpaces'
            );

            this.selectedSchema = await store.dispatch('viewSchema', content.schema.id);
            this.selectedSpace = this.spaces.find(space => space.id === this.spaceId);
            this.name = content.name;
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