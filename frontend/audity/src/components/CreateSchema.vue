<template>
        <v-row class="pa-2">
            <v-col lg="9" class="col-12">
                <v-card class="p-3">
                <h1>Schema erstellen</h1>
                <p>Zurück</p>
                    <v-text-field
                            label="Name des Schemas"
                            filled
                            dense
                            v-model="name"
                            :rules="rules.required"
                    ></v-text-field>
                </v-card>
                <br/>
                    <v-card class="text-center pa-5" >
                        <Container
                                id="drop-container"
                                class="drop-container"
                                group-name="draggable"
                                :get-child-payload="getChildPayloadSelectedTypes"
                                @drop="onDropCopy('selectedTypes', $event)">
                            <Draggable v-for="(type, index) in selectedTypes" :key="index">
                                <div class="draggable-item pt-4 pr-3">
                                    <span class="column-drag-handle">&#8645;</span>
                                    <v-text-field
                                            class="type-item-input"
                                            placeholder="type.name"
                                            outlined
                                            v-model="type.name"
                                            :rules="rules.required"
                                    ></v-text-field>
                                </div>
                            </Draggable>
                        </Container>
                    </v-card>
                    <br/>
                    <v-card class="pa-5">
                        <Container
                                class="delete-container text-center"
                                group-name="draggable"
                        ><span>&#10006;</span>
                        </Container>
                    </v-card>
            </v-col>
            <v-col lg="3">
                <v-card class="p-3">
                    <v-card-title>Aktionen</v-card-title>
                    <v-btn
                        block
                        color="#FF8E3C"
                        @click="createSchema"
                    >Speichern
                    </v-btn>
                </v-card>
                <v-card class="p-3 mt-3">
                    <v-card-title>Typen</v-card-title>
                    <Container
                            behaviour="copy"
                            group-name="draggable"
                            :get-child-payload="getChildPayloadTypes">
                        <Draggable v-for="type in types" :key="type.id">
                            <div class="draggable-item text-center">
                                <v-alert
                                    outlined
                                    color="#FF8E3C"
                                >
                                    {{type.name}}
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
    import store from '../store';

export default {
  name: 'DefineSchema',
  components: {Container, Draggable},
  data: () => ({
      creator: '1',
      name: '',
      types: [
          { id: '1', name: 'Text'},
          { id: '2', name: 'Rich Text'},
          { id: '3', name: 'Number'},
          { id: '4', name: 'Date'},
          { id: '5', name: 'Image'},
          { id: '6', name: 'Audio'},
      ],
      selectedTypes : [],
      formValid: false,
      rules: {
          required: [value => !!value || "Required"]
      }
  }),
  methods: {
      applyDrag (arr, dragResult) {
          const { removedIndex, addedIndex, payload } = dragResult
          if (removedIndex === null && addedIndex === null) return arr

          const result = [...arr]
          let itemToAdd = payload

          if (removedIndex !== null) {
              itemToAdd = result.splice(removedIndex, 1)[0]
          }

          if (addedIndex !== null) {
              result.splice(addedIndex, 0, itemToAdd)
          }
          return result
      },
      onDropCopy (collection, dropResult) {
          let newObj = JSON.parse(JSON.stringify(dropResult));
          this[collection] = this.applyDrag(this[collection], newObj)
      },
      getChildPayloadTypes (index) {
          return this.types[index]
      },
      getChildPayloadSelectedTypes (index) {
          return this.selectedTypes[index]
      },
      async createSchema() {
          let Schema = {
              name: this.name,
              types: this.selectedTypes
          };
          await store.dispatch('defineSchema', Schema)
          await this.$router.push('schemas');
      }
  },
  mounted() {
      //Bekommt den Namen des Schemas aus Vuex
      this.name = this.$store.getters.schema.name
  }
}

</script>

<style scoped>
    .column-drag-handle{
        float: left;
        font-size: 2rem;
        color: #FF8E3C;
        cursor: grab;
    }
    .delete-container{
        height: 70px;
        border: 2px dashed #dcd9d9 !important;
    }
    .delete-container>span{
        font-size: 3rem;
        color: #ec512f;
    }
    .draggable-item{
        cursor: grab;
    }
    .drop-container {
        min-height: 300px;
        border: 2px dashed #dcd9d9;
    }
</style>