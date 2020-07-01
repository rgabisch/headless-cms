<template>
        <v-row>
            <v-col>
                <h1>Schema erstellen</h1>
                <p>Zurück</p>
                <v-form v-model="formValid" ref="form">
                    <v-text-field
                            label="Name des Schemas"
                            filled
                            dense
                            v-model="name"
                            :rules="rules.required"
                    ></v-text-field>
                    <v-card class="pa-3 mt-3 text-center" >
                        <Container
                                id="drop-container"
                                class="drop-container pt-4"
                                group-name="draggable"
                                :get-child-payload="getChildPayloadSelectedTypes"
                                @drop="onDropCopy('selectedTypes', $event)">
                            <Draggable v-for="(type, index) in selectedTypes" :key="index">
                                <div class="draggable-item pa-2">
                                    <span class="column-drag-handle">&#8645;</span>
                                    <v-text-field
                                            placeholder=""
                                            outlined
                                            v-model="type.name"
                                            :rules="rules.required"
                                    ></v-text-field>
                                </div>
                            </Draggable>
                        </Container>
                    </v-card>
                    <br/>
                    <v-card>
                        <Container
                                class="delete-container text-center"
                                group-name="draggable"
                                @drop="onDropDelete('selectedTypes', $event)"
                        ><span>&#10006;</span>
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
                        @click="createSchema"
                    >Speichern
                    </v-btn>
                    {{selectedTypes}}
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
      onDropDelete(collection, dropResult) {
          console.log(collection);
          console.log("drop:",dropResult)
          collection.splice(dropResult, 1)
      },
      getChildPayloadTypes (index) {
          return this.types[index]
      },
      getChildPayloadSelectedTypes (index) {
          return this.selectedTypes[index]
      },
      async createSchema() {
          if (this.formValid) {
              let Schema = {
                  name: this.name,
                  types: this.selectedTypes
              };
              await store.dispatch('defineSchema', Schema)
              await this.$router.push('schemas');
          }
          else {
              alert('All required fields must be filled!');
          }
      }
  },
  mounted() {
      this.$refs.form.validate();

      //Bekommt den Namen des Schemas aus Vuex
      this.name = this.$store.getters.schema.name
  }
}

</script>

<style>
    .column-drag-handle{
        float: left;
        font-size: 2rem;
        color: #0798bb;
        cursor: grab;
    }
    .delete-container{
        height: 65px;
        background: #f0f0f0;
    }
    .delete-container>span{
        font-size: 3rem;
        color: #ff7354;
    }
    .draggable-item{
        cursor: grab;
    }
    .drop-container {
        min-height: 330px;
        border: 2px dashed #dcd9d9;
        background: #f0f0f0;
    }
</style>