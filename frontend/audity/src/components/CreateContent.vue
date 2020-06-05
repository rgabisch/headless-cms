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

                <v-card class="p-3 mt-3 text-center" >
                    <v-card-title>{{ cardTitle }}</v-card-title>
                    <Container
                            class="drop-container"
                            group-name="1"
                            :get-child-payload="getChildPayloadTest"
                            @drop="onDrop($event)">
                        <div class="p-3" v-for="type in selectedSchema.types" :key="type.id">
                            <type :id="type.id" :label="type.name" @textInput="handleData($event, type)"></type>
                        </div>
                    </Container>
                </v-card>
                <v-card>

                </v-card>
            </v-form>
        </v-col>
        <v-col lg="3" class="ml-5">
            <v-card class="p-3">
                <v-card-title>Aktionen</v-card-title>
                <v-btn
                        x-large
                        block
                        color="#FF8E3C"
                        @click="createContent"
                >Speichern
                </v-btn>
                <v-btn
                        class="mt-3"
                        x-large
                        block
                        color="#FF8E3C"
                >Veröffentlichen
                </v-btn>
            </v-card>

            <v-card class="p-3 mt-3">
                <v-card-title>Contenttypen</v-card-title>
                <Container
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
            </v-card>
        </v-col>
    </v-row>
</template>
<script>

    import { Container, Draggable } from 'vue-smooth-dnd'
    import Type from './Type.vue'
    import axios from "axios";

    export default {
        name: 'CreateContent',
        components: {Container, Draggable, Type},
        data: () => ({
            creator: '1',
            name: '',
            schemas: [],
            spaces: [],
            selectedSchema : {},
            selectedSpace : {},
            cardTitle: 'Drop here',
            formValid: false,
            rules: {
                required: [value => !!value || "Required"]
            }
        }),
        methods: {
            onDrop (dropResult) {
                this.cardTitle = dropResult.payload.name
                this.selectedSchema = JSON.parse(JSON.stringify(dropResult.payload));
                for (let i = 0; i < this.selectedSchema.types.length; i++) {
                    this.selectedSchema.types[i].content = ''
                }
            },
            getChildPayloadSchemas (index) {
                return this.schemas[index]
            },
            getChildPayloadTest () {
                return this.selectedSchema
            },
            createContent() {
                let Content = {
                    name: this.name,
                    schemaId: this.selectedSchema.id,
                    creatorId: this.creator,
                    // TODO when types are implemented
                    content: this.selectedSchema.typeDefinition
                }
                console.log(Content)
                console.log(this.selectedSpace)
                axios.post('http://localhost:3000/contents/spaces/' + this.selectedSpace, Content)
                    .then((response) => {
                        console.log(response);
                    }, (error) => {
                        console.log(error);
                    });
            },
            handleData: function(e, type) {
                type.content = e
            },
            getSpaces() {
                axios.get("http://localhost:3000/spaces",{headers: {'creatorId':1}})
                    .then(response => {this.spaces = response.data})
                    .catch(function(error){
                        console.log(error);
                    });
            },
            getSchemas() {
                axios.get("http://localhost:3000/schemas",{headers: {'creatorId':1}})
                    .then(response => {this.schemas = response.data.schemas})
                    .catch(function(error){
                        console.log(error);
                    });
            }
        },
        mounted() {
            this.$refs.form.validate();
            this.getSpaces();
            this.getSchemas();
        }
    }
</script>