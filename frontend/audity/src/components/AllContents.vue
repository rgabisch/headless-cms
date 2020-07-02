<template>
  <v-row class="pa-2">
    <v-col lg="9" class="col-12">
      <v-card class="p-3">
        <h1>{{spacename}}</h1>
      </v-card>
      <br />
      <v-card>
        <v-card-subtitle>Übersicht</v-card-subtitle>
        <v-card-text v-if="!contents.length">
          <strong>Hinweis:</strong>Erstelle eine neue Seite um diese in der Liste auswählen zu können.
        </v-card-text>
          <v-list-item
            v-for="content in contents"
            :key="content.id"
            class="mt-3"
            :to="{ name: 'content', params: { cid: content.id }}"
            color="warning"
          >
            <v-list-item-icon>
              <v-icon>mdi-application</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="content.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
      </v-card>
    </v-col>
    <v-col lg="3">
      <v-card class="p-3">
        <v-card-title>Seite erstellen</v-card-title>
        <v-form>
          <v-text-field
                  label="Titel der Seite"
                  placeholder=" "
                  v-model="newContentName"
          ></v-text-field>
          <v-btn
                  block
                  color="#FF8E3C"
                  @click="storeContent"
          >
            Erstellen
          </v-btn>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import store from "../store";

export default {
  name: "AllContents",
  props: ["sid"],
  data: () => ({
    contents: [],
    spacename: "",
    newContentName: ""
  }),
  computed: {
    spaceId() {
      return this.sid;
    }
  },
  methods: {
    storeContent() {
      let storeInfo = [this.newContentName, this.$store.getters.space];
      this.$store.commit('SET_CONTENT', storeInfo);
      this.$router.push({name: "createContent"});
    }
  },
  async mounted() {
    this.contents = await store.dispatch('viewSpace', this.spaceId);
    this.spacename = this.$store.getters.space.name;
    this.newContentName = ""
  }
};
</script>

<style scoped>
  a{
    text-decoration: none;
  }
</style>