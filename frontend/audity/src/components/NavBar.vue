<template>
  <v-navigation-drawer
      v-model="drawer"
      mobile-break-point="960"
      app
      width="230"
  >
  <v-subheader>Angemeldeter Nutzer</v-subheader>
  <v-list-item>
    <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
    </v-list-item-icon>
          <v-list-item-content v-if="email != undefined">{{ email }}</v-list-item-content>
        </v-list-item>

<v-divider id="spacer"></v-divider>

      <v-list dense>
      <v-subheader id="nav">Navigation</v-subheader>

      <v-list-item-group v-model="item" color="warning">
        <v-list-item
          v-for="(item, i) in links"
          style="text-decoration: none"
          :key="i"
          :to='item.to'
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
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
  // import firebase from 'firebase/app';
export default {
    name: 'NavBar',
    computed: {
      // map `this.user` to `this.$store.getters.user`
      ...mapGetters({
        email: "usersEmail"
      })
    },
    data: () => ({
      item: 1,
      drawer: true,
      dashboard: '/',
      links: [
        { text: 'Dashboard',
        icon: 'mdi-poll',
        to: '/'},
        { text: 'Spaces',
        icon: 'mdi-folder',
        to: '/spaces' },
        { text: 'Schema erstellen',
        icon: 'mdi-gesture',
        to: '/create-contenttyp' },
        { text: 'Seiten erstellen',
        icon: 'mdi-send',
        to: '/create-content' },
      ],
      }),
      methods: {
          signOut() {
              this.$router.replace({
                  name: "login"
              });
          }
      }
}
</script>
<style>
  #spacer{
    margin-bottom: 5em;
  }

  #nav{
    font-size: .875rem;
  }


</style>