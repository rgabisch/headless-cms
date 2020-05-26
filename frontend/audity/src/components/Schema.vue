<template>
        <v-row>
            <v-col lg="2"></v-col>
            <v-col>
                <h1>Contenttyp erstellen</h1>
                <p>Zurück</p>
                <v-form v-model="formValid" ref="form">
                    <v-text-field
                            label="Name des Contenttyps"
                            filled
                            dense
                            v-model="name"
                            :rules="rules.required"
                    ></v-text-field>
                    <v-card class="p-3 mt-3 text-center" >
                        <v-card-title class="">Drop here</v-card-title>
                        <Container
                                class="drop-container"
                                group-name="draggable"
                                :get-child-payload="getChildPayloadSelectedTypes"
                                @drop="onDropCopy('selectedTypes', $event)">
                            <Draggable v-for="type in selectedTypes" :key="type.id">
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
                    <v-btn
                        class="mt-3"
                        large
                        block
                        color="#FF8E3C"
                    >Veröffentlichen
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
    import axios from 'axios'

export default {
  name: 'Schema',
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
          collection.splice(dropResult, 1)
      },
      getChildPayloadTypes (index) {
          return this.types[index]
      },
      getChildPayloadSelectedTypes (index) {
          return this.selectedTypes[index]
      },
      createSchema() {
          if (this.formValid) {
              let Schema = {
                  creatorId: this.creator,
                  name: this.name,
                  types: this.selectedTypes
              }
              axios.post('http://localhost:3000/schemas', Schema)
                      .then((response) => {
                          console.log(response);
                      }, (error) => {
                          console.log(error);
                      });
          }
          else {
              alert('All required fields must be filled!');
          }
      }
  },
  mounted() {
      this.$refs.form.validate();
  }
}

</script>

<style>
    .drop-container{
        min-height: 330px;
    }
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
</style>