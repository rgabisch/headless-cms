<template>
    <v-row>
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
          <strong>Erfolg!</strong> Dein Baustein wurde erstellt!
        </div>
        </div>

        <div v-else-if="dataChecker == 'fail'">
          <div id="alert" class="alert alert-danger">
            <strong>Error!</strong> Es ist ein Fehler aufgetreten bei dem Erstellen eines neuen Elements!
          </div>
        </div>
        <br>
        <v-card>
          <v-card-subtitle>Übersicht</v-card-subtitle>
          <v-card-text v-if="spaces == ''"><strong>Hinweis: </strong>Erstelle einen Space um in dieser Liste deine Spaces zu sehen.</v-card-text>
          <v-col lg="12">
            <li class="list-group-item clearfix task" v-for="space in spaces" :key="space.name">
                <a :href="'/spaces/' + space.id + '/contents'">{{ space.name }}</a>
            </li>
     
          </v-col>
        </v-card>
      </v-col>
      <v-col lg="3" class="ml-5">
        <v-card class="p-3">
          <v-card-title>Was ist ein Space?</v-card-title>
          <v-card-text>
            Auf dieser Übersicht findest du deine Spaces. 
            Spaces kannst du dir wie Projektordner vorstellen. Wenn du einen Projektordner auswählst,
            kannst du dir die darin enthaltenen Seten anschauen und verwalten.
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