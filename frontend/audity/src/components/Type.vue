<template>
    <v-card class="pb-3">
        <!-- Text  -->
        <div v-if="id === '1'">
            <v-card-subtitle>{{label}}</v-card-subtitle>
            <v-text-field
                    placeholder=""
                    outlined
                    v-model="input"
            ></v-text-field>
        </div>
        <!-- Rich Text -->
        <div v-else-if="id === '2'">
            <v-card-subtitle>{{label}}</v-card-subtitle>
            <v-text-field
                    placeholder=""
                    outlined
                    v-model="input"
            ></v-text-field>
        </div>
        <!-- Number -->
        <div v-else-if="id === '3'">
            <v-card-subtitle>{{label}}</v-card-subtitle>
            <v-text-field
                    placeholder=""
                    outlined
                    v-model="input"
            ></v-text-field>
        </div>
        <!-- Date -->
        <div v-else-if="id === '4'">
            <v-card-subtitle>{{label}}</v-card-subtitle>
            <v-date-picker
                    v-model="input"
                    :show-current=true
                    :landscape=true
            ></v-date-picker>
        </div>
        <!-- Image -->
        <div v-else-if="id === '5'">
            <v-card-subtitle>{{label}}</v-card-subtitle>
            <v-btn><label for="upload-image">Search</label></v-btn>
            <input type="file" name="image" id="upload-image" />
        </div>
        <!-- Audio -->
        <div v-else-if="id === '6'">
            <v-card-subtitle>{{label}}</v-card-subtitle>
            <v-btn><label for="upload-audio">Search</label></v-btn>
            <input type="file" name="audio" id="upload-audio" />
        </div>
        <div v-else>
            Type '{{label}}' with id {{id}} doesn#t exists.
        </div>
    </v-card>
</template>
<script>
    export default {
        name: 'Type',
        props: ['id', 'label'],
        data: () => ({
            input: ''
        }),
        watch: {
            input: {
                handler: function() {
                    this.$emit('input', this.input);
                },
                deep: true
            }
        }
    }
</script>

<style>
    .draggable-item{
        cursor: grab;
    }
    label {
        cursor: pointer;
    }

    #upload-audio{
        opacity: 0;
        position: absolute;
        z-index: -1;
    }
</style>