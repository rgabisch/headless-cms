<template>
    <v-col lg="2">
        <v-card>
          <v-navigation-drawer v-model="drawer">
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
        </v-card>
      </v-col>
</template>

<script>
export default {
    name: 'NavBar',
}
</script>