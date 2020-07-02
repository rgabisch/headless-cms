<template>
  <v-row class="pa-2">
    <v-col lg="9" class="col-12">
      <v-card class="p-3">
        <h1>{{content.name}}</h1>
        <p v-if="content.schema !== undefined">{{content.schema.name}}</p>
        <time>{{content.creationDate}}</time>
      </v-card>
      <br />
      <v-card class="pa-3">
        <v-card-subtitle>Inhalt</v-card-subtitle>
        <div class="pa-3" v-for="map in content.mapping" :key="map.type.name">
          <v-card class="text-center">
            <v-card-subtitle>{{map.type.name}}</v-card-subtitle>
            <v-card-text v-html="map.content">{{map.content}}</v-card-text>
          </v-card>
        </div>
      </v-card>
    </v-col>
    <v-col lg="3">
      <v-card class="pa-3">
        <v-card-title>Aktionen</v-card-title>
        <v-btn class="mt-3" block color="#FF8E3C">Veröffentlichen</v-btn>
      </v-card>
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