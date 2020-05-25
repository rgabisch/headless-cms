<template>
  <v-navigation-drawer
      v-model="drawer"
      mobile-break-point="960"
      app
      width="230"
  >
      <v-list>
        <v-list-item>
          <v-list-item-content>Test Doe</v-list-item-content>
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
</template>

<script>
export default {
    name: 'NavBar',
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
      ]})
}
</script>