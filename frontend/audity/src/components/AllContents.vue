<template>
  <v-row>
    <v-col>
      <v-card class="p-3">
        <h1>{{spacename}}</h1>
        <br />
        <p>Erstelle eine neue Seite für {{spacename}}</p>
        <v-btn color="warning" :to="{ name: 'createContent'}">Seite erstellen</v-btn>
      </v-card>
      <br />
      <v-card>
        <v-card-subtitle>Übersicht</v-card-subtitle>
        <v-card-text v-if="contents == []">
          <strong>Hinweis:</strong>Erstelle eine neue Seite um in diese in der Liste auswählen zu können.
        </v-card-text>
        <v-col lg="12">
          <v-list-item
            v-for="content in contents"
            :key="content.id"
            class="mt-3"
            :to="{ name: 'content', params: { cid: content.id }}"
            color="warning"
          >
            <v-list-item-content>
              <v-list-item-title v-text="content.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-card>
    </v-col>
    <v-col lg="3" class="ml-5">
      <v-card class="p-3">
        <v-card-title>Aktionen</v-card-title>
      </v-card>
      <v-card class="p-3 mt-3">{{contents}}</v-card>
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
    spacename: "undefined"
  }),
  computed: {
    spaceId() {
      return this.sid;
    }
  },
  async mounted() {
    this.contents = await store.dispatch('viewSpace', this.spaceId);
    //TODO getSpaceById() for {{ Space name }}
    this.spacename = this.$store.getters.spaceID;
    console.log(this.$store.getters.spaceID);
  }
};
</script>

<style scoped>
#error_padding {
  margin-top: -12px;
}
</style>