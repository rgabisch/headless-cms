<template>
    <div>
        <v-row>
            <v-col lg="2">
                <v-card>
                    <v-navigation-drawer
                        v-model="drawer"
                    >
                        <v-list>
                            <v-list-item>
                                <v-list-item-content>John Doe</v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>Dashboard</v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-treeview :items="items"></v-treeview>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>Dateien</v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-navigation-drawer>
                </v-card>
            </v-col>

            <v-col lg="6" class="mr-2 ml-2">
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

                  <v-card class="p-3 mt-3" >
                    <v-card-title text-center>Drop here</v-card-title>
                    <Container
                        drag-handle-selector=".column-drag-handle"
                        group-name="draggable"
                        :get-child-payload="getChildPayloadSelectedTypes"
                        @drop="onDrop('selectedTypes', $event)">
                        <Draggable v-for="type in selectedTypes" :key="type.id">
                          <div class="draggable-item">
                            <span class="column-drag-handle" style="float:left">&#x2630;</span>
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
                </v-form>
            </v-col>

            <v-col lg="3">
              <v-card class="p-3">
                <v-card-title>Aktionen</v-card-title>
                <v-btn
                    x-large
                    block
                    color="#FF8E3C"
                    @click="createSchema"
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
    </div>
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
      onDrop (collection, dropResult) {
          let newObj = JSON.parse(JSON.stringify(dropResult));
          this[collection] = this.applyDrag(this[collection], newObj)
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
              console.log(JSON.stringify(Schema))
              axios.post('http://localhost:3000/schemas', JSON.stringify(Schema))
                      .then((response) => {
                          console.log(response);
                      }, (error) => {
                          console.log(error);
                      });
          }
      }
  },
  mounted() {
      this.$refs.form.validate();
  }
}

</script>