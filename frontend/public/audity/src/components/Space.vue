<template>
    <div>
        <div class="form">
            <form @submit.prevent="addSpace">
                <div class="form-row align-items-center">
                    <div class="col-auto">
                        <input class="form-control" type="text" placeholder="Spacename..." v-model="spaceName">
                    </div>
                    <div class="col-auto">
                        <button type="submit" class="btn btn-primary mb-2">Space erstellen</button>
                    </div>
                </div>
            </form>
        </div>
        <br>
        <ul class="list-group">
            <li class="list-group-item clearfix task" v-for="space in spaces" :key="space.name">
                {{ space.name }}
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Space',
    
    // [JNR] replace/send dummy data with CouchDB-Data.

    data: () => ({
        spaces: [
            { name: 'Scrum-Podcast'},
            { name: 'Mein Reisepodcast'}
        ],
        spaceName: ''
    }),
    methods: {
        addSpace(){
            console.log('Add:' + this.spaceName);
            // [JNR] check duplicates
            axios.put('http://localhost:3000/spaces', {name: this.spaceName, userid: '0'}).then((response) => {
                if (response.data.ok){
                    // [JNR] take back when server supports GET
                    //this.refresh();
                } else{
                    console.log('please start server or check duplicate naming');
                }
            })
            this.spaceName = "";
            
        },
        deleteSpace(){
            //To Do
        },
        getData(){
            axios.get('http://localhost:3000/spaces').then((response) => {
                this.spaces = response.data.name;
            })
        }
    },
    // [JNR] take back when server supports GET
    
    /*
    // when the comonent is displayed, call this method to show all spaces
    mounted(){
        this.getData();
    }
    */
}

</script>