<template>
  <v-row>
    <v-col>
      <v-card class="p-3">
        <h1>{{content.name}}</h1>
        <p>{{content.schema.name}}</p>
      </v-card>
      <br />
      <v-card class="p-3 mt-3">
        <v-card-subtitle>Inhalt hinzufügen</v-card-subtitle>
        <div class="p-3" v-for="map in content.mapping" :key="map.type.name">
          <v-card>
            <v-card-subtitle>{{map.type.name}}</v-card-subtitle>
            <v-card-text>{{map.content}}</v-card-text>
          </v-card>
        </div>
      </v-card>
    </v-col>
    <v-col lg="3" class="ml-5">
      <v-card class="p-3">
        <v-card-title>Aktionen</v-card-title>
        <v-btn class="mt-3" block color="#FF8E3C">Veröffentlichen</v-btn>
      </v-card>
      <v-card class="p-3 mt-3">{{content}}</v-card>
    </v-col>
  </v-row>
</template>

<script>
import store from "../store";

export default {
  name: "Content",
  props: ["sid", "cid"],
  data: () => ({
    content: ""
  }),
  computed: {
    contentId() {
      return this.cid;
    },
    spaceId() {
      return this.sid;
    }
  },
  async mounted() {
    this.content = await store.dispatch(
            'viewContent',
            {content: this.contentId, space: this.spaceId}
    );
  }
};
</script>

<style scoped>
</style>