<template>
    <v-row>
      <v-col lg="2"></v-col>
      <v-col>
        <v-card class="p-3 mt-3">
          <h1>Space erstellen</h1>
          <p>Zurück</p>
          <v-form>
            <v-text-field
                        label="Name des Spaces"
                        filled
                        dense
                        v-model="spaceName"
            ></v-text-field>
            <v-btn id="submit-btn" class="mr-4" @click="addSpace">submit</v-btn>
          </v-form>
        </v-card>
        <br>
        <div v-if="dataChecker == 'created'">
            <div id="alert" class="alert alert-success">
          <strong>Erfolg!</strong> Dein Space wurde erstellt!
        </div>
        </div>

        <div v-else-if="dataChecker == 'fail'">
          <div id="alert" class="alert alert-danger">
            <strong>Error!</strong> Es ist ein Fehler aufgetreten bei dem Erstellen eines Spaces!
          </div>
        </div>


        <br>
        <v-card>
          <v-card-subtitle>Übersicht</v-card-subtitle>
          <v-col lg="12">
            <ul class="list-group">
            <li class="list-group-item clearfix task" v-for="space in spaces" :key="space.name">
                {{ space.name }}
            </li>
        </ul>
          </v-col>
        </v-card>
      </v-col>

      <v-col lg="3" class="ml-5">
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
</template>


<script>
import axios from "axios";

export default {
  name: "Space",
  data: () => ({
    spaceName: "",
    //Replace creator ID with LoggedIn user
    creator: "1",
    dataChecker: '',
    spaces:''
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
      let Space = {
        name: this.spaceName,
        userid: this.creator
        }
        
        console.log(JSON.stringify(Space))
        axios.post('http://localhost:3000/spaces', Space)
          .then((response) => {
            console.log(response); 
            this.dataChecker = 'created'    
          }, (error) => {
            console.log(error); 
            this.dataChecker = 'fail' 
        });

        // delete User-Input
        this.spaceName = ""
        // refresh list
        this.getData();
    },


    deleteSpace() {
      //To Do
    },


    getData() {
      axios.get("http://localhost:3000/spaces",{headers: {'creatorId':1}})
        .then(response => {this.spaces = response.data})
        .catch(function(error){
          console.log(error);
          
        });
    },

  


  },

    // when the comonent is displayed, call this method to show all spaces
    mounted(){
        this.getData();
    }
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