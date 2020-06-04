<template>
  <v-navigation-drawer
      v-model="drawer"
      mobile-break-point="960"
      app
      width="230"
  >
      <v-list>
        <v-list-item>
          <v-list-item-content v-if="user.data.email != undefined">{{ user.data.email }}</v-list-item-content>
        </v-list-item>
        <v-list-item :to="dashboard">
          <v-list-item-content>
            Dashboard
            </v-list-item-content>
        </v-list-item>
        <v-list-item >
          <v-list-item-content >
            <v-treeview :items="items">
              <template slot="label" slot-scope="props" activatable color="warning" >
                <router-link :to="props.item.to" v-if="props.item.to">{{ props.item.name }}</router-link>
                <span v-else>{{ props.item.name }}</span>
            </template>
            </v-treeview>
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
  import firebase from 'firebase/app';
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
      dashboard: '/',
      items: [
        {
          id: 1,
          name: 'Spaces',
          children: [
            {
              id: 2, 
              name: 'Übersicht',
              to: '/spaces'},
            {
              id: 3,
              name: 'Erstellen',
              to: '/spaces'
            },
          ],
        },
        {
          id: 2,
          name: 'Seiten',
          children: [
            {
              id: 2, 
              name: 'Erstellen',
              to: '/create-content',
            }
          ],
        },
        {
          id: 3,
          name: 'Contenttypen',
          children: [
            {
              id: 2, 
              name: 'Erstellen',
              to: '/create-contenttyp'},
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