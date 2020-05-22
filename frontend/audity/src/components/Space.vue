<template>
  <div>
    <v-row>

      <v-col lg="6" class="mr-2 ml-2">
        <v-card class="p-3 mt-3">
          <h1>Space erstellen</h1>
          <p>Zurück</p>
          <div class="form">
            <form @submit.prevent="addSpaceLocal">
              <div class="form-row align-items-center">
                <div class="col-auto">
                  <input
                    class="form-control"
                    type="text"
                    placeholder="Spacename..."
                    v-model="spaceName"
                  />
                </div>
                <div class="col-auto">
                  <button type="submit" class="btn btn-primary mb-2">Space erstellen</button>
                </div>
              </div>
            </form>
          </div>
        </v-card>
        <br />
        <v-card>
          <v-card-subtitle>Übersicht</v-card-subtitle>
          <v-col lg="12">
            <ul class="list-group">
              <li
                class="list-group-item clearfix task"
                v-for="space in spaces"
                :key="space.name"
              >{{ space.name }}</li>
            </ul>
          </v-col>
        </v-card>
      </v-col>

      <v-col lg="3">
        <v-card class="p-3">
          <v-card-title>Was ist ein Space?</v-card-title>
          <v-card-text>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
            sed diam nonumy eirmod tempor invidunt ut labore et dolore
            magna aliquyam.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "Space",

  // [JNR] replace/send dummy data with CouchDB-Data.

  data: () => ({
    spaces: [{ name: "Scrum-Podcast" }, { name: "Mein Reisepodcast" }],
    spaceName: ""
  }),
  methods: {
    addSpaceLocal(){
            console.log('Add:' + this.spaceName);
            this.spaces.push({
                name: this.spaceName
            })
            this.spaceName = "";
            
    },
    addSpace() {
      console.log("Add:" + this.spaceName);
      // [JNR] check duplicates
      axios
        .post("http://localhost:3000/spaces", {
          name: this.spaceName,
          userid: "0"
        })
        .then(response => {
          if (response.data.ok) {
            // [JNR] take back when server supports GET
            //this.refresh();
          } else {
            console.log("please start server or check duplicate naming");
          }
        });
      this.spaceName = "";
    },
    deleteSpace() {
      //To Do
    },
    getData() {
      axios.get("http://localhost:3000/spaces").then(response => {
        this.spaces = response.data.name;
      });
    }
  }
  // [JNR] take back when server supports GET

  /*
    // when the comonent is displayed, call this method to show all spaces
    mounted(){
        this.getData();
    }
    */
};
</script>
<style scoped>
.btn-primary,
.btn-primary:hover,
.btn-primary:active,
.btn-primary:visited {
  background-color: rgb(235, 117, 14) !important;
}
</style>