<template>
  <v-row class="pa-2">
    <v-col lg="9" class="col-12">
      <v-card class="p-3">
        <h1>Deine Spaces</h1>
      </v-card>
      <br />
      <div v-if="dataChecker === 'created'">
        <div class="alert alert-success">
          <strong>Erfolg!</strong> Dein Baustein wurde erstellt!
        </div>
      </div>
      <div v-else-if="dataChecker === 'fail'">
        <div class="alert alert-danger">
          <strong>Error!</strong> Es ist ein Fehler aufgetreten bei dem Erstellen eines neuen Elements!
        </div>
      </div>
      <v-card>
        <v-card-subtitle>Übersicht</v-card-subtitle>
        <v-card-text v-if="spaces === ''">
          <strong>Hinweis:</strong>Erstelle einen Space um in dieser Liste deine Spaces zu sehen.
        </v-card-text>
        <v-col lg="12">
          <v-list-item
                  v-for="space in spaces"
                  :key="space.name"
                  class="mt-3"
                  :to="{ name: 'listAllContents', params: { sid: space.id }}"
                  v-on:click.capture="commitID(space)"
                  color="warning">
            <v-list-item-icon>
              <v-icon>mdi-folder</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="space.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-card>
    </v-col>
    <v-col lg="3">
      <v-card class="pa-3">
        <v-card-title>Space erstellen</v-card-title>
        <v-form>
          <v-text-field
                  label="Name des Spaces"
                  placeholder=" "
                  v-model="spaceName">
          </v-text-field>
          <v-btn
                  block
                  color="#FF8E3C"
                  id="submit-btn"
                  @click="addSpace"
          >
            Erstellen
          </v-btn>
        </v-form>
      </v-card>
      <br />
      <v-card class="p-3">
        <v-card-title>Was ist ein Space?</v-card-title>
        <v-card-text>
          Auf dieser Übersicht findest du deine Spaces.
          Spaces kannst du dir wie Projektordner vorstellen. Wenn du einen Projektordner auswählst,
          kannst du dir die darin enthaltenen Seten anschauen und verwalten.
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>


<script>
import store from '../store';

export default {
  name: "Space",
  data: () => ({
    spaceName: "",
    //Replace creator ID with LoggedIn user
    creator: "1",
    dataChecker: "",
    spaces: ""
  }),
  methods: {
    async addSpace() {
      try {
        await store.dispatch('openSpace', this.spaceName);
        this.dataChecker = "created";
      } catch (e) {
        this.dataChecker = "fail";
      }
      // delete User-Input
      this.spaceName = "";
      // refresh list
      this.getData();
    },
      deleteSpace() {
        //To Do
      },
      commitID(space) {
        this.$store.commit("SET_SPACE", space);
      },
    async getData() {
      this.spaces = await store.dispatch('listAllSpaces');
      }
    },
    // when the comonent is displayed, call this method to show all spaces
    mounted() {
      this.getData();
    }
  };
</script>
<style scoped>
  a{
    text-decoration: none;
  }
</style>