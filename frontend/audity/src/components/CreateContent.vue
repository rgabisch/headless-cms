<template>
    <v-row class="pa-2">
        <v-col md="9" class="col-12">
            <v-card class="p-3">
                <h1>Seite erstellen</h1>
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
                <Container
                        id="drop-container"
                        class="drop-container"
                        group-name="1"
                        :get-child-payload="getChildPayload"
                        @drop="onDrop($event)">
                    <div id="drop-text">drop here</div>
                    <div v-if="selectedSchema.types !== ''">
                        <div class="p-3" v-for="type in selectedSchema.types" :key="type.name">
                            <type :id="type.typeId" :label="type.name" @input="handleData($event, type)"></type>
                        </div>
                    </div>
                </Container>
            </v-card>
        </v-col>
        <v-col md="3">
            <v-card class="p-3">
                <v-card-title>Aktionen</v-card-title>
                <v-btn
                        block
                        color="#FF8E3C"
                        @click="createContent"
                >Speichern
                </v-btn>
                <v-btn
                        class="mt-3"
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
    import {mapGetters} from "vuex";
    import Type from './Type.vue'

    export default {
        name: 'CreateContent',
        components: {Container, Draggable, Type},
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
            onDrop(dropResult) {
                const dropContainer = document.getElementById("drop-container");
                dropContainer.style.backgroundColor = "white";
                dropContainer.style.border = "none"
                const dropText = document.getElementById('drop-text');
                dropText.style.visibility = "hidden";
                dropText.style.lineHeight = "0px";

                this.cardTitle = dropResult.payload.name;
                this.selectedSchema = JSON.parse(JSON.stringify(dropResult.payload));
                for (let i = 0; i < this.selectedSchema.types.length; i++) {
                    this.selectedSchema.types[i].content = ''
                }
            },
            getChildPayloadSchemas(index) {
                return this.schemas[index]
            },
            getChildPayload() {
                return this.selectedSchema
            },
            async createContent() {
                let Content = {
                    name: this.name,
                    schemaId: this.selectedSchema.id,
                    content: this.selectedSchema.types
                }
                //
                // if(Content.content.filter(c => c.typeId === '6').length) {
                const formData = new FormData()
                formData.append('json', JSON.stringify(Content))
                if (Content.content.filter(c => c.typeId === '6').length) {
                    let audioFile = Content.content.filter(c => c.typeId === '6')[0]
                    formData.append(audioFile.name, audioFile.content)
                }
                Content = formData
                // }

                await this.$store.dispatch('writeContent', {space: this.selectedSpace.id, content: Content});
                this.$store.commit("SET_SPACE", this.selectedSpace);
                await this.$router.push({name: 'listAllContents', params: {sid: this.selectedSpace.id}});
            },
            handleData: function (e, type) {
                type.content = e
            }
        },
        async mounted() {
            //this.$refs.form.validate();
            this.spaces = await this.$store.dispatch('listAllSpaces');
            this.schemas = await this.$store.dispatch('listAllSchemas');

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
<style scoped>
    #drop-text {
        text-align: center;
        vertical-align: middle;
        line-height: 250px;
        font-size: 2rem;
        color: #dcd9d9;
        position: static;
    }

    .draggable-item {
        cursor: grab;
    }

    .drop-container {
        min-height: 250px;
        border: 2px dashed #dcd9d9;
    }
</style>