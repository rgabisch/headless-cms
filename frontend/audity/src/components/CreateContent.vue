<template>
    <v-row>
        <v-col>
            <h1>Seite erstellen</h1>
            <p>Zurück</p>
            <v-form v-model="formValid" ref="form">
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
                <v-card class="p-3 mt-3 text-center">
                    <v-card-title id="schema-type">{{ cardTitle }}</v-card-title>
                    <Container
                            id ="drop-container"
                            class="drop-container"
                            group-name="1"
                            :get-child-payload="getChildPayloadTest"
                            @drop="onDrop($event)">
                        <div id="drop-text">drop here</div>
                        <div v-if="selectedSchema.typeDefinition !== ''">
                            <div class="p-3" v-for="def in selectedSchema.typeDefinition" :key="def">
                                <div class="p-3" v-for="type in def" :key="type.name">
                                    <type :id="type.type.id" :label="type.name" @input="handleData($event, type)"></type>
                                </div>
                            </div>
                        </div>
                    </Container>
                </v-card>
            </v-form>
        </v-col>
        <v-col lg="3" class="ml-5">
            <v-card class="p-3">
                <v-card-title>Aktionen</v-card-title>
                <v-btn
                        large
                        block
                        color="#FF8E3C"
                        @click="createContent"
                >Speichern
                </v-btn>
                <v-btn
                        class="mt-3"
                        large
                        block
                        color="#FF8E3C"
                >Veröffentlichen
                </v-btn>
            </v-card>

            <v-card class="p-3 mt-3">
                <v-card-title>Schemas</v-card-title>
                <Container
                        v-if="schemas.length"
                        behaviour="copy"
                        group-name="1"
                        :get-child-payload="getChildPayloadSchemas">
                    <Draggable v-for="schema in schemas" :key="schema.name">
                        <div class="draggable-item text-center">
                            <v-alert
                                    outlined
                                    color="#FF8E3C"
                            >
                                {{schema.name}}
                            </v-alert>
                        </div>
                    </Draggable>
                </Container>
                <v-btn
                    large
                    block
                    color="#FF8E3C"
                    to="create-schema"
                >Erstellen
                </v-btn>
            </v-card>
        </v-col>
    </v-row>
</template>
<script>

    import {Container, Draggable} from 'vue-smooth-dnd'
    import { mapGetters } from "vuex";
    import Type from './Type.vue'
    import store from '../store';

    export default {
        name: 'CreateContent',
        components: {Container, Draggable, Type},
        data: () => ({
            creator: '1',
            name: '',
            schemas: [],
            spaces: [],
            selectedSchema: {},
            selectedSpace : '',
            cardTitle: '',
            formValid: false,
            rules: {
                required: [value => !!value || "Required"]
            }
        }),
        methods: {
            onDrop(dropResult) {
                const dropContainer = document.getElementById("drop-container");
                dropContainer.style.backgroundColor = "white";
                dropContainer.style.border = "none"
                const dropText = document.getElementById('drop-text');
                dropText.style.visibility = "hidden";
                dropText.style.lineHeight = "0px";

                this.cardTitle = dropResult.payload.name;
                this.selectedSchema = JSON.parse(JSON.stringify(dropResult.payload));
                for (let i = 0; i < this.selectedSchema.typeDefinition.definitions.length; i++) {
                    this.selectedSchema.typeDefinition.definitions[i].content = ''
                }
            },
            getChildPayloadSchemas(index) {
                return this.schemas[index]
            },
            getChildPayloadTest() {
                return this.selectedSchema
            },
            async createContent() {
                let Content = {
                    name: this.name,
                    spaceId: this.selectedSpace,
                    schemaId: this.schemaId,
                    content: this.selectedSchema.typeDefinition.definitions
                }
                console.log(Content)
                //await store.dispatch('writeContent', {space: this.selectedSpace, content: Content});
            },
            handleData: function (e, type) {
                type.content = e
            },
            async getSpaces() {
                this.spaces = await store.dispatch('listAllSpaces');
            },
            async getSchemas() {
                this.schemas = await store.dispatch('listAllSchemas');
            }
        },
        async mounted() {
            //this.$refs.form.validate();
            this.getSpaces();
            this.getSchemas();

            //Bekommt den Namen und der Seite und den Namen des Spaces aus Vuex
            this.name = this.$store.getters.content.name;
            this.selectedSpace = this.$store.getters.content.inSpace

        },

        computed: {
            // map `this.user` to `this.$store.getters.user`
            ...mapGetters({
                user: "user"
            })
        }
    }
</script>
<style>
    #drop-text{
        text-align: center;
        vertical-align: middle;
        line-height: 330px;
        font-size: 2rem;
        color: #dcd9d9;
        position: static;
    }
</style>