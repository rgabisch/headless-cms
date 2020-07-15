<template>
  <v-navigation-drawer
      v-model="drawer"
      mobile-break-point="960"
      app
      :permanent="drawer"
      :mini-variant="miniNav"
      width="230"
  >
      <v-list-item-icon class="pl-2">
          <v-icon @click="miniNav = !miniNav"
                  v-text="`mdi-chevron-${miniNav ? 'right' : 'left'}`"
                  large
          ></v-icon>
      </v-list-item-icon>
      <hr class="ma-0">
      <v-list-item>
        <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
              <v-list-item-content v-if="email !== undefined">{{ email }}</v-list-item-content>
      </v-list-item>
      <v-divider class="mt-0 mb-20" id="spacer"></v-divider>
      <v-list dense>

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
      <div class="pa-3">
          <v-icon class="pl-1" v-if="miniNav" v-on:click="signOut" @click.stop="drawer = !drawer">mdi-logout</v-icon>
          <v-btn v-else v-on:click="signOut" @click.stop="drawer = !drawer">Ausloggen</v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
  import { mapGetters } from "vuex";

export default {
    name: 'NavBar',
    computed: {
      // map `this.user` to `this.$store.getters.user`
      ...mapGetters({
        email: "usersEmail"
      }),
    },
    data: () => ({
      item: 1,
      drawer: true,
      miniNav: false,
      dashboard: '/',
      links: [
        { text: 'Dashboard',
        icon: 'mdi-poll',
        to: '/dashboard'},
        { text: 'Spaces',
        icon: 'mdi-folder',
        to: '/spaces' },
        { text: 'Schemas',
          icon: 'mdi-gesture',
          to: '/schemas' },
        /*{ text: 'Seiten erstellen',
        icon: 'mdi-send',
        to: '/create-content' },*/
      ],
      }),
      methods: {
          signOut() {
              this.$store.commit("setToken", null);
              this.$store.commit("setLoggedIn", false);
              this.$store.commit("setUserEmail", null);
              this.$router.replace({
                  name: "index"
              });
          }
      }
}
</script>
<style>
  #spacer{
    margin-bottom: 5em;
  }
</style>