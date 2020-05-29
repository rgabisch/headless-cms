<template>
  <v-navigation-drawer
      v-model="drawer"
      mobile-break-point="960"
      app
      width="230"
  >
      <v-list>
        <v-list-item>
          <v-list-item-content>{{ user.data.email }}</v-list-item-content>
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
    <template v-slot:append>
      <div class="pa-2">
        <v-btn v-on:click="signOut" @click.stop="drawer = !drawer">Ausloggen</v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
  import { mapGetters } from "vuex";
  import firebase from "firebase";
export default {
    name: 'NavBar',
    computed: {
      // map `this.user` to `this.$store.getters.user`
      ...mapGetters({
        user: "user"
      })
    },
    data: () => ({
      drawer: true,
      items: [
        {
          id: 1,
          name: 'Spaces',
          children: [
            {id: 2, name: 'Placeholder'},
            {id: 3, name: 'Placeholder'},
            {id: 4, name: 'Placeholder'},
          ],
        },
        {
          id: 2,
          name: 'Seiten',
          children: [
            {id: 2, name: 'Placeholder'},
            {id: 3, name: 'Placeholder'},
            {id: 4, name: 'Placeholder'},
          ],
        },
        {
          id: 3,
          name: 'Contenttypen',
          children: [
            {id: 2, name: 'Podcast'},
            {id: 3, name: 'Placeholder'},
            {id: 4, name: 'Placeholder'},
          ],
        }
      ]}),
      methods: {
    signOut() {

      firebase
              .auth()
              .signOut()
              .then(() => {
                this.$router.replace({
                  name: "login"
                });
              });
      }
  }
}
</script>